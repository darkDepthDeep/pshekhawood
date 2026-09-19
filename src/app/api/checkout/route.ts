import { after, NextResponse } from "next/server";
import nodemailer from "nodemailer";

import { randomInt, randomUUID } from "node:crypto";
import { mkdir, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { mockProducts } from "@/entities/product/model/mock-data";
import { WOOD_TYPES } from "@/entities/product/model/types";

export const runtime = "nodejs";

const VK_API_VERSION = "5.199";

const MAX_CART_ITEMS = 20;
const MAX_QUANTITY = 9999;

type VKError = {
  error_code?: number;
  error_msg?: string;
};

type VKResponse<T> = {
  response?: T;
  error?: VKError;
};

type CheckoutOrderItem = {
  productId: string;
  productSlug: string;
  productName: string;
  variantId: string;
  sku: string;
  woodType: string;
  woodName: string;
  size: string;
  leadTime: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
};

// Пауза между повторными запросами
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

// Получаем время по Краснодару
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

// Создаём номер заказа
function createOrderId(date: Date) {
  const { year, month, day, hour, minute, second } =
    getKrasnodarDateParts(date);

  return (
    `${year}-${month}-${day}_` +
    `${hour}-${minute}-${second}_` +
    `${randomUUID().slice(0, 8)}`
  );
}

// Создаём понятный номер заказа
function createOrderNumber(date: Date) {
  const { year, month, day } = getKrasnodarDateParts(date);

  const shortYear = year.slice(-2);
  const randomPart = randomInt(10000, 100000);

  return `PW-${day}${month}${shortYear}-${randomPart}`;
}

// Создаём время заказа
function createKrasnodarTimestamp(date: Date) {
  const { year, month, day, hour, minute, second } =
    getKrasnodarDateParts(date);

  return `${year}-${month}-${day}T${hour}:${minute}:${second}+03:00`;
}

export async function POST(request: Request) {
  try {
    // Настройки уведомлений
    const vkToken = process.env.VK_ACCESS_TOKEN;
    const vkPeerId = process.env.VK_PEER_ID;

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT ?? 465);
    const smtpSecure = process.env.SMTP_SECURE === "true";
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const orderEmailTo = process.env.ORDER_EMAIL_TO;

    // Получаем данные заказа
    const body = (await request.json()) as Record<string, unknown>;

    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const email = String(body.email ?? "").trim();
    const city = String(body.city ?? "").trim();
    const delivery = String(body.delivery ?? "").trim();
    const comment = String(body.comment ?? "").trim();
    const consent = String(body.consent ?? "");

    const rawItems = Array.isArray(body.items) ? body.items : [];

    // Проверяем согласие
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

    // Проверяем имя
    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        {
          error: "Введите корректное имя",
        },
        {
          status: 400,
        },
      );
    }

    // Проверяем телефон
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

    // Проверяем email
    if (
      email &&
      (email.length > 200 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    ) {
      return NextResponse.json(
        {
          error: "Введите корректный email",
        },
        {
          status: 400,
        },
      );
    }

    // Проверяем город
    if (!city || city.length > 150) {
      return NextResponse.json(
        {
          error: "Укажите город доставки",
        },
        {
          status: 400,
        },
      );
    }

    // Проверяем доставку
    if (delivery.length > 1000) {
      return NextResponse.json(
        {
          error: "Информация о доставке слишком длинная",
        },
        {
          status: 400,
        },
      );
    }

    // Проверяем комментарий
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

    // Проверяем количество позиций
    if (rawItems.length === 0 || rawItems.length > MAX_CART_ITEMS) {
      return NextResponse.json(
        {
          error: "Корзина пуста или содержит слишком много позиций",
        },
        {
          status: 400,
        },
      );
    }

    // Объединяем одинаковые варианты
    const quantities = new Map<string, number>();

    for (const rawItem of rawItems) {
      const item =
        rawItem && typeof rawItem === "object"
          ? (rawItem as Record<string, unknown>)
          : {};

      const variantId = String(item.variantId ?? "").trim();
      const quantity = Number(item.quantity);

      if (
        !variantId ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > MAX_QUANTITY
      ) {
        return NextResponse.json(
          {
            error: "Некорректные данные товара в корзине",
          },
          {
            status: 400,
          },
        );
      }

      const newQuantity = (quantities.get(variantId) ?? 0) + quantity;

      if (newQuantity > MAX_QUANTITY) {
        return NextResponse.json(
          {
            error: "Слишком большое количество товара",
          },
          {
            status: 400,
          },
        );
      }

      quantities.set(variantId, newQuantity);
    }

    // Получаем настоящие товары и цены
    const orderItems: CheckoutOrderItem[] = [];

    for (const [variantId, quantity] of quantities) {
      const product = mockProducts.find((item) =>
        item.variants.some((variant) => variant.id === variantId),
      );

      const variant = product?.variants.find((item) => item.id === variantId);

      if (!product || !variant) {
        return NextResponse.json(
          {
            error: "Один из товаров больше недоступен",
          },
          {
            status: 400,
          },
        );
      }

      // Товар без установленной цены через checkout не оформляем
      if (
        variant.price === null ||
        !Number.isFinite(variant.price) ||
        variant.price <= 0
      ) {
        return NextResponse.json(
          {
            error:
              "Цена одного из товаров требует уточнения. Отправьте заявку на расчёт стоимости.",
          },
          {
            status: 400,
          },
        );
      }

      const woodName =
        WOOD_TYPES.find((wood) => wood.value === variant.woodType)?.label ??
        variant.woodType;

      orderItems.push({
        productId: product.id,
        productSlug: product.slug,
        productName: product.name,
        variantId: variant.id,
        sku: variant.sku,
        woodType: variant.woodType,
        woodName,
        size: variant.size,
        leadTime: variant.leadTime,
        unitPrice: variant.price,
        quantity,
        lineTotal: variant.price * quantity,
      });
    }

    // Считаем заказ на сервере
    const totalItems = orderItems.reduce((sum, item) => sum + item.quantity, 0);

    const totalPrice = orderItems.reduce(
      (sum, item) => sum + item.lineTotal,
      0,
    );

    const now = new Date();

    // Создаём номера заказа
    const orderId = createOrderId(now);
    const orderNumber = createOrderNumber(now);
    const createdAt = createKrasnodarTimestamp(now);

    // Формируем список товаров
    const itemLines = orderItems.flatMap((item, index) => [
      `${index + 1}. ${item.productName}`,
      `   ${item.woodName} · ${item.size}`,
      `   Арт. ${item.sku}`,
      `   ${item.quantity} шт. × ${item.unitPrice.toLocaleString("ru-RU")} ₽ = ${item.lineTotal.toLocaleString("ru-RU")} ₽`,
    ]);

    // Сообщение для VK и email
    const message = [
      "🛒 Новый заказ PshekhaWood",
      "",
      `Номер заказа: ${orderNumber}`,
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      `Email: ${email || "Не указан"}`,
      `Город: ${city}`,
      "",
      "Доставка:",
      delivery || "Не указана",
      "",
      "Товары:",
      ...itemLines,
      "",
      `Всего изделий: ${totalItems} шт.`,
      `Сумма: ${totalPrice.toLocaleString("ru-RU")} ₽`,
      "Доставка: рассчитывается отдельно",
      "",
      "Оплата: 70% предоплата, 30% после готовности перед отправкой.",
      "",
      "Комментарий:",
      comment || "Не указан",
    ].join("\n");

    // Данные для order.json
    const orderData = {
      // Служебный и клиентский номера
      id: orderId,
      number: orderNumber,

      createdAt,
      status: "new",
      source: "checkout",

      consent: {
        accepted: true,
        acceptedAt: createdAt,
        consentVersion: "2026-09-08",
        privacyVersion: "2026-09-08",
      },

      customer: {
        name,
        phone,
        email,
      },

      delivery: {
        city,
        details: delivery,
      },

      order: {
        items: orderItems,
        totalItems,
        totalPrice,
        deliveryPrice: null,
        currency: "RUB",

        payment: {
          prepaymentPercent: 70,
          finalPaymentPercent: 30,
        },

        comment,
      },
    };

    // Папка заказов
    const ordersRoot = path.join(process.cwd(), "data", "orders");

    const finalOrderDir = path.join(ordersRoot, orderId);
    const tempOrderDir = path.join(ordersRoot, `.${orderId}.tmp`);

    try {
      // Создаём временную папку
      await mkdir(tempOrderDir, {
        recursive: true,
      });

      // Сохраняем заказ
      await writeFile(
        path.join(tempOrderDir, "order.json"),
        JSON.stringify(orderData, null, 2),
        "utf8",
      );

      // Переносим готовый заказ
      await rename(tempOrderDir, finalOrderDir);
    } catch (error) {
      // Удаляем недописанный заказ
      await rm(tempOrderDir, {
        recursive: true,
        force: true,
      }).catch(() => {});

      console.error("Ошибка сохранения заказа:", error);

      return NextResponse.json(
        {
          error: "Не удалось сохранить заказ. Попробуйте ещё раз.",
        },
        {
          status: 500,
        },
      );
    }

    console.log(`Заказ ${orderNumber} сохранён (${orderId})`);

    // Запрос к VK API
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

    // Отправляем заказ в VK
    const sendVKMessage = async () => {
      if (!vkToken || !vkPeerId) {
        throw new Error("VK не настроен");
      }

      await withRetry(
        "VK заказ",
        () =>
          callVK("messages.send", {
            peer_id: vkPeerId,
            random_id: String(Math.floor(Math.random() * 2_000_000_000)),
            message,
          }),
        3,
      );
    };

    // Отправляем заказ на email
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
        subject: `Заказ ${orderNumber}: ${totalPrice.toLocaleString("ru-RU")} ₽ — ${name}`,
        text: message,
      });
    };

    // Отправляем уведомления после сохранения
    after(async () => {
      const results = await Promise.allSettled([
        sendVKMessage(),
        withRetry("Email заказа", sendEmail, 2),
      ]);

      if (results[0].status === "rejected") {
        console.error(
          `Заказ ${orderNumber} сохранён, но ошибка VK:`,
          results[0].reason,
        );
      }

      if (results[1].status === "rejected") {
        console.error(
          `Заказ ${orderId} сохранён, но ошибка Email:`,
          results[1].reason,
        );
      }
    });

    // Возвращаем успешный результат
    return NextResponse.json({
      success: true,
      orderId,
      orderNumber,
    });
  } catch (error) {
    console.error("Ошибка оформления заказа:", error);

    return NextResponse.json(
      {
        error: "Не удалось оформить заказ",
      },
      {
        status: 500,
      },
    );
  }
}
