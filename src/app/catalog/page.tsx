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

  // Страницы с фильтрами не индексируем
  const hasFilters =
    params.woodType !== undefined ||
    params.style !== undefined ||
    params.perPage !== undefined;

  const title =
    page > 1
      ? `Каталог изделий из дерева — страница ${page}`
      : "Каталог изделий из дерева";

  const description =
    page > 1
      ? `Каталог изделий PshekhaWood — страница ${page}. Мебельные ножки, балясины и столбы для лестниц из массива дерева.`
      : "Каталог изделий PshekhaWood: мебельные ножки, балясины и столбы для лестниц из массива дерева.";

  // Основной URL текущей страницы каталога
  // Фильтры woodType, style и perPage в canonical не добавляем
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

    // Страницы с фильтрами не индексируем
    robots: {
      index: !hasFilters,
      follow: true,
    },
  };
}

// Серверная страница каталога
export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  // Ждем разрешения промиса searchParams (Next.js 15 requirement)
  const resolvedParams = await searchParams;

  // Преобразуем параметры Next.js в URLSearchParams
  const urlSearchParams = new URLSearchParams(
    Object.entries(resolvedParams)
      .filter(([, value]) => value !== undefined) // Убираем пары с undefined
      .map(([key, value]) => [
        key,
        Array.isArray(value) ? value.join(",") : String(value),
      ]) as string[][], // Явное приведение после фильтрации
  );

  // Преобразуем сырые параметры URL в удобный, валидированный объект фильтров
  const filters = parseCatalogFilters(urlSearchParams);

  // Получаем отфильтрованные, безопасные и пагинированные данные
  const { products, total, currentPage, totalPages } =
    getFilteredProducts(filters);

  // Исправляем некорректный номер страницы
  const requestedPage = filters.page ?? 1;

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
    // main: единственный основной контент страницы каталога
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      {/* header + h1: заголовок страницы каталога */}
      <header className="mb-8">
        <h1 className="mb-2 font-heading text-3xl font-bold text-foreground">
          Каталог изделий из дерева
        </h1>
        <p className="max-w-3xl text-muted-foreground">
          Мебельные ножки, балясины и столбы для лестниц из массива дерева.
          Стандартные изделия и изготовление на заказ.
        </p>
      </header>

      {/* Основные категории каталога */}
      <CatalogCategories activeHref="/catalog" />

      {/* section: логический блок фильтров */}
      <section aria-labelledby="catalog-filters-heading" className="mb-6">
        <h2 id="catalog-filters-heading" className="sr-only">
          Фильтры каталога
        </h2>
        <CatalogFilters currentFilters={filters} totalProducts={total} />
      </section>

      {/* section: список товаров с Suspense */}
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
          />
        </Suspense>
      </section>
    </main>
  );
}
