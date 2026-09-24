// src/app/catalog/page.tsx

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

// Импорт бизнес-логики и UI-компонентов
import { getFilteredProducts, parseCatalogFilters } from "@/lib/catalog";
import ProductGrid from "@/components/catalog/ProductGrid";
import CatalogFilters from "@/components/catalog/CatalogFilters";
import LoadingSkeleton from "@/components/catalog/LoadingSkeleton";
import { CatalogCategories } from "@/components/catalog/CatalogCategories";
import { CatalogSearch } from "@/components/catalog/CatalogSearch";
import { getCanonicalUrl } from "@/lib/site";

type CatalogSearchParams = Record<string, string | string[] | undefined>;

// Параметры URL каталога
interface CatalogPageProps {
  searchParams: Promise<CatalogSearchParams>;
}

// SEO каталога
export async function generateMetadata({
  searchParams,
}: CatalogPageProps): Promise<Metadata> {
  const params = await searchParams;

  // Определяем номер страницы
  const rawPage = params.page;

  const page =
    typeof rawPage === "string" ? Math.max(1, parseInt(rawPage, 10) || 1) : 1;

  // Страницы с фильтрами и поиском не индексируем
  const hasFilters =
    params.q !== undefined ||
    params.woodType !== undefined ||
    params.purpose !== undefined ||
    params.postKind !== undefined ||
    params.style !== undefined ||
    params.perPage !== undefined;

  const title =
    page > 1
      ? `Каталог изделий из дерева — страница ${page}`
      : "Каталог изделий из дерева";

  const description =
    page > 1
      ? `Каталог изделий PshekhaWood — страница ${page}. Мебельные ножки, балясины, столбы и навершия из массива дерева.`
      : "Каталог изделий PshekhaWood: мебельные ножки, балясины, столбы для лестниц и навершия из массива дерева.";

  // Основной URL текущей страницы каталога
  // Поиск и фильтры в canonical не добавляем
  const canonicalPath = page > 1 ? `/catalog?page=${page}` : "/catalog";

  const canonical = getCanonicalUrl(canonicalPath);

  return {
    title,
    description,

    // Основной адрес страницы для поисковых систем
    alternates: canonical
      ? {
          canonical,
        }
      : undefined,

    // Превью ссылки общего каталога
    openGraph: {
      title,
      description,
      siteName: "PshekhaWood",
      locale: "ru_RU",
      type: "website",

      ...(canonical
        ? {
            url: canonical,
          }
        : {}),
    },

    // Дополнительные данные для превью ссылки
    twitter: {
      card: "summary",
      title,
      description,
    },

    // Страницы с фильтрами и поиском не индексируем
    robots: {
      index: !hasFilters,
      follow: true,
    },
  };
}

// Серверная страница каталога
export default async function CatalogPage({ searchParams }: CatalogPageProps) {
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

  // Получаем отфильтрованные и пагинированные товары
  const { products, total, currentPage, totalPages } =
    getFilteredProducts(filters);

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

    redirect(query ? `/catalog?${query}` : "/catalog");
  }

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8">
      {/* Заголовок каталога */}
      <header className="mb-8">
        <h1 className="mb-2 font-heading text-3xl font-bold text-foreground">
          Каталог изделий из дерева
        </h1>

        <p className="max-w-3xl text-muted-foreground">
          Мебельные ножки, балясины, столбы для лестниц и навершия из массива
          дерева. Стандартные изделия и изготовление на заказ.
        </p>
      </header>

      {/* Основные категории каталога */}
      <CatalogCategories activeHref="/catalog" />

      {/* Поиск по всему каталогу */}
      <CatalogSearch basePath="/catalog" />

      {/* Фильтры каталога */}
      <section aria-labelledby="catalog-filters-heading" className="mb-6">
        <h2 id="catalog-filters-heading" className="sr-only">
          Фильтры каталога
        </h2>

        <CatalogFilters
          currentFilters={filters}
          totalProducts={total}
          basePath="/catalog"
        />
      </section>

      {/* Список товаров */}
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
            basePath="/catalog"
          />
        </Suspense>
      </section>
    </main>
  );
}
