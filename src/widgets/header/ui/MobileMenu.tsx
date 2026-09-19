"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Закрываем меню при клике за его пределами
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative lg:hidden">
      {/* Кнопка бургер */}
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="
          flex
          size-10
          items-center
          justify-center
          rounded-lg
          transition-colors
          hover:bg-foreground/5
        "
        aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {/* Выпадающее меню */}
      {isOpen && (
        <div
          className="
            absolute
            right-0
            top-full
            z-50
            mt-3
            w-52
            overflow-hidden
            rounded-xl
            border
            bg-background
            p-2
            shadow-lg
          "
        >
          <Link
            href="/catalog"
            onClick={() => setIsOpen(false)}
            className="block rounded-lg px-4 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            Каталог
          </Link>

          <Link
            href="/delivery"
            onClick={() => setIsOpen(false)}
            className="block rounded-lg px-4 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            Доставка
          </Link>

          <Link
            href="/payment"
            onClick={() => setIsOpen(false)}
            className="block rounded-lg px-4 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            Оплата
          </Link>

          <Link
            href="/contacts"
            onClick={() => setIsOpen(false)}
            className="block rounded-lg px-4 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            Контакты
          </Link>

          <Link
            href="/custom-order"
            onClick={() => setIsOpen(false)}
            className="mt-1 block rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Оставить заявку
          </Link>
        </div>
      )}
    </div>
  );
}
