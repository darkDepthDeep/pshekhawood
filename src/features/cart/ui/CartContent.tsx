"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { WOOD_TYPES } from "@/entities/product/model/types";

import { useCartStore } from "../model/store";
import { QuantityInput } from "./QuantityInput";

// Родитель передаёт функцию закрытия корзины
interface CartContentProps {
  onClose: () => void;
}

export function CartContent({ onClose }: CartContentProps) {
  const items = useCartStore((state) => state.items);
  const totalItems = useCartStore((state) => state.totalItems());
  const totalPrice = useCartStore((state) => state.totalPrice());
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  // Проверяем, нет ли в корзине товара без цены
  const hasPriceRequestItems = items.some(
    (cartItem) => cartItem.variant.price === null,
  );

  return (
    <div className="flex h-full flex-col">
      {/* Заголовок */}
      <div className="p-6 pb-0">
        <div className="pr-10">
          <h2 className="text-xl font-semibold">Корзина</h2>
        </div>

        <Separator className="my-4" />
      </div>

      {/* Пустая корзина */}
      {items.length === 0 ? (
        <div
          className="flex flex-1 flex-col items-center justify-center p-6 text-center text-muted-foreground"
          role="status"
          aria-live="polite"
        >
          <ShoppingCart
            className="mb-4 size-16 opacity-20"
            aria-hidden="true"
          />

          <p className="text-lg font-medium text-foreground">Корзина пуста</p>

          <p className="mt-1 text-sm">Добавьте изделия из каталога</p>

          <Link
            href="/catalog"
            onClick={onClose}
            className={`${buttonVariants({ variant: "outline" })} mt-6`}
          >
            Перейти в каталог
          </Link>
        </div>
      ) : (
        <>
          {/* Товары */}
          <ul className="m-0 flex flex-1 flex-col space-y-3 overflow-y-auto px-6 pb-4">
            {items.map((cartItem) => {
              const woodName =
                WOOD_TYPES.find(
                  (wood) => wood.value === cartItem.variant.woodType,
                )?.label ?? cartItem.product.material;

              const image = cartItem.product.images?.[0];

              return (
                <li
                  key={cartItem.variant.id}
                  className="rounded-xl border bg-card p-3 transition-colors hover:bg-accent/5"
                >
                  {/* Верхняя часть позиции */}
                  <div className="flex gap-3">
                    {/* Фото товара */}
                    <Link
                      href={`/catalog/${cartItem.product.slug}`}
                      onClick={onClose}
                      className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted"
                      aria-label={`Открыть ${cartItem.product.name}`}
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

                    {/* Название и характеристики */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/catalog/${cartItem.product.slug}`}
                          onClick={onClose}
                          className="line-clamp-2 text-sm font-semibold leading-5 hover:text-primary"
                        >
                          {cartItem.product.name}
                        </Link>

                        {/* Удаление */}
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          className="shrink-0"
                          onClick={() => removeItem(cartItem.variant.id)}
                          aria-label={`Удалить ${cartItem.product.name} из корзины`}
                        >
                          <X className="size-4" aria-hidden="true" />
                        </Button>
                      </div>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {woodName} · {cartItem.variant.size}
                      </p>

                      {cartItem.variant.sku && (
                        <p className="mt-0.5 text-[11px] text-muted-foreground">
                          Арт. {cartItem.variant.sku}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Количество и цена */}
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={() =>
                          updateQuantity(
                            cartItem.variant.id,
                            cartItem.quantity - 1,
                          )
                        }
                        disabled={cartItem.quantity <= 1}
                        aria-label={`Уменьшить количество ${cartItem.product.name}`}
                      >
                        <Minus className="size-3" aria-hidden="true" />
                      </Button>

                      <QuantityInput
                        value={cartItem.quantity}
                        onChange={(value) =>
                          updateQuantity(cartItem.variant.id, value)
                        }
                        min={1}
                        max={9999}
                        ariaLabel={`Количество ${cartItem.product.name}`}
                      />

                      <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={() =>
                          updateQuantity(
                            cartItem.variant.id,
                            cartItem.quantity + 1,
                          )
                        }
                        aria-label={`Увеличить количество ${cartItem.product.name}`}
                      >
                        <Plus className="size-3" aria-hidden="true" />
                      </Button>
                    </div>

                    <output className="shrink-0 text-sm font-bold tabular-nums">
                      {cartItem.variant.price === null
                        ? "Цена по запросу"
                        : `${(cartItem.variant.price * cartItem.quantity).toLocaleString("ru-RU")} ₽`}
                    </output>
                  </div>

                  {/* Срок изготовления */}
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    Изготовление: {cartItem.variant.leadTime}
                  </p>
                </li>
              );
            })}
          </ul>

          {/* Итог */}
          <div className="sticky bottom-0 space-y-4 border-t bg-background p-6">
            <div>
              <div className="flex items-end justify-between gap-4">
                <span className="text-sm font-medium">Итого</span>

                <output
                  className="text-2xl font-bold tabular-nums"
                  aria-live="polite"
                >
                  {totalPrice.toLocaleString("ru-RU")} ₽
                </output>
              </div>

              <div className="mt-2 flex items-center justify-between gap-3 text-xs text-muted-foreground">
                <span>В корзине: {totalItems} шт.</span>
                <span>Доставка рассчитывается отдельно</span>
              </div>
            </div>

            {/* Переход к оформлению заказа */}
            {hasPriceRequestItems ? (
              <div className="rounded-lg border bg-secondary/30 p-3 text-center text-sm text-muted-foreground">
                В корзине есть товар без указанной цены. Удалите его из корзины
                и отправьте заявку на уточнение цены.
              </div>
            ) : (
              <Link
                href="/checkout"
                onClick={onClose}
                className="flex h-11 w-full items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                Оформить заказ
              </Link>
            )}

            <Button
              variant="ghost"
              className="h-8 w-full text-xs text-muted-foreground"
              onClick={clearCart}
            >
              <Trash2 className="mr-2 size-3.5" aria-hidden="true" />
              Очистить корзину
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
