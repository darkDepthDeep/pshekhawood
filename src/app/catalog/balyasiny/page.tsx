import type { Metadata } from "next";

import { CategoryCatalog } from "@/components/catalog/CategoryCatalog";
import { getCanonicalUrl } from "@/lib/site";

type CatalogSearchParams = Record<string, string | string[] | undefined>;

interface PageProps {
  searchParams: Promise<CatalogSearchParams>;
}

// SEO страницы категории "Балясины"
export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const params = await searchParams;

  // Получаем номер страницы из URL
  const rawPage = params.page;

  const page =
    typeof rawPage === "string" ? Math.max(1, parseInt(rawPage, 10) || 1) : 1;

  // Страницы с фильтрами и поиском не индексируем
  const hasFilters =
    params.q !== undefined ||
    params.woodType !== undefined ||
    params.style !== undefined ||
    params.perPage !== undefined;

  // Отдельный title для пагинации
  const title =
    page > 1 ? `Деревянные балясины — страница ${page}` : "Деревянные балясины";

  // Отдельное описание для пагинации
  const description =
    page > 1
      ? `Каталог деревянных балясин — страница ${page}. Изделия из бука, ясеня и дуба для лестниц и ограждений.`
      : "Деревянные балясины из бука, ясеня и дуба для лестниц и ограждений. Стандартные модели и изготовление по индивидуальным размерам.";

  // Основной URL текущей страницы пагинации
  const canonicalPath =
    page > 1 ? `/catalog/balyasiny?page=${page}` : "/catalog/balyasiny";

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

    // Страницы с фильтрами и поиском не индексируем
    robots: {
      index: !hasFilters,
      follow: true,
    },
  };
}

// Страница категории "Балясины"
export default function BalustersPage({ searchParams }: PageProps) {
  return (
    <CategoryCatalog
      category="balusters"
      title="Деревянные балясины"
      description="Балясины из массива бука, ясеня и дуба для лестниц и ограждений. Стандартные модели и изготовление по вашим размерам."
      basePath="/catalog/balyasiny"
      searchParams={searchParams}
    />
  );
}
