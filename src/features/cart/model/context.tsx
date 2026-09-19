"use client";

import { createContext, useContext, useState } from "react";

interface CartUIContextValue {
  // Открыта ли корзина
  open: boolean;

  // Изменить состояние открытия
  setOpen: (open: boolean) => void;
}

// Общий Context корзины
const CartUIContext = createContext<CartUIContextValue | null>(null);

// Provider передаёт состояние всем дочерним компонентам
export function CartUIProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <CartUIContext.Provider
      value={{
        open,
        setOpen,
      }}
    >
      {children}
    </CartUIContext.Provider>
  );
}

// Хук для доступа к состоянию корзины
export function useCartUI() {
  const context = useContext(CartUIContext);

  if (!context) {
    throw new Error(
      "Хук useCartUI должен использоваться внутри CartUIProvider",
    );
  }

  return context;
}
