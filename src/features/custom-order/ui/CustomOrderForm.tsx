"use client";

import Link from "next/link";
import { useState, type SubmitEventHandler } from "react";

type FieldErrors = {
  name?: string;
  phone?: string;
  productType?: string;
  dimensions?: string;
  quantity?: string;
  comment?: string;
  files?: string;
  consent?: string;
};

interface CustomOrderFormProps {
  initialProduct?: {
    name: string;
    slug: string;
    category: "legs" | "balusters" | "posts";
  };
  initialWood?: "beech" | "ash" | "oak";
  initialQuantity?: number;
}

const allowedFileExtensions = new Set(["jpg", "jpeg", "png", "webp", "pdf"]);

const MAX_FILES = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

function validateForm(formData: FormData): FieldErrors {
  const errors: FieldErrors = {};

  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const productType = String(formData.get("productType") ?? "");
  const dimensions = String(formData.get("dimensions") ?? "").trim();
  const quantity = String(formData.get("quantity") ?? "").trim();
  const comment = String(formData.get("comment") ?? "").trim();
  const consent = String(formData.get("consent") ?? "");

  const files = formData
    .getAll("files")
    .filter((file): file is File => file instanceof File && file.size > 0);

  // Имя
  if (!name) {
    errors.name = "Введите ваше имя";
  } else if (name.length < 2) {
    errors.name = "Имя должно содержать минимум 2 символа";
  }

  // Телефон
  if (!phone) {
    errors.phone = "Введите номер телефона";
  } else {
    const phoneDigits = phone.replace(/\D/g, "");

    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      errors.phone = "Введите корректный номер телефона";
    }
  }

  // Тип изделия
  if (!productType) {
    errors.productType = "Выберите, что нужно изготовить";
  }

  // Размеры
  if (dimensions.length > 200) {
    errors.dimensions = "Размеры не должны превышать 200 символов";
  }

  // Количество
  if (quantity) {
    const number = Number(quantity);

    if (!Number.isInteger(number) || number < 1) {
      errors.quantity = "Укажите целое количество от 1";
    }
  }

  // Комментарий
  if (comment.length > 2000) {
    errors.comment = "Комментарий не должен превышать 2000 символов";
  }

  // Файлы
  if (files.length > MAX_FILES) {
    errors.files = `Можно прикрепить не более ${MAX_FILES} файлов`;
  } else {
    for (const file of files) {
      const extension = file.name.split(".").pop()?.toLowerCase() ?? "";

      if (!allowedFileExtensions.has(extension)) {
        errors.files = `Файл "${file.name}" имеет неподдерживаемый формат`;
        break;
      }

      if (file.size > MAX_FILE_SIZE) {
        errors.files = `Файл "${file.name}" больше 10 МБ`;
        break;
      }
    }
  }

  // Согласие на обработку данных
  if (consent !== "accepted") {
    errors.consent =
      "Необходимо дать согласие на обработку персональных данных";
  }

  return errors;
}

