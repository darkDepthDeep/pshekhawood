// src/components/catalog/ProductGrid.tsx
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

import { ProductCardPreview } from "@/entities/product/ui/ProductCardPreview";
import type { Product, WoodType } from "@/entities/product/model/types";

interface ProductGridProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  activeWoodType?: WoodType;
  basePath?: string; // Адрес текущего раздела каталога
}

export default function ProductGrid({
  products,
  currentPage,
  totalPages,
  activeWoodType,
  basePath = "/catalog",
}: ProductGridProps) {
  const searchParams = useSearchParams();

  // Проверяем наличие активных содержательных фильтров
  const hasActiveFilters =
    searchParams.has("woodType") ||
    searchParams.has("purpose") ||
    searchParams.has("postKind") ||
    searchParams.has("style");

  // Ссылка после сброса фильтров
  const getResetFiltersHref = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("woodType");
    params.delete("purpose");
    params.delete("postKind");
    params.delete("style");
    params.delete("page");

    const query = params.toString();

    return query ? `${basePath}?${query}` : basePath;
  };

  // Ссылка страницы с сохранением фильтров
  const getPageHref = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }

    const query = params.toString();

    // Сохраняем текущую категорию при переходе между страницами
    return query ? `${basePath}?${query}` : basePath;
  };

  // Пустой результат каталога
  if (products.length === 0) {
    return (
      <section
        className="rounded-xl border border-border bg-card px-6 py-20 text-center"
        role="status"
        aria-live="polite"
      >
        {hasActiveFilters ? (
          <>
            <h3 className="text-xl font-bold text-foreground">
              По выбранным фильтрам ничего не найдено
            </h3>

            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
              Попробуйте изменить параметры поиска или сбросить выбранные
              фильтры.
            </p>

            <Link
              href={getResetFiltersHref()}
              className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
              Сбросить фильтры
            </Link>
          </>
        ) : (
          <>
            <h3 className="text-xl font-bold text-foreground">
              В этой категории пока нет товаров
            </h3>

            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
              Мы постепенно добавляем новые изделия в каталог.
            </p>

            <Link
              href="/custom-order"
              className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Заказать изделие
            </Link>
          </>
        )}
      </section>
    );
  }

  return (
    <section aria-label="Список товаров">
      {/* Список карточек товаров */}
      <ul className="m-0 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCardPreview
              product={product}
              activeWoodType={activeWoodType}
            />
          </li>
        ))}
      </ul>

      {/* Пагинация */}
      {totalPages > 1 && (
        <nav
          className="mt-10 mb-8 flex items-center justify-center gap-2"
          aria-label="Навигация по страницам каталога"
        >
          {/* Назад */}
          {currentPage > 1 ? (
            <Link
              href={getPageHref(currentPage - 1)}
              aria-label="Предыдущая страница"
              className="inline-flex h-9 items-center justify-center rounded-md border border-border px-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary/50"
            >
              <ChevronLeft className="mr-1 size-4" aria-hidden="true" />
              Назад
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className="inline-flex h-9 cursor-not-allowed items-center justify-center rounded-md border border-border px-3 text-sm font-medium text-muted-foreground opacity-50"
            >
              <ChevronLeft className="mr-1 size-4" aria-hidden="true" />
              Назад
            </span>
          )}

          {/* Номера страниц */}
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Link
                key={page}
                href={getPageHref(page)}
                aria-current={page === currentPage ? "page" : undefined}
                className={`inline-flex size-9 items-center justify-center rounded-md border text-sm font-medium transition-colors ${page === currentPage ? "border-transparent bg-primary text-primary-foreground" : "border-border text-foreground hover:bg-secondary/50"}`}
              >
                {page}
              </Link>
            ))}
          </div>

          {/* Вперёд */}
          {currentPage < totalPages ? (
            <Link
              href={getPageHref(currentPage + 1)}
              aria-label="Следующая страница"
              className="inline-flex h-9 items-center justify-center rounded-md border border-border px-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary/50"
            >
              Вперёд
              <ChevronRight className="ml-1 size-4" aria-hidden="true" />
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className="inline-flex h-9 cursor-not-allowed items-center justify-center rounded-md border border-border px-3 text-sm font-medium text-muted-foreground opacity-50"
            >
              Вперёд
              <ChevronRight className="ml-1 size-4" aria-hidden="true" />
            </span>
          )}
        </nav>
      )}
    </section>
  );
}
