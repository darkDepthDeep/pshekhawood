"use client";

import { CartFab } from "./CartFab";
import { CartSheet } from "./CartSheet";
import { useCartUI } from "../model/context";

export function Cart() {
  // Получаем общее состояние корзины
  const { open, setOpen } = useCartUI();

  return (
    <>
      {/* Плавающая кнопка */}
      <CartFab />

      {/* Панель корзины */}
      <CartSheet open={open} onOpenChange={setOpen} />
    </>
  );
}
