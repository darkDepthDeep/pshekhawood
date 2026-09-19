import { after, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import sharp from "sharp";

import { mkdir, rename, rm, writeFile } from "node:fs/promises";

import path from "node:path";
import { randomUUID } from "node:crypto";

import { mockProducts } from "@/entities/product/model/mock-data";

export const runtime = "nodejs";

const VK_API_VERSION = "5.199";

const productNames: Record<string, string> = {
  legs: "Мебельные ножки",
  balusters: "Балясины",
  posts: "Столбы для лестниц",
  other: "Другое изделие",
};

const woodNames: Record<string, string> = {
  beech: "Бук",
  ash: "Ясень",
  oak: "Дуб",
};

const allowedProductTypes = new Set(["legs", "balusters", "posts", "other"]);

const allowedWoods = new Set(["", "beech", "ash", "oak"]);

const allowedFileExtensions = new Set(["jpg", "jpeg", "png", "webp", "pdf"]);

const MAX_FILES = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

type VKError = {
  error_code?: number;
  error_msg?: string;
};

type VKResponse<T> = {
  response?: T;
  error?: VKError;
};

type VKUploadServer = {
  upload_url: string;
};

type VKUploadResult = {
  file?: string;
};

type VKPhotoUploadResult = {
  server?: number;
  photo?: string;
  hash?: string;
};

type VKPhoto = {
  id: number;
  owner_id: number;
  access_key?: string;
};

type VKDocument = {
  id: number;
  owner_id: number;
  access_key?: string;
};

type VKSaveDocumentResponse =
  | VKDocument[]
  | {
      type?: string;
      doc?: VKDocument;
    };

type PreparedFile = {
  originalName: string;
  storedName: string;
  mimeType: string;
  size: number;
  buffer: Buffer;
};

// Пауза
function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// Повторяем запрос при ошибке
async function withRetry<T>(
  name: string,
  action: () => Promise<T>,
  attempts = 3,
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await action();
    } catch (error) {
      lastError = error;

      console.error(`${name}: попытка ${attempt}/${attempts}`, error);

      if (attempt === attempts) {
        break;
      }

      const delay = attempt === 1 ? 700 : 1500;

      await sleep(delay);
    }
  }

  throw lastError;
}

// Делаем имя файла безопасным
function makeSafeFileName(fileName: string): string {
  const baseName = path.basename(fileName);

  const safeName = baseName
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "_")
    .replace(/[. ]+$/g, "")
    .trim();

  return safeName || "file";
}

