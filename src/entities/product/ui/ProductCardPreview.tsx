import Link from "next/link";
import Image from "next/image";
import type { Product, WoodType } from "../model/types";

interface ProductCardPreviewProps {
  product: Product;
  activeWoodType?: WoodType;
}

/**
 * Упрощенная карточка для каталога (витрина).
 * Только фото, название, цена "от" и ссылка на детальную страницу.
 */
export function ProductCardPreview({
  product,
  activeWoodType,
}: ProductCardPreviewProps) {
  // Если порода выбрана — считаем минимум только по ней, иначе — по всем
  const relevantVariants = activeWoodType
    ? product.variants.filter((v) => v.woodType === activeWoodType)
    : product.variants;

  // Варианты, по которым считаем цену
  const variantsForPrice =
    relevantVariants.length > 0 ? relevantVariants : product.variants;

  // Берём только варианты с указанной ценой
  const availablePrices = variantsForPrice
    .map((variant) => variant.price)
    .filter((price): price is number => price !== null);

  // Минимальная цена, null — цена по запросу
  const minPrice =
    availablePrices.length > 0 ? Math.min(...availablePrices) : null;

  // Ссылка на товар по slug с сохранением породы
  const href = activeWoodType
    ? `/catalog/${product.slug}?woodType=${activeWoodType}`
    : `/catalog/${product.slug}`;

  return (
    // article: самостоятельная единица контента (товар)
    <article className="group bg-card rounded-xl overflow-hidden border border-border shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 h-full flex flex-col">
      {/* Изображение или заглушка */}
      <div className="relative aspect-4/5 shrink-0 overflow-hidden bg-muted">
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
          <div className="flex h-full items-center justify-center text-muted-foreground text-sm select-none">
            Фото товара
          </div>
        )}
      </div>

      {/* Контент карточки */}
      <div className="p-5 flex flex-col grow">
        {/* h3 внутри Link: заголовок стал кликабельным, но сохранил семантику */}
        <h3 className="min-h-10 line-clamp-2 text-base font-bold leading-tight text-card-foreground">
          <Link href={href} className="hover:text-primary transition-colors">
            {product.name}
          </Link>
        </h3>

        <div className="mt-5 flex items-end justify-between gap-3">
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

          {/*  aria-label: скринридер прочитает контекст кнопки */}
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
