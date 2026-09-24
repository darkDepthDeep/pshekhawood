"use client";

import Link from "next/link";
import { ArrowRight, FileText, PackageSearch, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { mockProducts } from "@/entities/product/model/mock-data";
import { PRODUCT_CATEGORIES } from "@/entities/product/model/types";
import { getProductSearchText, normalizeSearchText } from "@/lib/catalog";
import { useIsMounted } from "@/shared/lib/use-is-mounted";

// Основные страницы сайта для глобального поиска
const SITE_PAGES = [
  {
    title: "Каталог изделий",
    description: "Все изделия PshekhaWood",
    href: "/catalog",
    keywords: "каталог изделия товары продукция",
  },
  {
    title: "Мебельные ножки",
    description: "Ножки для столов, кроватей, диванов и другой мебели",
    href: "/catalog/mebelnye-nozhki",
    keywords: "ножки мебель стол кровать диван кресло стул тумба комод консоль",
  },
  {
    title: "Балясины",
    description: "Деревянные балясины для лестниц и ограждений",
    href: "/catalog/balyasiny",
    keywords: "балясины лестница ограждение",
  },
  {
    title: "Столбы для лестниц",
    description: "Столбы и полустолбы из массива дерева",
    href: "/catalog/stolby-dlya-lestnits",
    keywords: "столбы столб полустолб лестница",
  },
  {
    title: "Навершия для столбов",
    description: "Деревянные навершия для лестничных столбов",
    href: "/catalog/navershiya-dlya-stolbov",
    keywords: "навершия навершие столб лестница",
  },
  {
    title: "Доставка",
    description: "Информация о доставке заказов",
    href: "/delivery",
    keywords: "доставка отправка транспортная компания россия",
  },
  {
    title: "Оплата",
    description: "Условия оплаты заказа",
    href: "/payment",
    keywords: "оплата предоплата платеж 70 30",
  },
  {
    title: "Контакты",
    description: "Как связаться с PshekhaWood",
    href: "/contacts",
    keywords: "контакты телефон почта email адрес связаться",
  },
  {
    title: "Индивидуальный заказ",
    description: "Изготовление изделия по вашим размерам или эскизу",
    href: "/custom-order",
    keywords: "заказ индивидуальный размер эскиз чертеж заявка",
  },
];

export function GlobalSearch() {
  const router = useRouter();
  const isMounted = useIsMounted();

  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Просто закрываем окно поиска
  const closeSearch = () => {
    setIsOpen(false);
  };

  // После перехода закрываем поиск и очищаем запрос
  const handleNavigate = () => {
    setQuery("");
    setIsOpen(false);
  };

  // Нормализуем поисковый запрос
  const normalizedQuery = normalizeSearchText(query);

  // Поиск по страницам сайта
  const pageResults = useMemo(() => {
    if (!normalizedQuery) return [];

    const searchWords = normalizedQuery.split(" ").filter(Boolean);

    return SITE_PAGES.filter((page) => {
      const searchText = normalizeSearchText(
        `${page.title} ${page.description} ${page.keywords}`,
      );

      return searchWords.every((word) => searchText.includes(word));
    }).slice(0, 5);
  }, [normalizedQuery]);

  // Поиск по товарам
  const productResults = useMemo(() => {
    if (!normalizedQuery) return [];

    const searchWords = normalizedQuery.split(" ").filter(Boolean);

    return mockProducts.filter((product) => {
      const searchText = getProductSearchText(product);

      return searchWords.every((word) => searchText.includes(word));
    });
  }, [normalizedQuery]);

  // Открытое окно поиска блокирует прокрутку страницы
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const frame = window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSearch();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      window.cancelAnimationFrame(frame);
    };
  }, [isOpen]);

  // Enter открывает все результаты в каталоге
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) return;

    setQuery("");
    setIsOpen(false);

    router.push(`/catalog?q=${encodeURIComponent(trimmedQuery)}`);
  };

  const visibleProducts = productResults.slice(0, 6);

  const hasResults = pageResults.length > 0 || visibleProducts.length > 0;

  return (
    <>
      {/* Кнопка глобального поиска */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex size-10 items-center justify-center rounded-lg transition-colors hover:bg-foreground/5"
        aria-label="Поиск по сайту"
        aria-expanded={isOpen}
      >
        <Search className="size-5" aria-hidden="true" />
      </button>

      {isMounted &&
        createPortal(
          <>
            {isOpen && (
              <div
                role="dialog"
                aria-modal="true"
                aria-label="Поиск по сайту"
                onPointerDown={(event) => {
                  // Закрываем только если нажатие началось именно на фоне
                  if (event.target === event.currentTarget) {
                    closeSearch();
                  }
                }}
                className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 p-3 pt-20 backdrop-blur-sm sm:p-6 sm:pt-24"
              >
                <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
                  {/* Поле поиска */}
                  <form
                    onSubmit={handleSubmit}
                    className="border-b border-border p-3 sm:p-4"
                  >
                    <div className="relative">
                      <Search
                        className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
                        aria-hidden="true"
                      />

                      <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        maxLength={100}
                        autoComplete="off"
                        placeholder="Название, артикул, размер или раздел сайта..."
                        aria-label="Поиск по сайту"
                        className="h-12 w-full rounded-xl border bg-card pl-12 pr-12 text-sm outline-none transition placeholder:text-muted-foreground focus:ring-2 focus:ring-ring sm:text-base"
                      />

                      {query ? (
                        <button
                          type="button"
                          onClick={() => setQuery("")}
                          className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                          aria-label="Очистить поиск"
                        >
                          <X className="size-4" aria-hidden="true" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={closeSearch}
                          className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                          aria-label="Закрыть поиск"
                        >
                          <X className="size-4" aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  </form>

                  {/* Результаты */}
                  <div className="max-h-[70vh] overflow-y-auto p-3 sm:p-4">
                    {!normalizedQuery ? (
                      <div className="px-2 py-10 text-center">
                        <Search
                          className="mx-auto size-8 text-muted-foreground"
                          aria-hidden="true"
                        />

                        <p className="mt-3 text-sm font-semibold text-foreground">
                          Найдите нужное изделие или раздел сайта
                        </p>

                        <p className="mt-1 text-sm text-muted-foreground">
                          Например: PW-BL-012, балясина, 100×100×1100 или
                          доставка
                        </p>
                      </div>
                    ) : hasResults ? (
                      <div className="space-y-5">
                        {/* Страницы сайта */}
                        {pageResults.length > 0 && (
                          <section>
                            <h2 className="mb-2 px-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                              Страницы
                            </h2>

                            <div className="overflow-hidden rounded-xl border border-border bg-card">
                              {pageResults.map((page) => (
                                <Link
                                  key={page.href}
                                  href={page.href}
                                  onClick={handleNavigate}
                                  className="flex items-center gap-3 border-b border-border px-3 py-3 transition last:border-b-0 hover:bg-secondary/50"
                                >
                                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <FileText
                                      className="size-4"
                                      aria-hidden="true"
                                    />
                                  </div>

                                  <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold text-foreground">
                                      {page.title}
                                    </p>

                                    <p className="truncate text-xs text-muted-foreground">
                                      {page.description}
                                    </p>
                                  </div>

                                  <ArrowRight
                                    className="size-4 shrink-0 text-muted-foreground"
                                    aria-hidden="true"
                                  />
                                </Link>
                              ))}
                            </div>
                          </section>
                        )}

                        {/* Товары */}
                        {visibleProducts.length > 0 && (
                          <section>
                            <div className="mb-2 flex items-center justify-between gap-3 px-1">
                              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                                Товары
                              </h2>

                              <span className="text-xs text-muted-foreground">
                                Найдено: {productResults.length}
                              </span>
                            </div>

                            <div className="overflow-hidden rounded-xl border border-border bg-card">
                              {visibleProducts.map((product) => {
                                const category =
                                  PRODUCT_CATEGORIES.find(
                                    (item) => item.value === product.category,
                                  )?.label ?? "Изделие";

                                return (
                                  <Link
                                    key={product.id}
                                    href={`/catalog/${product.slug}`}
                                    onClick={handleNavigate}
                                    className="flex items-center gap-3 border-b border-border px-3 py-3 transition last:border-b-0 hover:bg-secondary/50"
                                  >
                                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                      <PackageSearch
                                        className="size-4"
                                        aria-hidden="true"
                                      />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                      <p className="line-clamp-2 text-sm font-semibold leading-5 text-foreground">
                                        {product.name}
                                      </p>

                                      <p className="truncate text-xs text-muted-foreground">
                                        {category}
                                        {product.variants[0]?.sku
                                          ? ` · ${product.variants[0].sku}`
                                          : ""}
                                      </p>
                                    </div>

                                    <ArrowRight
                                      className="size-4 shrink-0 text-muted-foreground"
                                      aria-hidden="true"
                                    />
                                  </Link>
                                );
                              })}
                            </div>

                            <Link
                              href={`/catalog?q=${encodeURIComponent(query.trim())}`}
                              onClick={handleNavigate}
                              className="mt-3 flex h-10 items-center justify-center gap-2 rounded-xl border border-primary text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
                            >
                              Показать все товары
                              <ArrowRight
                                className="size-4"
                                aria-hidden="true"
                              />
                            </Link>
                          </section>
                        )}
                      </div>
                    ) : (
                      <div className="px-2 py-10 text-center">
                        <Search
                          className="mx-auto size-8 text-muted-foreground"
                          aria-hidden="true"
                        />

                        <p className="mt-3 text-sm font-semibold text-foreground">
                          Ничего не найдено
                        </p>

                        <p className="mt-1 text-sm text-muted-foreground">
                          Попробуйте изменить запрос.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>,
          document.body,
        )}
    </>
  );
}
