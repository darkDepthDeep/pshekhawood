"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useSyncExternalStore, type SubmitEventHandler } from "react";

import { WOOD_TYPES } from "@/entities/product/model/types";
import { useCartStore } from "@/features/cart/model/store";

// Следим за загрузкой корзины из localStorage
function subscribeToCartHydration(callback: () => void) {
  const unsubscribeHydrate = useCartStore.persist.onHydrate(callback);
  const unsubscribeFinish = useCartStore.persist.onFinishHydration(callback);

  return () => {
    unsubscribeHydrate();
    unsubscribeFinish();
  };
}

type CheckoutResponse = {
  success?: boolean;
  orderId?: string;
  orderNumber?: string;
  error?: string;
};

export function CheckoutForm() {
  // Данные корзины
  const items = useCartStore((state) => state.items);
  const totalItems = useCartStore((state) => state.totalItems());
  const totalPrice = useCartStore((state) => state.totalPrice());
  const clearCart = useCartStore((state) => state.clearCart);
  // Проверяем товары без указанной цены
  const hasPriceRequestItems = items.some(
    (cartItem) => cartItem.variant.price === null,
  );

  // Состояние формы
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  // Номер оформленного заказа
  const [orderNumber, setOrderNumber] = useState("");

  // Проверяем загрузку корзины
  const isHydrated = useSyncExternalStore(
    subscribeToCartHydration,
    () => useCartStore.persist.hasHydrated(),
    () => false,
  );

  // Отправляем заказ
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    setError("");

    // Товары без цены через checkout не оформляем
    if (hasPriceRequestItems) {
      setError(
        "В заказе есть товар с ценой по запросу. Сначала уточните его стоимость.",
      );
      return;
    }

    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Собираем данные заказа
    const requestBody = {
      name: String(formData.get("name") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      city: String(formData.get("city") ?? "").trim(),
      delivery: String(formData.get("delivery") ?? "").trim(),
      comment: String(formData.get("comment") ?? "").trim(),
      consent: String(formData.get("consent") ?? ""),

      // Передаём только вариант и количество
      items: items.map((cartItem) => ({
        variantId: cartItem.variant.id,
        quantity: cartItem.quantity,
      })),
    };

    try {
      // Отправляем заказ на сервер
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = (await response.json()) as CheckoutResponse;

      if (!response.ok) {
        throw new Error(data.error || "Не удалось оформить заказ");
      }

      if (!data.orderNumber) {
        throw new Error("Сервер не вернул номер заказа");
      }

      // Показываем красивый номер заказа
      setOrderNumber(data.orderNumber);

      // Очищаем корзину после успеха
      clearCart();

      form.reset();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Не удалось оформить заказ",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Ждём загрузку корзины
  if (!isHydrated) {
    return (
      <div className="rounded-2xl border bg-card p-8 text-center text-muted-foreground">
        Загружаем корзину...
      </div>
    );
  }

  // Заказ успешно оформлен
  if (orderNumber) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border bg-card p-6 text-center shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
          PshekhaWood
        </p>

        <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Заказ принят</h2>

        <p className="mt-3 leading-6 text-muted-foreground">
          Спасибо за заказ. Мы свяжемся с вами для подтверждения деталей и
          расчёта доставки.
        </p>

        {/* Номер заказа */}
        <div className="mt-6 rounded-xl border bg-secondary/40 p-4">
          <p className="text-xs text-muted-foreground">Номер заказа</p>

          <p className="mt-1 text-lg font-bold tracking-wide">{orderNumber}</p>
        </div>

        {/* Условия оплаты */}
        <p className="mt-5 text-sm leading-6 text-muted-foreground">
          Оплата: 70% предоплата. Оставшиеся 30% — после готовности заказа перед
          отправкой.
        </p>

        <Link
          href="/catalog"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  // Корзина пустая
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border bg-card p-8 text-center shadow-sm">
        <h2 className="text-xl font-semibold">Корзина пуста</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Добавьте изделия в корзину перед оформлением заказа.
        </p>

        <Link
          href="/catalog"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
      {/* Данные покупателя */}
      <section className="order-2 rounded-2xl border bg-card p-5 shadow-sm sm:p-6 lg:order-1">
        <h2 className="text-xl font-bold">Данные покупателя</h2>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Мы свяжемся с вами для подтверждения заказа и уточнения доставки.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Имя */}
          <div className="space-y-2">
            <label htmlFor="checkout-name" className="text-sm font-medium">
              Ваше имя
            </label>

            <input
              id="checkout-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              minLength={2}
              maxLength={100}
              placeholder="Ваше имя"
              className="h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Телефон */}
          <div className="space-y-2">
            <label htmlFor="checkout-phone" className="text-sm font-medium">
              Телефон
            </label>

            <input
              id="checkout-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              placeholder="+7 ..."
              className="h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="checkout-email" className="text-sm font-medium">
              Email
              <span className="ml-1 font-normal text-muted-foreground">
                необязательно
              </span>
            </label>

            <input
              id="checkout-email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength={200}
              placeholder="example@mail.ru"
              className="h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Город */}
          <div className="space-y-2">
            <label htmlFor="checkout-city" className="text-sm font-medium">
              Город доставки
            </label>

            <input
              id="checkout-city"
              name="city"
              type="text"
              autoComplete="address-level2"
              required
              maxLength={150}
              placeholder="Например: Краснодар"
              className="h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Доставка */}
          <div className="space-y-2">
            <label htmlFor="checkout-delivery" className="text-sm font-medium">
              Информация для доставки
            </label>

            <textarea
              id="checkout-delivery"
              name="delivery"
              rows={3}
              maxLength={1000}
              placeholder="Адрес, удобный способ получения или другая информация"
              className="w-full resize-y rounded-xl border bg-background px-3 py-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
            />

            <p className="text-xs leading-5 text-muted-foreground">
              Стоимость доставки рассчитывается отдельно после уточнения
              деталей.
            </p>
          </div>

          {/* Комментарий */}
          <div className="space-y-2">
            <label htmlFor="checkout-comment" className="text-sm font-medium">
              Комментарий к заказу
            </label>

            <textarea
              id="checkout-comment"
              name="comment"
              rows={4}
              maxLength={2000}
              placeholder="Дополнительные пожелания к заказу"
              className="w-full resize-y rounded-xl border bg-background px-3 py-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Ошибка отправки */}
          {error && (
            <div
              role="alert"
              className="rounded-xl border border-destructive/30 bg-destructive/5 p-4"
            >
              <p className="text-sm font-medium text-destructive">{error}</p>
            </div>
          )}

          {/* Предупреждение о товаре без цены */}
          {hasPriceRequestItems && (
            <div
              role="alert"
              className="rounded-xl border border-primary/20 bg-secondary/40 p-4"
            >
              <p className="text-sm font-medium">
                В заказе есть товар с ценой по запросу.
              </p>

              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Сначала уточните его стоимость в карточке товара.
              </p>
            </div>
          )}

          {/* Согласие */}
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              name="consent"
              value="accepted"
              required
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

          {/* Отправка заказа */}
          <button
            type="submit"
            disabled={isSubmitting || hasPriceRequestItems}
            className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {hasPriceRequestItems
              ? "Сначала уточните цену"
              : isSubmitting
                ? "Оформляем..."
                : "Отправить заказ"}
          </button>
        </form>
      </section>

      {/* Состав заказа */}
      <aside className="order-1 h-fit rounded-2xl border bg-card p-5 shadow-sm sm:p-6 lg:order-2 lg:sticky lg:top-6">
        <h2 className="text-xl font-bold">Ваш заказ</h2>

        <ul className="mt-5 space-y-4">
          {items.map((cartItem) => {
            const woodName =
              WOOD_TYPES.find(
                (wood) => wood.value === cartItem.variant.woodType,
              )?.label ?? cartItem.product.material;

            const image = cartItem.product.images?.[0];

            return (
              <li
                key={cartItem.variant.id}
                className="flex gap-3 border-b pb-4 last:border-b-0 last:pb-0"
              >
                {/* Фото товара */}
                <Link
                  href={`/catalog/${cartItem.product.slug}`}
                  className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted"
                >
                  {image ? (
                    <Image
                      src={image}
                      alt={cartItem.product.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center text-[10px] text-muted-foreground">
                      Фото
                    </div>
                  )}
                </Link>

                {/* Информация о товаре */}
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/catalog/${cartItem.product.slug}`}
                    className="text-sm font-semibold leading-5 hover:text-primary"
                  >
                    {cartItem.product.name}
                  </Link>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {woodName} · {cartItem.variant.size}
                  </p>

                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    Арт. {cartItem.variant.sku}
                  </p>

                  <div className="mt-2 flex items-center justify-between gap-3 text-sm">
                    <span className="text-muted-foreground">
                      {cartItem.quantity} шт.
                    </span>

                    <span className="font-semibold tabular-nums">
                      {cartItem.variant.price === null
                        ? "Цена по запросу"
                        : `${(cartItem.variant.price * cartItem.quantity).toLocaleString("ru-RU")} ₽`}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Итог заказа */}
        <div className="mt-5 border-t pt-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Изделий</span>

            <span className="text-sm">{totalItems} шт.</span>
          </div>

          <div className="mt-3 flex items-end justify-between gap-4">
            <span className="font-semibold">Итого</span>

            <strong className="text-2xl tabular-nums">
              {hasPriceRequestItems
                ? "Уточняется"
                : `${totalPrice.toLocaleString("ru-RU")} ₽`}
            </strong>
          </div>

          <p className="mt-2 text-right text-xs text-muted-foreground">
            Без учёта доставки
          </p>

          {/* Условия оплаты */}
          <div className="mt-4 rounded-xl bg-secondary/40 p-3">
            <p className="text-xs leading-5 text-muted-foreground">
              70% предоплата. Оставшиеся 30% оплачиваются после готовности
              заказа перед отправкой.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
