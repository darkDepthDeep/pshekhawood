import { Suspense } from "react";
import { redirect } from "next/navigation";

import { getFilteredProducts, parseCatalogFilters } from "@/lib/catalog";
import type { ProductCategory } from "@/entities/product/model/types";
import ProductGrid from "@/components/catalog/ProductGrid";
import CatalogFilters from "@/components/catalog/CatalogFilters";
import LoadingSkeleton from "@/components/catalog/LoadingSkeleton";
import { CatalogCategories } from "@/components/catalog/CatalogCategories";

type CatalogSearchParams = Record<string, string | string[] | undefined>;

interface CategoryCatalogProps {
  category: ProductCategory;
  title: string;
  description: string;
  basePath: string;
  searchParams: Promise<CatalogSearchParams>;
}

// Общая страница для всех категорий каталога
export async function CategoryCatalog({
  category,
  title,
  description,
  basePath,
  searchParams,
}: CategoryCatalogProps) {
  const resolvedParams = await searchParams;

  // Преобразуем параметры Next.js в URLSearchParams
  const urlSearchParams = new URLSearchParams(
    Object.entries(resolvedParams)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [
        key,
        Array.isArray(value) ? value.join(",") : String(value),
      ]) as string[][],
  );

  // Получаем фильтры из URL
  const filters = parseCatalogFilters(urlSearchParams);

  // Добавляем категорию, которая определяется адресом страницы
  const categoryFilters = {
    ...filters,
    category,
  };

  // Получаем только товары нужной категории
  const { products, total, currentPage, totalPages } =
    getFilteredProducts(categoryFilters);

  const requestedPage = filters.page ?? 1;

  // Исправляем некорректный номер страницы
  if (
    !Number.isFinite(requestedPage) ||
    requestedPage < 1 ||
    requestedPage > totalPages
  ) {
    if (currentPage === 1) {
      urlSearchParams.delete("page");
    } else {
      urlSearchParams.set("page", String(currentPage));
    }

    const query = urlSearchParams.toString();

    redirect(query ? `${basePath}?${query}` : basePath);
  }

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8">
      {/* Заголовок категории */}
      <header className="mb-8">
        <h1 className="mb-2 font-heading text-3xl font-bold text-foreground">
          {title}
        </h1>

        <p className="max-w-3xl text-muted-foreground">{description}</p>
      </header>

      {/* Переключение категорий */}
      <CatalogCategories activeHref={basePath} />

      {/* Фильтры каталога */}
      <section aria-labelledby="catalog-filters-heading">
        <h2 id="catalog-filters-heading" className="sr-only">
          Фильтры каталога
        </h2>

        <CatalogFilters
          currentFilters={filters}
          totalProducts={total}
          basePath={basePath}
        />
      </section>

      {/* Товары */}
      <section aria-labelledby="product-list-heading">
        <h2 id="product-list-heading" className="sr-only">
          Список товаров
        </h2>

        <Suspense fallback={<LoadingSkeleton />}>
          <ProductGrid
            products={products}
            currentPage={currentPage}
            totalPages={totalPages}
            totalProducts={total}
            activeWoodType={filters.woodType}
            basePath={basePath}
          />
        </Suspense>
      </section>
    </main>
  );
}
