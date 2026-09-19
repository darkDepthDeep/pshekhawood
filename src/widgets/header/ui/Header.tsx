import Link from "next/link";

import { HeaderCart } from "@/features/cart/ui/HeaderCart";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="relative overflow-visible border-b">
      {/* Фоновое изображение */}
      <picture className="absolute inset-0 overflow-hidden">
        {/* Мобильный фон */}
        <source media="(max-width: 639px)" srcSet="/images/mobile-logo1.png" />

        {/* Desktop / Tablet */}
        <img
          src="/images/header-logo5.png"
          alt=""
          className="size-full object-cover object-[center_48%] max-sm:object-[center_85%]"
          aria-hidden="true"
        />
      </picture>

      {/* Затемнение фона */}
      <div className="absolute inset-0 bg-background/10" aria-hidden="true" />

      {/* Основной контейнер */}
      <div className="relative mx-auto flex h-24 max-w-7xl items-center px-3 sm:px-4">
        {/* Логотип */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex flex-col rounded-xl border border-black/10 bg-background/80 px-3 py-1.5 shadow-sm backdrop-blur-sm sm:px-4 sm:py-2">
            <span className="font-heading text-lg font-extrabold tracking-tight sm:text-xl">
              PshekhaWood
            </span>

            <span className="hidden text-[9px] font-medium uppercase tracking-[0.18em] text-foreground/80 sm:block">
              Деревообработка и производство изделий
            </span>
          </div>
        </Link>

        {/* Навигация */}
        <nav
          aria-label="Основная навигация"
          className="ml-auto flex items-center gap-1 rounded-xl border border-black/10 bg-background/80 px-2 py-1.5 shadow-sm backdrop-blur-sm"
        >
          {/* Desktop */}
          <div className="hidden items-center lg:flex">
            <Link
              href="/catalog"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-foreground/5"
            >
              Каталог
            </Link>

            <Link
              href="/delivery"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-foreground/5"
            >
              Доставка
            </Link>

            <Link
              href="/payment"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-foreground/5"
            >
              Оплата
            </Link>

            <Link
              href="/contacts"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-foreground/5"
            >
              Контакты
            </Link>

            <Link
              href="/custom-order"
              className="ml-1 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Оставить заявку
            </Link>
          </div>

          {/* Mobile burger */}
          <MobileMenu />

          {/* Корзина */}
          <HeaderCart />
        </nav>
      </div>
    </header>
  );
}
