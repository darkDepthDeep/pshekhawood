import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Безопасно определяет, что код выполняется на клиенте.
 * Не вызывает hydration mismatch и лишних рендеров.
 *
 * Используется для:
 * - Корзины (localStorage через Zustand persist)
 * - Тёмной темы (next-themes)
 * - Медиа-запросов (window.matchMedia)
 * - Любых браузерных API
 */

export function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
