// src/components/catalog/ProductGrid.tsx
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCardPreview } from "@/entities/product/ui/ProductCardPreview";
import type { Product, WoodType } from "@/entities/product/model/types";

interface ProductGridProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  activeWoodType?: WoodType;
  basePath?: string; // Адрес текущего раздела каталога. Например /catalog/balyasiny
}

export default function ProductGrid({
  products,
  currentPage,
  totalPages,
  activeWoodType,
  basePath = "/catalog",
}: ProductGridProps) {
  const searchParams = useSearchParams();

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

  if (products.length === 0) {
    return (
      // section + role="status": область контента с динамическим сообщением
      <section
        className="text-center py-24 bg-card rounded-xl border border-border"
        role="status"
        aria-live="polite"
      >
        <p className="text-lg text-muted-foreground font-sans">
          Товары не найдены. Попробуйте изменить фильтры.
        </p>
      </section>
    );
  }

  return (
    // section: логическая секция «Список товаров»
    <section aria-label="Список товаров">
      {/* ul/li: семантический список карточек товаров */}
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
        // nav: навигация между страницами каталога
        <nav
          className="flex items-center justify-center gap-2 mt-10 mb-8"
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
                className={`inline-flex size-9 items-center justify-center rounded-md border text-sm font-medium transition-colors ${
                  page === currentPage
                    ? "border-transparent bg-primary text-primary-foreground"
                    : "border-border text-foreground hover:bg-secondary/50"
                }`}
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
