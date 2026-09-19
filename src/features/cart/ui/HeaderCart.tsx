"use client";

import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { useCartStore } from "@/features/cart/model/store";
import { useIsMounted } from "@/shared/lib/use-is-mounted";

import { useCartUI } from "../model/context";

export function HeaderCart() {
  // Получаем управление открытием корзины
  const { setOpen } = useCartUI();

  // Ждём монтирования для безопасного Zustand/localStorage
  const isMounted = useIsMounted();

  // Получаем только количество товаров
  const totalItems = useCartStore((state) => state.totalItems());

  // До монтирования показываем placeholder
  if (!isMounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        disabled
        className="cursor-not-allowed"
        aria-label="Корзина загружается"
      >
        <ShoppingCart className="size-5" aria-hidden="true" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative cursor-pointer rounded-lg transition-colors hover:bg-foreground/10"
      onClick={() => setOpen(true)}
      aria-label={`Корзина, ${totalItems} товаров`}
    >
      {/* Иконка корзины */}
      <ShoppingCart className="size-5 " aria-hidden="true" />

      {/* Счётчик */}
      {totalItems > 0 && (
        <Badge
          className="
            absolute
            -right-1
            -top-1
            flex
            size-5
            min-w-5
            items-center
            justify-center
            px-1
            text-xs
          "
          aria-hidden="true"
        >
          {totalItems > 99 ? "99+" : totalItems}
        </Badge>
      )}
    </Button>
  );
}
