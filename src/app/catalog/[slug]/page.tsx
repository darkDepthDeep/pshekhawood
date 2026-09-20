import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { mockProducts } from "@/entities/product/model/mock-data";
import { ProductCard } from "@/entities/product/ui/ProductCard";
import {
  WOOD_TYPES,
  type ProductCategory,
  type WoodType,
} from "@/entities/product/model/types";
import { getCanonicalUrl } from "@/lib/site";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    woodType?: string | string[];
  }>;
}

// Поиск товара по slug
function getProduct(slug: string) {
  return mockProducts.find((product) => product.slug === slug);
}

// Данные категорий для хлебных крошек
function getCategoryData(category: ProductCategory) {
  const categories: Record<
    ProductCategory,
    {
      label: string;
      href: string;
    }
  > = {
    legs: {
      label: "Мебельные ножки",
      href: "/catalog/mebelnye-nozhki",
    },
    balusters: {
      label: "Балясины",
      href: "/catalog/balyasiny",
    },
    posts: {
      label: "Столбы для лестниц",
      href: "/catalog/stolby-dlya-lestnits",
    },
    finials: {
      label: "Навершия для столбов",
      href: "/catalog/navershiya-dlya-stolbov",
    },
  };

  return categories[category];
}

// Создаём страницы известных товаров
export function generateStaticParams() {
  return mockProducts.map((product) => {
    return {
      slug: product.slug,
    };
  });
}

// SEO конкретного товара
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return {
      title: "Товар не найден",
    };
  }

  // Основной адрес товара всегда без параметров фильтра
  const canonical = getCanonicalUrl(`/catalog/${product.slug}`);

  // Основное изображение товара для превью ссылки
  const productImage = product.images?.[0];

  // Полный URL изображения появится после подключения настоящего домена
  const imageUrl = productImage ? getCanonicalUrl(productImage) : undefined;

  return {
    title: product.name,
    description: product.description,

    // Основной URL карточки товара
    alternates: canonical
      ? {
          canonical,
        }
      : undefined,

    // Превью ссылки для мессенджеров и социальных сетей
    openGraph: {
      title: product.name,
      description: product.description,
      siteName: "PshekhaWood",
      locale: "ru_RU",
      type: "website",

      // URL добавится после подключения настоящего домена
      ...(canonical
        ? {
            url: canonical,
          }
        : {}),

      // Фото добавится автоматически, когда оно появится у товара
      ...(imageUrl
        ? {
            images: [
              {
                url: imageUrl,
                alt: product.name,
              },
            ],
          }
        : {}),
    },

    // Дополнительные метаданные для превью ссылки
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title: product.name,
      description: product.description,

      // Фото добавится автоматически, когда появится у товара
      ...(imageUrl
        ? {
            images: [imageUrl],
          }
        : {}),
    },
  };
}

export default async function ProductPage({
  params,
  searchParams,
}: ProductPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;

  // Получаем товар
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  // Получаем название и ссылку категории товара
  const category = getCategoryData(product.category);

  // Берём только варианты с корректной указанной ценой
  const prices = product.variants
    .map((variant) => variant.price)
    .filter(
      (price): price is number =>
        price !== null && Number.isFinite(price) && price > 0,
    );

  // Есть ли у товара хотя бы одна указанная цена
  const hasPrices = prices.length > 0;

  // Минимальная цена товара
  const minPrice = hasPrices ? Math.min(...prices) : null;

  // Максимальная цена товара
  const maxPrice = hasPrices ? Math.max(...prices) : null;

  // Основной адрес карточки товара
  const productUrl = getCanonicalUrl(`/catalog/${product.slug}`);

  // Основное изображение товара
  const productImage = product.images?.[0];

  // Полный URL изображения появится после подключения настоящего домена
  const imageUrl = productImage ? getCanonicalUrl(productImage) : undefined;

  // Структурированные данные Product для поисковых систем
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",

    name: product.name,
    description: product.description,

    // Основное изображение товара
    ...(imageUrl
      ? {
          image: [imageUrl],
        }
      : {}),

    // Бренд товара
    brand: {
      "@type": "Brand",
      name: "PshekhaWood",
    },

    // Категория товара
    category: category.label,

    // Основной URL добавится после подключения настоящего домена
    ...(productUrl
      ? {
          url: productUrl,
        }
      : {}),

    // Цены добавляем только для вариантов с установленной стоимостью
    ...(hasPrices && minPrice !== null && maxPrice !== null
      ? {
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "RUB",
            lowPrice: minPrice,
            highPrice: maxPrice,
            offerCount: prices.length,
          },
        }
      : {}),
  };

  // URL страниц для структурированных хлебных крошек
  const homeUrl = getCanonicalUrl("/");
  const catalogUrl = getCanonicalUrl("/catalog");
  const categoryUrl = getCanonicalUrl(category.href);

  // Структурированные хлебные крошки для поисковых систем
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        ...(homeUrl ? { item: homeUrl } : {}),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Каталог",
        ...(catalogUrl ? { item: catalogUrl } : {}),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category.label,
        ...(categoryUrl ? { item: categoryUrl } : {}),
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.name,
        ...(productUrl ? { item: productUrl } : {}),
      },
    ],
  };

  // Проверяем породу дерева из URL
  const woodTypeParam = resolvedSearchParams.woodType;

  const initialWoodType: WoodType | undefined =
    typeof woodTypeParam === "string" &&
    WOOD_TYPES.some((woodType) => woodType.value === woodTypeParam)
      ? (woodTypeParam as WoodType)
      : undefined;

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8">
      {/* Структурированные данные товара для поисковых систем */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Структурированные хлебные крошки для поисковых систем */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Хлебные крошки */}
      <nav
        aria-label="Хлебные крошки"
        className="mb-6 text-sm text-muted-foreground"
      >
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="transition-colors hover:text-foreground">
              Главная
            </Link>
          </li>

          <li aria-hidden="true">/</li>

          <li>
            <Link
              href="/catalog"
              className="transition-colors hover:text-foreground"
            >
              Каталог
            </Link>
          </li>

          <li aria-hidden="true">/</li>

          <li>
            <Link
              href={category.href}
              className="transition-colors hover:text-foreground"
            >
              {category.label}
            </Link>
          </li>

          <li aria-hidden="true">/</li>

          <li className="text-foreground" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      <ProductCard product={product} initialWoodType={initialWoodType} />
    </main>
  );
}
