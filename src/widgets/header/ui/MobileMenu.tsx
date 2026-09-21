"use client";

import Link from "next/link";
import {
  ChevronRight,
  CreditCard,
  LayoutGrid,
  MapPin,
  Menu,
  Truck,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { useIsMounted } from "@/shared/lib/use-is-mounted";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Текущая страница
  const pathname = usePathname();

  // Portal создаём только после загрузки страницы в браузере
  const isMounted = useIsMounted();

  // Проверяем активный раздел
  const isCatalogActive =
    pathname === "/catalog" || pathname.startsWith("/catalog/");

  const isDeliveryActive =
    pathname === "/delivery" || pathname.startsWith("/delivery/");

  const isPaymentActive =
    pathname === "/payment" || pathname.startsWith("/payment/");

  const isContactsActive =
    pathname === "/contacts" || pathname.startsWith("/contacts/");

  const isCustomOrderActive =
    pathname === "/custom-order" || pathname.startsWith("/custom-order/");

  // Блокируем прокрутку и закрываем меню по Escape
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // При переходе на десктоп закрываем мобильное меню
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    function handleDesktopChange(event: MediaQueryListEvent) {
      if (event.matches) {
        setIsOpen(false);
      }
    }

    mediaQuery.addEventListener("change", handleDesktopChange);

    return () => {
      mediaQuery.removeEventListener("change", handleDesktopChange);
    };
  }, []);

  return (
    <>
      {/* Кнопка открытия меню */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex size-10 items-center justify-center rounded-lg transition-colors hover:bg-foreground/5 lg:hidden"
        aria-label="Открыть меню"
        aria-expanded={isOpen}
      >
        <Menu className="size-5" aria-hidden="true" />
      </button>

      {/* Выносим мобильное меню за пределы Header */}
      {isMounted &&
        createPortal(
          <>
            {/* Размытие всей страницы */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              tabIndex={isOpen ? 0 : -1}
              aria-label="Закрыть меню"
              className={`fixed inset-x-0 top-0 z-[80] h-dvh bg-black/20 backdrop-blur-[8px] transition-opacity duration-300 lg:hidden ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
            />

            {/* Боковая панель */}
            <nav
              aria-label="Мобильное меню"
              inert={!isOpen}
              className={`fixed right-0 top-0 z-[90] h-dvh w-[68%] max-w-72 border-l border-border bg-background shadow-2xl transition-transform duration-300 ease-out lg:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
              <div className="flex h-full flex-col px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                {/* Верхняя часть */}
                <div className="relative flex min-h-8 items-center">
                  <span className="font-heading text-sm font-bold text-foreground">
                    PshekhaWood
                  </span>

                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="absolute right-3 top-0 flex size-7 items-center justify-center rounded-lg border border-border bg-card transition-colors hover:bg-secondary"
                    aria-label="Закрыть меню"
                  >
                    <X className="size-3.5" aria-hidden="true" />
                  </button>
                </div>

                {/* Навигация */}
                <div className="mt-5">
                  <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Навигация
                  </p>

                  <div className="mr-4 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                    {/* Каталог */}
                    <Link
                      href="/catalog"
                      onClick={() => setIsOpen(false)}
                      aria-current={isCatalogActive ? "page" : undefined}
                      className={`flex items-center gap-2.5 border-b border-border px-3 py-2.5 transition-colors ${isCatalogActive ? "bg-primary/10 text-primary" : "hover:bg-secondary/60"}`}
                    >
                      <span
                        className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${isCatalogActive ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}
                      >
                        <LayoutGrid className="size-4" aria-hidden="true" />
                      </span>

                      <span className="grow text-sm font-semibold">
                        Каталог
                      </span>

                      <ChevronRight
                        className="size-3.5 shrink-0 text-muted-foreground"
                        aria-hidden="true"
                      />
                    </Link>

                    {/* Доставка */}
                    <Link
                      href="/delivery"
                      onClick={() => setIsOpen(false)}
                      aria-current={isDeliveryActive ? "page" : undefined}
                      className={`flex items-center gap-2.5 border-b border-border px-3 py-2.5 transition-colors ${isDeliveryActive ? "bg-primary/10 text-primary" : "hover:bg-secondary/60"}`}
                    >
                      <span
                        className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${isDeliveryActive ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}
                      >
                        <Truck className="size-4" aria-hidden="true" />
                      </span>

                      <span className="grow text-sm font-semibold">
                        Доставка
                      </span>

                      <ChevronRight
                        className="size-3.5 shrink-0 text-muted-foreground"
                        aria-hidden="true"
                      />
                    </Link>

                    {/* Оплата */}
                    <Link
                      href="/payment"
                      onClick={() => setIsOpen(false)}
                      aria-current={isPaymentActive ? "page" : undefined}
                      className={`flex items-center gap-2.5 border-b border-border px-3 py-2.5 transition-colors ${isPaymentActive ? "bg-primary/10 text-primary" : "hover:bg-secondary/60"}`}
                    >
                      <span
                        className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${isPaymentActive ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}
                      >
                        <CreditCard className="size-4" aria-hidden="true" />
                      </span>

                      <span className="grow text-sm font-semibold">Оплата</span>

                      <ChevronRight
                        className="size-3.5 shrink-0 text-muted-foreground"
                        aria-hidden="true"
                      />
                    </Link>

                    {/* Контакты */}
                    <Link
                      href="/contacts"
                      onClick={() => setIsOpen(false)}
                      aria-current={isContactsActive ? "page" : undefined}
                      className={`flex items-center gap-2.5 px-3 py-2.5 transition-colors ${isContactsActive ? "bg-primary/10 text-primary" : "hover:bg-secondary/60"}`}
                    >
                      <span
                        className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${isContactsActive ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}
                      >
                        <MapPin className="size-4" aria-hidden="true" />
                      </span>

                      <span className="grow text-sm font-semibold">
                        Контакты
                      </span>

                      <ChevronRight
                        className="size-3.5 shrink-0 text-muted-foreground"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>

                {/* Заявка */}
                <div className="mr-4 mt-auto pt-5">
                  <Link
                    href="/custom-order"
                    onClick={() => setIsOpen(false)}
                    aria-current={isCustomOrderActive ? "page" : undefined}
                    className={`block rounded-xl px-4 py-3 text-center text-sm font-semibold shadow-sm transition ${isCustomOrderActive ? "bg-primary/85 text-primary-foreground ring-2 ring-primary/25" : "bg-primary text-primary-foreground hover:opacity-90"}`}
                  >
                    Оставить заявку
                  </Link>
                </div>
              </div>
            </nav>
          </>,
          document.body,
        )}
    </>
  );
}
