import type { Metadata } from "next";

import { CategoryCatalog } from "@/components/catalog/CategoryCatalog";
import { getCanonicalUrl } from "@/lib/site";

type CatalogSearchParams = Record<string, string | string[] | undefined>;

interface PageProps {
  searchParams: Promise<CatalogSearchParams>;
}

// SEO страницы категории "Мебельные ножки"
export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const params = await searchParams;

  // Получаем номер страницы из URL
  const rawPage = params.page;

  const page =
    typeof rawPage === "string" ? Math.max(1, parseInt(rawPage, 10) || 1) : 1;

  // Страницы с фильтрами по породе и количеством товаров
  // не отправляем на индексацию поисковикам
  const hasFilters =
    params.woodType !== undefined || params.perPage !== undefined;

  // Для страниц пагинации делаем отдельный title
  const title =
    page > 1
      ? `Мебельные ножки из массива дерева — страница ${page}`
      : "Мебельные ножки из массива дерева";

  // Для страниц пагинации делаем отдельное описание
  const description =
    page > 1
      ? `Каталог мебельных ножек из массива дерева — страница ${page}. Изделия из бука, ясеня и дуба стандартных размеров и под заказ.`
      : "Мебельные ножки из массива бука, ясеня и дуба. Стандартные размеры и изготовление по индивидуальным параметрам.";

  // Основной URL текущей страницы пагинации
  const canonicalPath =
    page > 1
      ? `/catalog/mebelnye-nozhki?page=${page}`
      : "/catalog/mebelnye-nozhki";

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

    // Превью ссылки категории
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

// Страница категории "Мебельные ножки"
export default function FurnitureLegsPage({ searchParams }: PageProps) {
  return (
    <CategoryCatalog
      category="legs"
      title="Мебельные ножки из массива дерева"
      description="Мебельные ножки из массива бука, ясеня и дуба. Стандартные размеры и изготовление по индивидуальным параметрам."
      basePath="/catalog/mebelnye-nozhki"
      searchParams={searchParams}
    />
  );
}