export function CustomOrderForm({
  initialProduct,
  initialWood,
  initialQuantity,
}: CustomOrderFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);

  // Общая ошибка сервера
  const [error, setError] = useState("");

  // Ошибки конкретных полей
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  // Убираем ошибку после изменения поля
  const clearFieldError = (field: keyof FieldErrors) => {
    setFieldErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const next = { ...current };

      delete next[field];

      return next;
    });
  };

  // Отправляем заявку
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    setIsSuccess(false);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Проверяем форму
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/custom-order", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Не удалось отправить заявку");
      }

      // Очищаем форму
      form.reset();

      setFieldErrors({});
      setIsSuccess(true);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Не удалось отправить заявку",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-bold">Оставить заявку</h2>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Заполните основные данные. Детали заказа можно будет уточнить после
        обращения.
      </p>

      {/* Товар, с которого клиент перешёл в форму */}
      {initialProduct && (
        <div className="mt-5 rounded-xl border bg-secondary/40 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Товар из каталога
          </p>

          <p className="mt-1 font-semibold text-foreground">
            {initialProduct.name}
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            Укажите нужные вам размеры и количество.
          </p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        noValidate
        className="mt-8 space-y-6"
      >
        {/* Сохраняем товар, с которого клиент перешёл в заявку */}
        {initialProduct && (
          <>
            <input
              type="hidden"
              name="catalogProductSlug"
              value={initialProduct.slug}
            />
            <input
              type="hidden"
              name="catalogProductName"
              value={initialProduct.name}
            />
          </>
        )}
        {/* Имя */}
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Ваше имя
          </label>

          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
            onInput={() => clearFieldError("name")}
            className={`
              h-11
              w-full
              rounded-xl
              border
              bg-background
              px-3
              text-sm
              outline-none
              transition
              focus:ring-2
              focus:ring-ring
              ${
                fieldErrors.name
                  ? "border-destructive focus:ring-destructive"
                  : ""
              }
            `}
            placeholder="Ваше имя"
          />

          {fieldErrors.name && (
            <p id="name-error" className="text-sm text-destructive">
              {fieldErrors.name}
            </p>
          )}
        </div>

        {/* Телефон */}
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">
            Телефон
          </label>

          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            aria-invalid={Boolean(fieldErrors.phone)}
            aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
            onInput={() => clearFieldError("phone")}
            className={`
              h-11
              w-full
              rounded-xl
              border
              bg-background
              px-3
              text-sm
              outline-none
              transition
              focus:ring-2
              focus:ring-ring
              ${
                fieldErrors.phone
                  ? "border-destructive focus:ring-destructive"
                  : ""
              }
            `}
            placeholder="+7 ..."
          />

          {fieldErrors.phone && (
            <p id="phone-error" className="text-sm text-destructive">
              {fieldErrors.phone}
            </p>
          )}
        </div>

        {/* Тип изделия */}
        <div className="space-y-2">
          <label htmlFor="productType" className="text-sm font-medium">
            Что нужно изготовить
          </label>

          <select
            id="productType"
            name="productType"
            defaultValue={initialProduct?.category ?? ""}
            required
            aria-invalid={Boolean(fieldErrors.productType)}
            aria-describedby={
              fieldErrors.productType ? "productType-error" : undefined
            }
            onChange={() => clearFieldError("productType")}
            className={`
              h-11
              w-full
              rounded-xl
              border
              bg-background
              px-3
              text-sm
              outline-none
              transition
              focus:ring-2
              focus:ring-ring
              ${
                fieldErrors.productType
                  ? "border-destructive focus:ring-destructive"
                  : ""
              }
            `}
          >
            <option value="" disabled>
              Выберите изделие
            </option>

            <option value="legs">Мебельные ножки</option>

            <option value="balusters">Балясины</option>

            <option value="posts">Столбы для лестниц</option>

            <option value="other">Другое изделие</option>
          </select>

          {fieldErrors.productType && (
            <p id="productType-error" className="text-sm text-destructive">
              {fieldErrors.productType}
            </p>
          )}
        </div>

        {/* Порода дерева */}
        <div className="space-y-2">
          <label htmlFor="wood" className="text-sm font-medium">
            Порода дерева
          </label>

          <select
            id="wood"
            name="wood"
            defaultValue={initialWood ?? ""}
            className="
              h-11
              w-full
              rounded-xl
              border
              bg-background
              px-3
              text-sm
              outline-none
              transition
              focus:ring-2
              focus:ring-ring
            "
          >
            <option value="">Пока не определился</option>

            <option value="beech">Бук</option>

            <option value="ash">Ясень</option>

            <option value="oak">Дуб</option>
          </select>
        </div>

        {/* Размеры */}
        <div className="space-y-2">
          <label htmlFor="dimensions" className="text-sm font-medium">
            Размеры
          </label>

          <input
            id="dimensions"
            name="dimensions"
            type="text"
            maxLength={200}
            aria-invalid={Boolean(fieldErrors.dimensions)}
            aria-describedby={
              fieldErrors.dimensions ? "dimensions-error" : undefined
            }
            onInput={() => clearFieldError("dimensions")}
            className={`
              h-11
              w-full
              rounded-xl
              border
              bg-background
              px-3
              text-sm
              outline-none
              transition
              focus:ring-2
              focus:ring-ring
              ${
                fieldErrors.dimensions
                  ? "border-destructive focus:ring-destructive"
                  : ""
              }
            `}
            placeholder="Например: 70 × 70 × 720 мм"
          />

          {fieldErrors.dimensions && (
            <p id="dimensions-error" className="text-sm text-destructive">
              {fieldErrors.dimensions}
            </p>
          )}
        </div>

        {/* Количество */}
        <div className="space-y-2">
          <label htmlFor="quantity" className="text-sm font-medium">
            Количество
          </label>

          <input
            id="quantity"
            name="quantity"
            type="number"
            defaultValue={initialQuantity}
            min="1"
            step="1"
            aria-invalid={Boolean(fieldErrors.quantity)}
            aria-describedby={
              fieldErrors.quantity ? "quantity-error" : undefined
            }
            onInput={() => clearFieldError("quantity")}
            className={`
              h-11
              w-full
              appearance-none
              rounded-xl
              border
              bg-background
              px-3
              text-sm
              outline-none
              transition
              focus:ring-2
              focus:ring-ring
              [&::-webkit-inner-spin-button]:appearance-none
              [&::-webkit-outer-spin-button]:appearance-none
              ${
                fieldErrors.quantity
                  ? "border-destructive focus:ring-destructive"
                  : ""
              }
            `}
            placeholder="Например: 4"
          />

          {fieldErrors.quantity && (
            <p id="quantity-error" className="text-sm text-destructive">
              {fieldErrors.quantity}
            </p>
          )}
        </div>

        {/* Комментарий */}
        <div className="space-y-2">
          <label htmlFor="comment" className="text-sm font-medium">
            Дополнительная информация
          </label>

          <textarea
            id="comment"
            name="comment"
            rows={5}
            maxLength={2000}
            aria-invalid={Boolean(fieldErrors.comment)}
            aria-describedby={fieldErrors.comment ? "comment-error" : undefined}
            onInput={() => clearFieldError("comment")}
            className={`
              w-full
              resize-y
              rounded-xl
              border
              bg-background
              px-3
              py-3
              text-sm
              outline-none
              transition
              focus:ring-2
              focus:ring-ring
              ${
                fieldErrors.comment
                  ? "border-destructive focus:ring-destructive"
                  : ""
              }
            `}
            placeholder="Опишите изделие, особенности формы, обработки или другие пожелания"
          />

          {fieldErrors.comment && (
            <p id="comment-error" className="text-sm text-destructive">
              {fieldErrors.comment}
            </p>
          )}
        </div>

        {/* Файлы */}
        <div className="space-y-2">
          <label htmlFor="files" className="text-sm font-medium">
            Фото, эскиз или чертёж
          </label>

          <input
            id="files"
            name="files"
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.webp,.pdf"
            aria-invalid={Boolean(fieldErrors.files)}
            aria-describedby={
              fieldErrors.files ? "files-error" : "files-description"
            }
            onChange={() => clearFieldError("files")}
            className={`
              w-full
              cursor-pointer
              rounded-xl
              border
              bg-background
              px-3
              py-3
              text-sm
              file:mr-4
              file:cursor-pointer
              file:rounded-lg
              file:border-0
              file:bg-primary
              file:px-4
              file:py-2
              file:text-sm
              file:font-medium
              file:text-primary-foreground
              hover:file:opacity-90
              ${fieldErrors.files ? "border-destructive" : ""}
            `}
          />

          <p
            id="files-description"
            className="text-xs leading-5 text-muted-foreground"
          >
            До 5 файлов. Максимальный размер одного файла — 10 МБ. JPG, PNG,
            WEBP или PDF.
          </p>

          {fieldErrors.files && (
            <p id="files-error" className="text-sm text-destructive">
              {fieldErrors.files}
            </p>
          )}
        </div>

        {/* Ошибка сервера */}
        {error && (
          <div
            role="alert"
            className="rounded-xl border border-destructive/30 bg-destructive/5 p-4"
          >
            <p className="text-sm font-medium text-destructive">{error}</p>
          </div>
        )}

        {/* Успешная отправка */}
        {isSuccess && (
          <div role="status" className="rounded-xl border bg-secondary p-4">
            <p className="font-medium">Заявка отправлена!</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Спасибо. Мы свяжемся с вами для уточнения деталей заказа.
            </p>
          </div>
        )}

        {/* Согласие */}
        <div className="space-y-2">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              name="consent"
              value="accepted"
              required
              aria-invalid={Boolean(fieldErrors.consent)}
              aria-describedby={
                fieldErrors.consent ? "consent-error" : undefined
              }
              onChange={() => clearFieldError("consent")}
              className="mt-1 size-4 shrink-0 cursor-pointer accent-primary"
            />

            <span className="text-xs leading-5 text-muted-foreground">
              Я даю{" "}
              <Link
                href="/consent"
                target="_blank"
                className="font-medium text-primary hover:underline"
              >
                согласие на обработку персональных данных
              </Link>{" "}
              и ознакомлен с{" "}
              <Link
                href="/privacy"
                target="_blank"
                className="font-medium text-primary hover:underline"
              >
                Политикой обработки персональных данных
              </Link>
              .
            </span>
          </label>

          {fieldErrors.consent && (
            <p id="consent-error" className="text-sm text-destructive">
              {fieldErrors.consent}
            </p>
          )}
        </div>

        {/* Отправка */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="
            inline-flex
            h-11
            w-full
            items-center
            justify-center
            rounded-xl
            bg-primary
            px-6
            text-sm
            font-semibold
            text-primary-foreground
            transition
            hover:opacity-90
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {isSubmitting ? "Отправляем..." : "Отправить заявку"}
        </button>
      </form>
    </div>
  );
}
