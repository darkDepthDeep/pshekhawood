import type { Metadata } from "next";

import { CategoryCatalog } from "@/components/catalog/CategoryCatalog";
import { getCanonicalUrl } from "@/lib/site";

type CatalogSearchParams = Record<string, string | string[] | undefined>;

interface PageProps {
  searchParams: Promise<CatalogSearchParams>;
}

// SEO страницы категории "Столбы для лестниц"
export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const params = await searchParams;

  // Получаем номер страницы из URL
  const rawPage = params.page;

  const page =
    typeof rawPage === "string" ? Math.max(1, parseInt(rawPage, 10) || 1) : 1;

  // Страницы с фильтрами не индексируем
  const hasFilters =
    params.woodType !== undefined || params.perPage !== undefined;

  // Отдельный title для пагинации
  const title =
    page > 1
      ? `Деревянные столбы для лестниц — страница ${page}`
      : "Деревянные столбы для лестниц";

  // Отдельное описание для пагинации
  const description =
    page > 1
      ? `Каталог деревянных столбов для лестниц — страница ${page}. Изделия из бука, ясеня и дуба стандартных и индивидуальных размеров.`
      : "Деревянные столбы для лестниц из бука, ясеня и дуба. Стандартные модели и изготовление по индивидуальным размерам и эскизам.";

  // Основной URL текущей страницы пагинации
  const canonicalPath =
    page > 1
      ? `/catalog/stolby-dlya-lestnits?page=${page}`
      : "/catalog/stolby-dlya-lestnits";

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

// Страница категории "Столбы для лестниц"
export default function StairPostsPage({ searchParams }: PageProps) {
  return (
    <CategoryCatalog
      category="posts"
      title="Деревянные столбы для лестниц"
      description="Столбы из массива бука, ясеня и дуба для лестниц и ограждений. Стандартные модели и изготовление по вашим размерам и эскизам."
      basePath="/catalog/stolby-dlya-lestnits"
      searchParams={searchParams}
    />
  );
}
