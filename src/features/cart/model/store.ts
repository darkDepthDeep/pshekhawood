import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  CartItem,
  Product,
  ProductVariant,
} from "@/entities/product/model/types";

// Интерфейс состояния корзины. Описывает всё, что можно прочитать и изменить.

interface CartState {
  items: CartItem[];

  //  Actions (изменение состояния)
  addItem: (product: Product, variant: ProductVariant, qty?: number) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, qty: number) => void;
  clearCart: () => void;

  // Selectors (вычисляемы значения)
  totalItems: () => number;
  totalPrice: () => number;
}

// store корзины с сохранением в localStorage. Модель: только под заказ (без проверки остатков)

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      // Добавить товар в корзину
      addItem: (product, variant, qty = 1) =>
        set((state) => {
          // Товар без цены в корзину не добавляем
          if (variant.price === null) {
            return { items: state.items };
          }

          const existing = state.items.find(
            (cartItem) => cartItem.variant.id === variant.id,
          );

          // Если вариант уже есть — увеличиваем количество
          if (existing) {
            return {
              items: state.items.map((cartItem) =>
                cartItem.variant.id === variant.id
                  ? { ...cartItem, quantity: cartItem.quantity + qty }
                  : cartItem,
              ),
            };
          }

          // Добавляем новый вариант
          return {
            items: [...state.items, { product, variant, quantity: qty }],
          };
        }),

      //   Удалить позицию из корзины по ID варианта. Удаляем по variantId, а не productId, потому что один товар может быть в корзине в разных размерах

      removeItem: (variantId) =>
        set((state) => {
          return {
            items: state.items.filter(
              (cartItem) => cartItem.variant.id !== variantId,
            ),
          };
        }),

      // Изменить количество позиции. Минимум 1 штука (под заказ != 0 штук). При qty <= 0 позиция удаляется фильтром ниже.

      updateQuantity: (variantId, qty) =>
        set((state) => {
          return {
            items: state.items
              .map((cartItem) =>
                cartItem.variant.id === variantId
                  ? { ...cartItem, quantity: Math.max(1, qty) }
                  : cartItem,
              )
              .filter((cartItem) => cartItem.quantity > 0),
          };
        }),

      // Очистить корзину полностью
      clearCart: () => set({ items: [] }),

      // Общее количество товаров в корзине
      totalItems: () =>
        get().items.reduce((sum, cartItem) => sum + cartItem.quantity, 0),

      // Общая сумма заказа в рублях
      totalPrice: () =>
        get().items.reduce(
          (sum, cartItem) =>
            sum + (cartItem.variant.price ?? 0) * cartItem.quantity,
          0,
        ),
    }),
    { name: "pshekhawood-cart" },
  ),
);
