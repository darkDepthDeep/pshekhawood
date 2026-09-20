import Image from "next/image";
import Link from "next/link";

import type { Product, WoodType } from "../model/types";

interface ProductCardPreviewProps {
  product: Product;
  activeWoodType?: WoodType;
}

/**
 * Упрощённая карточка товара для каталога.
 */
export function ProductCardPreview({
  product,
  activeWoodType,
}: ProductCardPreviewProps) {
  // Если порода выбрана — считаем цену только по ней
  const relevantVariants = activeWoodType
    ? product.variants.filter((variant) => variant.woodType === activeWoodType)
    : product.variants;

  // Если для выбранной породы вариантов нет — используем все варианты
  const variantsForPrice =
    relevantVariants.length > 0 ? relevantVariants : product.variants;

  // Берём только корректно указанные цены
  const availablePrices = variantsForPrice
    .map((variant) => variant.price)
    .filter(
      (price): price is number =>
        price !== null && Number.isFinite(price) && price > 0,
    );

  // Минимальная цена товара
  const minPrice =
    availablePrices.length > 0 ? Math.min(...availablePrices) : null;

  // Сохраняем выбранную породу при переходе в карточку
  const href = activeWoodType
    ? `/catalog/${product.slug}?woodType=${activeWoodType}`
    : `/catalog/${product.slug}`;

  // Единый формат фотографий в каталоге
  const imageAspect = "aspect-[4/5]";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      {/* Фото товара */}
      <Link
        href={href}
        tabIndex={-1}
        className={`relative block ${imageAspect} shrink-0 overflow-hidden bg-card`}
      >
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={`${product.category === "legs" ? "object-cover" : "object-contain"} transition-transform duration-300 group-hover:scale-[1.02]`}
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground select-none">
            Фото товара
          </div>
        )}
      </Link>

      {/* Информация о товаре */}
      <div className="flex grow flex-col p-5">
        {/* Название товара */}
        <h3 className="min-h-10 line-clamp-2 text-base font-bold leading-tight text-card-foreground">
          <Link href={href} className="transition-colors hover:text-primary">
            {product.name}
          </Link>
        </h3>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          {/* Цена товара */}
          <div className="min-w-0">
            <span className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">
              Цена
            </span>

            {minPrice === null ? (
              <span className="whitespace-nowrap text-base font-semibold text-foreground">
                По запросу
              </span>
            ) : (
              <span className="whitespace-nowrap text-xl font-bold text-foreground">
                от {minPrice.toLocaleString("ru-RU")} ₽
              </span>
            )}
          </div>

          {/* Переход в карточку товара */}
          <Link
            href={href}
            aria-label={`Подробнее о товаре ${product.name}`}
            className="shrink-0 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:px-6"
          >
            Подробнее
          </Link>
        </div>
      </div>
    </article>
  );
}
