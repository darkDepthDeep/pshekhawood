"use client";

import { ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useIsMounted } from "@/shared/lib/use-is-mounted";

import { useCartUI } from "../model/context";
import { useCartStore } from "../model/store";

export function CartFab() {
  // Текущая страница
  const pathname = usePathname();

  // Управление корзиной
  const { setOpen } = useCartUI();

  // Ждём монтирования
  const isMounted = useIsMounted();

  // Количество товаров
  const totalItems = useCartStore((state) => state.totalItems());

  // Скрываем корзину на checkout
  const isCheckoutPage =
    pathname === "/checkout" || pathname.startsWith("/checkout/");

  if (isCheckoutPage) {
    return null;
  }

  // Безопасный первый рендер
  if (!isMounted) {
    return (
      <Button
        size="icon"
        className="fixed bottom-4 right-4 z-50 size-12 rounded-full shadow-lg sm:bottom-6 sm:right-6 sm:size-14"
        disabled
        aria-label="Корзина загружается"
      >
        <ShoppingCart className="size-5 sm:size-6" aria-hidden="true" />
      </Button>
    );
  }

  return (
    <Button
      size="icon"
      className="fixed bottom-4 right-4 z-50 size-12 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 sm:bottom-6 sm:right-6 sm:size-14"
      onClick={() => setOpen(true)}
      aria-label={`Корзина, ${totalItems} товаров`}
    >
      {/* Иконка корзины */}
      <ShoppingCart className="size-5 sm:size-6" aria-hidden="true" />

      {/* Количество товаров */}
      {totalItems > 0 && (
        <Badge
          className="absolute -right-1 -top-1 flex size-5 min-w-5 items-center justify-center px-1 text-xs"
          aria-hidden="true"
        >
          {totalItems > 99 ? "99+" : totalItems}
        </Badge>
      )}
    </Button>
  );
}
