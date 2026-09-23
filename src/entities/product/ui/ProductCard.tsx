"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  ShoppingCart,
  Clock,
  TreePine,
  Ruler,
  Truck,
  X,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCartStore } from "@/features/cart/model/store";
import { QuantityInput } from "@/features/cart/ui/QuantityInput";

import type { Product, ProductVariant, WoodType } from "../model/types";
import { WOOD_TYPES } from "../model/types";

interface ProductCardProps {
  product: Product;
  initialWoodType?: WoodType;
}

// Карточка товара с фотографиями, выбором породы, размера и количества
export function ProductCard({ product, initialWoodType }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);

  // Первая фотография товара показывается основной
  const [selectedImage, setSelectedImage] = useState(product.images[0] ?? "");

  // Открытие увеличенной фотографии
  const [isImageOpen, setIsImageOpen] = useState(false);

  // Предыдущее фото
  const showPreviousImage = useCallback(() => {
    setSelectedImage((currentImage) => {
      const currentIndex = product.images.indexOf(currentImage);
      const previousIndex =
        currentIndex <= 0 ? product.images.length - 1 : currentIndex - 1;

      return product.images[previousIndex] ?? currentImage;
    });
  }, [product.images]);

  // Следующее фото
  const showNextImage = useCallback(() => {
    setSelectedImage((currentImage) => {
      const currentIndex = product.images.indexOf(currentImage);
      const nextIndex =
        currentIndex >= product.images.length - 1 ? 0 : currentIndex + 1;

      return product.images[nextIndex] ?? currentImage;
    });
  }, [product.images]);

  // Esc закрывает фото, стрелки переключают фотографии
  useEffect(() => {
    if (!isImageOpen) return;

    // Блокируем прокрутку страницы под открытой фотографией
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsImageOpen(false);
      }

      if (event.key === "ArrowLeft") {
        showPreviousImage();
      }

      if (event.key === "ArrowRight") {
        showNextImage();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isImageOpen, showPreviousImage, showNextImage]);

  const addItem = useCartStore((state) => state.addItem);

  // Показываем только те породы, для которых у товара есть варианты
  const availableWoodTypes = WOOD_TYPES.filter((woodType) =>
    product.variants.some((variant) => variant.woodType === woodType.value),
  );

  // Определяем стартовую породу: из URL или первый вариант товара
  const startWoodType =
    initialWoodType &&
    product.variants.some((variant) => variant.woodType === initialWoodType)
      ? initialWoodType
      : product.variants[0].woodType;

  // Выбранная порода дерева
  const [selectedWoodType, setSelectedWoodType] =
    useState<WoodType>(startWoodType);

  // Выбранный вариант товара
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(() => {
    const firstForWood = product.variants.find(
      (variant) => variant.woodType === startWoodType,
    );

    return firstForWood ?? product.variants[0];
  });

  // Цена выбранного варианта с учётом количества
  const totalPrice =
    selectedVariant.price === null
      ? null
      : selectedVariant.price * Math.max(1, quantity);

  // Размеры, доступные для выбранной породы дерева
  const filteredVariants = product.variants.filter(
    (variant) => variant.woodType === selectedWoodType,
  );

  // При смене породы выбираем первый доступный вариант новой породы
  const handleWoodTypeChange = (value: WoodType | null) => {
    if (!value) return;

    setSelectedWoodType(value);

    const firstVariantForWood = product.variants.find(
      (variant) => variant.woodType === value,
    );

    if (firstVariantForWood) {
      setSelectedVariant(firstVariantForWood);
    }
  };

  // Смена размера товара
  const handleSizeChange = (id: string | null) => {
    if (!id) return;

    const variant = product.variants.find((item) => item.id === id);

    if (variant) {
      setSelectedVariant(variant);
    }
  };

  // Добавление товара в корзину
  const handleAddToCart = () => {
    // Товар без цены в корзину не добавляем
    if (selectedVariant.price === null) return;

    const safeQuantity = Math.max(1, quantity);

    addItem(product, selectedVariant, safeQuantity);
    setQuantity(1);
  };

  return (
    <>
      <article className="grid gap-6 rounded-xl border bg-card p-5 shadow-sm sm:gap-8 sm:p-6 lg:grid-cols-2 lg:gap-10">
        {/* Галерея товара */}
        <div>
          {/* Основное изображение */}
          <div
            className={`group relative w-full overflow-hidden rounded-lg bg-card ${product.category === "legs" ? "aspect-square" : "aspect-4/5"}`}
          >
            {selectedImage ? (
              <button
                type="button"
                onClick={() => setIsImageOpen(true)}
                className="relative size-full cursor-zoom-in"
                aria-label={`Увеличить фото товара ${product.name}`}
              >
                <Image
                  src={selectedImage}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain transition duration-300 group-hover:scale-[1.02]"
                  priority
                />

                <span className="absolute bottom-3 right-3 flex size-10 items-center justify-center rounded-full bg-background/85 shadow-sm backdrop-blur-sm transition group-hover:bg-background">
                  <ZoomIn
                    className="size-5 text-foreground"
                    aria-hidden="true"
                  />
                </span>
              </button>
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                Фото товара
              </div>
            )}
          </div>

          {/* Миниатюры показываем только если фотографий больше одной */}
          {product.images.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
              {product.images.map((image, index) => {
                const isActive = image === selectedImage;

                return (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setSelectedImage(image)}
                    aria-label={`Показать фото ${index + 1} товара ${product.name}`}
                    aria-pressed={isActive}
                    className={`relative aspect-square overflow-hidden rounded-lg border-2 bg-background transition ${isActive ? "border-primary" : "border-transparent hover:border-border"}`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} — фото ${index + 1}`}
                      fill
                      sizes="120px"
                      className="object-contain"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Информация о товаре */}
        <div className="flex flex-col">
          {/* Название товара */}
          <h1 className="mb-1 text-2xl font-semibold sm:text-3xl">
            {product.name}
          </h1>

          {/* Описание товара */}
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {product.description}
          </p>

          {/* Основные преимущества товара */}
          <div className="mt-5 grid gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-1 xl:grid-cols-3">
            <div className="flex items-center gap-3 rounded-lg border bg-background/50 px-3 py-2.5">
              <TreePine
                className="size-5 shrink-0 text-primary"
                aria-hidden="true"
              />

              <div>
                <p className="text-sm font-semibold leading-5">Массив дерева</p>
                <p className="text-xs leading-4 text-muted-foreground">
                  Бук, ясень или дуб
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border bg-background/50 px-3 py-2.5">
              <Ruler
                className="size-5 shrink-0 text-primary"
                aria-hidden="true"
              />

              <div>
                <p className="text-sm font-semibold leading-5">Под заказ</p>
                <p className="text-xs leading-4 text-muted-foreground">
                  По вашим размерам
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border bg-background/50 px-3 py-2.5">
              <Truck
                className="size-5 shrink-0 text-primary"
                aria-hidden="true"
              />

              <div>
                <p className="text-sm font-semibold leading-5">Доставка</p>
                <p className="text-xs leading-4 text-muted-foreground">
                  По России
                </p>
              </div>
            </div>
          </div>

          {/* Выбор породы дерева */}
          <div className="mb-4 mt-4 space-y-2">
            <label htmlFor="wood-type-select" className="text-sm font-medium">
              Порода дерева
            </label>

            <Select
              value={selectedWoodType}
              onValueChange={handleWoodTypeChange}
            >
              <SelectTrigger id="wood-type-select" className="w-full">
                <SelectValue placeholder="Выберите породу">
                  {
                    WOOD_TYPES.find(
                      (woodType) => woodType.value === selectedWoodType,
                    )?.label
                  }
                </SelectValue>
              </SelectTrigger>

              <SelectContent
                align="start"
                side="bottom"
                alignItemWithTrigger={false}
                className="max-h-60"
              >
                {availableWoodTypes.map((woodType) => (
                  <SelectItem key={woodType.value} value={woodType.value}>
                    {woodType.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Выбор размера */}
          <div className="mb-4 space-y-2">
            <label htmlFor="size-select" className="text-sm font-medium">
              Размер
            </label>

            <Select value={selectedVariant.id} onValueChange={handleSizeChange}>
              <SelectTrigger id="size-select" className="w-full">
                <SelectValue placeholder="Выберите размер">
                  {selectedVariant.size}
                </SelectValue>
              </SelectTrigger>

              <SelectContent
                align="start"
                side="bottom"
                alignItemWithTrigger={false}
                className="max-h-60"
              >
                {filteredVariants.map((variant) => (
                  <SelectItem key={variant.id} value={variant.id}>
                    {variant.size} —{" "}
                    {variant.price === null
                      ? "Цена по запросу"
                      : `${variant.price.toLocaleString("ru-RU")} ₽`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Количество и цена */}
          <div className="mb-4 grid gap-4 sm:grid-cols-2 sm:items-end">
            <div className="space-y-1.5">
              <label
                htmlFor="quantity-input"
                className="block text-sm font-medium"
              >
                Количество
              </label>

              <QuantityInput
                id="quantity-input"
                value={quantity}
                onChange={setQuantity}
                min={1}
                max={9999}
                ariaLabel={`Количество ${product.name}`}
              />
            </div>

            <div className="sm:text-right">
              <span className="mb-1 block text-xs text-muted-foreground">
                Стоимость
              </span>

              <output
                className="text-xl font-bold sm:text-2xl"
                aria-live="polite"
              >
                {totalPrice === null
                  ? "Цена по запросу"
                  : `${totalPrice.toLocaleString("ru-RU")} ₽`}
              </output>
            </div>
          </div>

          {/* Артикул и срок изготовления */}
          <dl className="mb-3 flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <dt className="sr-only">Артикул</dt>
            <dd className="break-words">Арт. {selectedVariant.sku}</dd>

            <dt className="sr-only">Срок изготовления</dt>
            <dd className="flex items-center gap-1.5">
              <Clock className="size-4" aria-hidden="true" />
              <span>{selectedVariant.leadTime}</span>
            </dd>
          </dl>

          {/* Покупка или запрос цены */}
          {selectedVariant.price === null ? (
            <Link
              href={`/custom-order?product=${product.slug}&wood=${selectedWoodType}&quantity=${Math.max(1, quantity)}`}
              className={`${buttonVariants({ size: "lg" })} w-full`}
            >
              Уточнить цену
            </Link>
          ) : (
            <Button onClick={handleAddToCart} className="w-full" size="lg">
              <ShoppingCart className="mr-2 size-4" aria-hidden="true" />
              Добавить в корзину
            </Button>
          )}

          {/* Индивидуальный размер */}
          <div className="mt-4 flex flex-col gap-3 rounded-xl border bg-secondary/30 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Не нашли нужный размер?
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Изготовим по вашим размерам.
              </p>
            </div>

            <Link
              href={`/custom-order?product=${product.slug}&wood=${selectedWoodType}&quantity=${Math.max(1, quantity)}`}
              className="shrink-0 rounded-lg border border-primary px-4 py-2 text-center text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
            >
              Оставить заявку
            </Link>
          </div>
        </div>
      </article>

      {/* Увеличенная фотография */}
      {isImageOpen && selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Увеличенное фото товара ${product.name}`}
          onClick={() => setIsImageOpen(false)}
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-3 sm:p-4"
        >
          {/* Закрытие */}
          <button
            type="button"
            onClick={() => setIsImageOpen(false)}
            aria-label="Закрыть увеличенное фото"
            className="absolute right-4 top-4 z-20 flex size-11 items-center justify-center rounded-full bg-background text-foreground shadow-lg transition hover:opacity-90"
          >
            <X className="size-5" aria-hidden="true" />
          </button>

          {/* Предыдущее фото */}
          {product.images.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPreviousImage();
              }}
              aria-label="Предыдущее фото"
              className="absolute left-3 z-20 flex size-11 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg transition hover:bg-background sm:left-6 sm:size-12"
            >
              <ChevronLeft className="size-6" aria-hidden="true" />
            </button>
          )}

          {/* Большое фото */}
          <div
            onClick={(event) => event.stopPropagation()}
            className="relative h-[85vh] w-full max-w-6xl"
          >
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {/* Следующее фото */}
          {product.images.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNextImage();
              }}
              aria-label="Следующее фото"
              className="absolute right-3 z-20 flex size-11 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg transition hover:bg-background sm:right-6 sm:size-12"
            >
              <ChevronRight className="size-6" aria-hidden="true" />
            </button>
          )}
        </div>
      )}
    </>
  );
}