// Получаем дату и время по Краснодару
function getKrasnodarDateParts(date: Date) {
  const parts = new Intl.DateTimeFormat("ru-RU", {
    timeZone: "Europe/Moscow",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const getPart = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return {
    year: getPart("year"),
    month: getPart("month"),
    day: getPart("day"),
    hour: getPart("hour"),
    minute: getPart("minute"),
    second: getPart("second"),
  };
}

// Создаём ID заявки по краснодарскому времени
function createOrderId(date: Date) {
  const { year, month, day, hour, minute, second } =
    getKrasnodarDateParts(date);

  return (
    `${year}-${month}-${day}_` +
    `${hour}-${minute}-${second}_` +
    `${randomUUID().slice(0, 8)}`
  );
}

// Время заявки по Краснодару
function createKrasnodarTimestamp(date: Date) {
  const { year, month, day, hour, minute, second } =
    getKrasnodarDateParts(date);

  return `${year}-${month}-${day}T` + `${hour}:${minute}:${second}+03:00`;
}

export async function POST(request: Request) {
  try {
    // ==========================================
    // НАСТРОЙКИ
    // ==========================================

    const vkToken = process.env.VK_ACCESS_TOKEN;

    const vkPeerId = process.env.VK_PEER_ID;

    const smtpHost = process.env.SMTP_HOST;

    const smtpPort = Number(process.env.SMTP_PORT ?? 465);

    const smtpSecure = process.env.SMTP_SECURE === "true";

    const smtpUser = process.env.SMTP_USER;

    const smtpPass = process.env.SMTP_PASS;

    const orderEmailTo = process.env.ORDER_EMAIL_TO;

    // ==========================================
    // ПОЛУЧАЕМ ФОРМУ
    // ==========================================

    const formData = await request.formData();

    const name = String(formData.get("name") ?? "").trim();

    const phone = String(formData.get("phone") ?? "").trim();

    const productType = String(formData.get("productType") ?? "");

    // Товар, с карточки которого клиент перешёл в форму
    const catalogProductSlug = String(
      formData.get("catalogProductSlug") ?? "",
    ).trim();

    const wood = String(formData.get("wood") ?? "");

    const dimensions = String(formData.get("dimensions") ?? "").trim();

    const quantity = String(formData.get("quantity") ?? "").trim();

    const comment = String(formData.get("comment") ?? "").trim();

    const consent = String(formData.get("consent") ?? "");

    const files = formData
      .getAll("files")
      .filter((file): file is File => file instanceof File && file.size > 0);

    // ==========================================
    // ПРОВЕРКИ
    // ==========================================

    // Согласие на обработку персональных данных
    if (consent !== "accepted") {
      return NextResponse.json(
        {
          error: "Необходимо дать согласие на обработку персональных данных",
        },
        {
          status: 400,
        },
      );
    }

    // Имя
    if (!name) {
      return NextResponse.json(
        {
          error: "Введите ваше имя",
        },
        {
          status: 400,
        },
      );
    }

    if (name.length < 2) {
      return NextResponse.json(
        {
          error: "Имя должно содержать минимум 2 символа",
        },
        {
          status: 400,
        },
      );
    }

    // Телефон
    if (!phone) {
      return NextResponse.json(
        {
          error: "Введите номер телефона",
        },
        {
          status: 400,
        },
      );
    }

    const phoneDigits = phone.replace(/\D/g, "");

    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      return NextResponse.json(
        {
          error: "Введите корректный номер телефона",
        },
        {
          status: 400,
        },
      );
    }

    // Тип изделия
    if (!productType) {
      return NextResponse.json(
        {
          error: "Выберите, что нужно изготовить",
        },
        {
          status: 400,
        },
      );
    }

    if (!allowedProductTypes.has(productType)) {
      return NextResponse.json(
        {
          error: "Некорректный тип изделия",
        },
        {
          status: 400,
        },
      );
    }

    // Если клиент пришёл из карточки товара,
    // ищем настоящий товар по slug на сервере
    const catalogProduct = catalogProductSlug
      ? mockProducts.find((product) => product.slug === catalogProductSlug)
      : undefined;

    // Не доверяем произвольному slug из браузера
    if (catalogProductSlug && !catalogProduct) {
      return NextResponse.json(
        {
          error: "Некорректный товар каталога",
        },
        {
          status: 400,
        },
      );
    }

    // Порода дерева
    if (!allowedWoods.has(wood)) {
      return NextResponse.json(
        {
          error: "Некорректная порода дерева",
        },
        {
          status: 400,
        },
      );
    }

    // Размеры
    if (dimensions.length > 200) {
      return NextResponse.json(
        {
          error: "Размеры не должны превышать 200 символов",
        },
        {
          status: 400,
        },
      );
    }

    // Количество
    if (quantity) {
      const quantityNumber = Number(quantity);

      if (!Number.isInteger(quantityNumber) || quantityNumber < 1) {
        return NextResponse.json(
          {
            error: "Укажите целое количество от 1",
          },
          {
            status: 400,
          },
        );
      }
    }

    // Комментарий
    if (comment.length > 2000) {
      return NextResponse.json(
        {
          error: "Комментарий не должен превышать 2000 символов",
        },
        {
          status: 400,
        },
      );
    }

    // Количество файлов
    if (files.length > MAX_FILES) {
      return NextResponse.json(
        {
          error: `Можно прикрепить не более ${MAX_FILES} файлов`,
        },
        {
          status: 400,
        },
      );
    }

    // Проверяем каждый файл
    for (const file of files) {
      // Размер
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          {
            error: `Файл "${file.name}" больше 10 МБ`,
          },
          {
            status: 400,
          },
        );
      }

      // Расширение
      const extension = file.name.split(".").pop()?.toLowerCase() ?? "";

      if (!allowedFileExtensions.has(extension)) {
        return NextResponse.json(
          {
            error: `Файл "${file.name}" имеет неподдерживаемый формат`,
          },
          {
            status: 400,
          },
        );
      }
    }

    // ==========================================
    // ГОТОВИМ ФАЙЛЫ
    // ==========================================

    const preparedFiles: PreparedFile[] = await Promise.all(
      files.map(async (file, index) => {
        const originalName = file.name;

        const safeName = makeSafeFileName(originalName);

        const storedName = `${String(index + 1).padStart(2, "0")}-${safeName}`;

        const buffer = Buffer.from(await file.arrayBuffer());

        return {
          originalName,
          storedName,
          mimeType: file.type || "application/octet-stream",
          size: file.size,
          buffer,
        };
      }),
    );

    // ==========================================
    // ДАННЫЕ ЗАЯВКИ
    // ==========================================

    const productName = productNames[productType] ?? productType;

    const woodName = wood ? (woodNames[wood] ?? wood) : "Не указана";

    const now = new Date();

    const orderId = createOrderId(now);

    const createdAt = createKrasnodarTimestamp(now);

    const message = [
      "🪵 Новая заявка PshekhaWood",
      "",
      `Номер: ${orderId}`,
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      `Изделие: ${productName}`,

      // Показываем карточку, с которой клиент пришёл
      ...(catalogProduct ? [`Карточка товара: ${catalogProduct.name}`] : []),

      `Порода дерева: ${woodName}`,
      `Размеры: ${dimensions || "Не указаны"}`,
      `Количество: ${quantity || "Не указано"}`,
      "",
      "Комментарий:",
      comment || "Не указан",
    ].join("\n");

    // ==========================================
    // СОХРАНЯЕМ ЗАЯВКУ НА ДИСК
    // ==========================================

    const ordersRoot = path.join(process.cwd(), "data", "orders");

    const finalOrderDir = path.join(ordersRoot, orderId);

    // Сначала пишем во временную папку
    const tempOrderDir = path.join(ordersRoot, `.${orderId}.tmp`);

    const tempFilesDir = path.join(tempOrderDir, "files");

    const orderData = {
      id: orderId,
      createdAt,
      status: "new",

      consent: {
        accepted: true,
        acceptedAt: createdAt,
        consentVersion: "2026-09-08",
        privacyVersion: "2026-09-08",
      },

      customer: {
        name,
        phone,
      },

      order: {
        productType,
        productName,

        // Карточка товара, с которой клиент перешёл в заявку
        catalogProduct: catalogProduct
          ? {
              id: catalogProduct.id,
              slug: catalogProduct.slug,
              name: catalogProduct.name,
              category: catalogProduct.category,
            }
          : null,

        wood,
        woodName,
        dimensions,
        quantity,
        comment,
      },

      files: preparedFiles.map((file) => ({
        originalName: file.originalName,

        storedName: file.storedName,

        mimeType: file.mimeType,

        size: file.size,

        path: `files/${file.storedName}`,
      })),
    };

    try {
      // Создаём папки
      await mkdir(tempFilesDir, {
        recursive: true,
      });

      // Сохраняем каждый файл
      for (const file of preparedFiles) {
        await writeFile(path.join(tempFilesDir, file.storedName), file.buffer);
      }

      // Сохраняем данные заявки
      await writeFile(
        path.join(tempOrderDir, "order.json"),

        JSON.stringify(orderData, null, 2),

        "utf8",
      );

      // Только когда всё записано,
      // превращаем папку в готовую заявку
      await rename(tempOrderDir, finalOrderDir);
    } catch (error) {
      // Удаляем недописанную заявку
      await rm(tempOrderDir, {
        recursive: true,
        force: true,
      }).catch(() => {});

      console.error("Ошибка сохранения заявки:", error);

      return NextResponse.json(
        {
          error: "Не удалось сохранить заявку. Попробуйте ещё раз.",
        },
        {
          status: 500,
        },
      );
    }

    console.log(`Заявка ${orderId} сохранена`);

    // ==========================================
    // VK API
    // ==========================================

    const callVK = async <T>(
      method: string,
      params: Record<string, string>,
    ): Promise<T> => {
      if (!vkToken || !vkPeerId) {
        throw new Error("VK не настроен");
      }

      const body = new URLSearchParams({
        ...params,
        access_token: vkToken,

        v: VK_API_VERSION,
      });

      const response = await fetch(`https://api.vk.com/method/${method}`, {
        method: "POST",

        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },

        body,

        signal: AbortSignal.timeout(12_000),
      });

      if (!response.ok) {
        throw new Error(`VK API недоступен: ${response.status}`);
      }

      const data = (await response.json()) as VKResponse<T>;

      if (data.error) {
        throw new Error(
          `VK: ${data.error.error_msg ?? `ошибка ${data.error.error_code}`}`,
        );
      }

      if (data.response === undefined) {
        throw new Error(`VK не вернул результат метода ${method}`);
      }

      return data.response;
    };

    // ==========================================
    // ТЕКСТ В VK
    // ==========================================

    const sendVKMessage = async () => {
      if (!vkToken || !vkPeerId) {
        throw new Error("VK не настроен");
      }

      const randomId = String(Math.floor(Math.random() * 2_000_000_000));

      await withRetry(
        "VK сообщение",

        () =>
          callVK("messages.send", {
            peer_id: vkPeerId,

            random_id: randomId,

            message,
          }),

        3,
      );
    };

    // ==========================================
    // ФОТО В VK
    // ==========================================

    const uploadPhotoToVK = async (file: PreparedFile): Promise<string> => {
      if (!vkPeerId) {
        throw new Error("VK не настроен");
      }

      // По умолчанию используем оригинальный файл
      let vkBuffer = file.buffer;
      let vkMimeType = file.mimeType;
      let vkFileName = "image.jpg";

      // PNG оставляем PNG
      if (file.mimeType === "image/png") {
        vkFileName = "image.png";
      }

      // WEBP преобразуем в JPG только для VK
      if (file.mimeType === "image/webp") {
        vkBuffer = await sharp(file.buffer)
          .rotate()
          .jpeg({
            quality: 90,
          })
          .toBuffer();

        vkMimeType = "image/jpeg";
        vkFileName = "image.jpg";
      }

      // Получаем сервер загрузки фотографий
      const uploadServer = await withRetry(
        `VK фото upload: ${file.originalName}`,
        () =>
          callVK<VKUploadServer>("photos.getMessagesUploadServer", {
            peer_id: vkPeerId,
          }),
        3,
      );

      if (!uploadServer.upload_url) {
        throw new Error(`VK не дал upload_url для "${file.originalName}"`);
      }

      // Загружаем фотографию
      const uploadData = await withRetry(
        `VK фото: ${file.originalName}`,
        async () => {
          const uploadForm = new FormData();

          const blob = new Blob([new Uint8Array(vkBuffer)], {
            type: vkMimeType,
          });

          uploadForm.append("photo", blob, vkFileName);

          const response = await fetch(uploadServer.upload_url, {
            method: "POST",
            body: uploadForm,

            signal: AbortSignal.timeout(20_000),
          });

          if (!response.ok) {
            throw new Error(`Не удалось загрузить фото "${file.originalName}"`);
          }

          const data = (await response.json()) as VKPhotoUploadResult;

          if (data.server === undefined || !data.photo || !data.hash) {
            console.error("Ответ VK при загрузке фото:", data);

            throw new Error(`VK не принял фото "${file.originalName}"`);
          }

          return data;
        },
        3,
      );

      // Сохраняем фотографию в VK
      const saved = await withRetry(
        `VK сохранение фото: ${file.originalName}`,
        () =>
          callVK<VKPhoto[]>("photos.saveMessagesPhoto", {
            server: String(uploadData.server),

            photo: uploadData.photo!,

            hash: uploadData.hash!,
          }),
        3,
      );

      const photo = saved[0];

      if (
        !photo ||
        typeof photo.id !== "number" ||
        typeof photo.owner_id !== "number"
      ) {
        throw new Error(`VK не сохранил фото "${file.originalName}"`);
      }

      const accessKey = photo.access_key ? `_${photo.access_key}` : "";

      return `photo${photo.owner_id}_` + `${photo.id}${accessKey}`;
    };

    // ==========================================
    // ФАЙЛ В VK
    // ==========================================

    const uploadFileToVK = async (file: PreparedFile): Promise<string> => {
      if (!vkPeerId) {
        throw new Error("VK не настроен");
      }

      // Получаем сервер загрузки
      const uploadServer = await withRetry(
        `VK upload: ${file.originalName}`,

        () =>
          callVK<VKUploadServer>("docs.getMessagesUploadServer", {
            peer_id: vkPeerId,

            type: "doc",
          }),

        3,
      );

      if (!uploadServer.upload_url) {
        throw new Error("VK не дал upload_url");
      }

      // Загружаем файл
      const uploadData = await withRetry(
        `VK файл: ${file.originalName}`,

        async () => {
          const uploadForm = new FormData();

          const blob = new Blob([new Uint8Array(file.buffer)], {
            type: file.mimeType,
          });

          uploadForm.append("file", blob, file.originalName);

          const response = await fetch(uploadServer.upload_url, {
            method: "POST",

            body: uploadForm,

            signal: AbortSignal.timeout(20_000),
          });

          if (!response.ok) {
            throw new Error(`Не удалось загрузить "${file.originalName}"`);
          }

          const data = (await response.json()) as VKUploadResult;

          if (!data.file) {
            throw new Error(`VK не принял "${file.originalName}"`);
          }

          return data;
        },

        3,
      );

      // Сохраняем документ
      const saved = await withRetry(
        `VK сохранение: ${file.originalName}`,

        () =>
          callVK<VKSaveDocumentResponse>("docs.save", {
            file: uploadData.file!,
            title: file.originalName,
          }),

        3,
      );

      const document = Array.isArray(saved) ? saved[0] : saved.doc;

      if (
        !document ||
        typeof document.id !== "number" ||
        typeof document.owner_id !== "number"
      ) {
        throw new Error(`VK не сохранил "${file.originalName}"`);
      }

      const accessKey = document.access_key ? `_${document.access_key}` : "";

      return `doc${document.owner_id}_` + `${document.id}${accessKey}`;
    };

    // ==========================================
    // ФАЙЛЫ В VK
    // ==========================================

    const sendVKFiles = async () => {
      if (preparedFiles.length === 0) {
        return;
      }

      if (!vkPeerId) {
        throw new Error("VK не настроен");
      }

      const attachments: string[] = [];

      for (const file of preparedFiles) {
        try {
          let attachment: string;

          // JPG и PNG и webp отправляем как фотографии
          if (
            file.mimeType === "image/jpeg" ||
            file.mimeType === "image/png" ||
            file.mimeType === "image/webp"
          ) {
            attachment = await uploadPhotoToVK(file);
          } else {
            attachment = await uploadFileToVK(file);
          }

          attachments.push(attachment);
        } catch (error) {
          console.error(`Ошибка файла "${file.originalName}" в VK:`, error);
        }
      }

      if (attachments.length === 0) {
        return;
      }

      const randomId = String(Math.floor(Math.random() * 2_000_000_000));

      await withRetry(
        "VK вложения",

        () =>
          callVK("messages.send", {
            peer_id: vkPeerId,

            random_id: randomId,

            message: `📎 Файлы к заявке ${orderId}`,

            attachment: attachments.join(","),
          }),

        3,
      );
    };

    // ==========================================
    // EMAIL
    // ==========================================

    const sendEmail = async () => {
      if (!smtpHost || !smtpUser || !smtpPass || !orderEmailTo) {
        throw new Error("Email не настроен");
      }

      const transporter = nodemailer.createTransport({
        host: smtpHost,

        port: smtpPort,

        secure: smtpSecure,

        auth: {
          user: smtpUser,

          pass: smtpPass,
        },

        connectionTimeout: 12_000,

        greetingTimeout: 12_000,

        socketTimeout: 20_000,
      });

      await transporter.sendMail({
        from: `"PshekhaWood" <${smtpUser}>`,

        to: orderEmailTo,

        subject: `Новая заявка ${orderId}: ${productName} — ${name}`,

        text: message,

        attachments: preparedFiles.map((file) => ({
          filename: file.originalName,

          content: file.buffer,

          contentType: file.mimeType,
        })),
      });
    };

    // ==========================================
    // УВЕДОМЛЕНИЯ
    // ==========================================

    after(async () => {
      const results = await Promise.allSettled([
        (async () => {
          await sendVKMessage();
          await sendVKFiles();
        })(),

        withRetry("Email", sendEmail, 2),
      ]);

      if (results[0].status === "rejected") {
        console.error(
          `Заявка ${orderId} сохранена, но ошибка VK:`,
          results[0].reason,
        );
      }

      if (results[1].status === "rejected") {
        console.error(
          `Заявка ${orderId} сохранена, но ошибка Email:`,
          results[1].reason,
        );
      }
    });

    // ==========================================
    // УСПЕХ
    // ==========================================

    // До этой точки заявка и все файлы
    // уже точно записаны на диск
    return NextResponse.json({
      success: true,
      orderId,
    });
  } catch (error) {
    console.error("Ошибка обработки заявки:", error);

    return NextResponse.json(
      {
        error: "Не удалось отправить заявку",
      },
      {
        status: 500,
      },
    );
  }
}
