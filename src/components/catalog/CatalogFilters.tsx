"use client";

import { Filter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BALUSTER_STYLES,
  POST_KINDS,
  POST_STYLES,
  WOOD_TYPES,
  type PostKind,
  type ProductStyle,
  type WoodType,
} from "@/entities/product/model/types";

interface CatalogFiltersProps {
  currentFilters: {
    woodType?: WoodType;
    style?: ProductStyle;
    postKind?: PostKind;
    page?: number;
  };

  totalProducts: number;

  // Адрес текущего раздела каталога
  basePath?: string;
}

// Правильное склонение слова "товар"
function getProductWord(count: number) {
  const lastTwoDigits = count % 100;
  const lastDigit = count % 10;

  // 11–14 всегда "товаров"
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return "товаров";
  }

  // 1, 21, 31...
  if (lastDigit === 1) {
    return "товар";
  }

  // 2–4, 22–24...
  if (lastDigit >= 2 && lastDigit <= 4) {
    return "товара";
  }

  return "товаров";
}

/**
 * Панель фильтров каталога.
 * Состояние фильтров хранится в URL.
 */
export default function CatalogFilters({
  currentFilters,
  totalProducts,
  basePath = "/catalog",
}: CatalogFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Определяем текущую категорию
  const isBalustersCategory = basePath === "/catalog/balyasiny";
  const isPostsCategory = basePath === "/catalog/stolby-dlya-lestnits";

  // Выбираем стили для текущей категории
  const styleOptions = isBalustersCategory
    ? BALUSTER_STYLES
    : isPostsCategory
      ? POST_STYLES
      : [];

  // Стиль показываем только у балясин и столбов
  const showStyleFilter = isBalustersCategory || isPostsCategory;

  /**
   * Изменяет выбранный фильтр в URL.
   */
  const updateFilter = useCallback(
    (key: string, value: string | null) => {
      // Создаём копию текущих URL-параметров
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      // После изменения фильтра возвращаемся на первую страницу
      if (key !== "page") {
        params.delete("page");
      }

      const query = params.toString();

      router.push(query ? `${basePath}?${query}` : basePath);
    },
    [basePath, router, searchParams],
  );

  // Изменение породы дерева
  const handleWoodTypeChange = (value: string | null) => {
    updateFilter("woodType", value === "all" ? null : value);
  };

  // Изменение вида столба
  const handlePostKindChange = (value: string | null) => {
    updateFilter("postKind", value === "all" ? null : value);
  };

  // Изменение стиля изделия
  const handleStyleChange = (value: string | null) => {
    updateFilter("style", value === "all" ? null : value);
  };

  return (
    <section
      className="mb-6 flex flex-col items-start justify-between gap-4 border-b border-border pb-6 sm:flex-row sm:items-center"
      aria-label="Фильтры каталога"
    >
      <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
        {/* Декоративная иконка фильтра */}
        <Filter
          className="size-5 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />

        {/* Выбор породы дерева */}
        <Select
          value={currentFilters.woodType || "all"}
          onValueChange={handleWoodTypeChange}
        >
          <SelectTrigger className="w-44 sm:w-50">
            <SelectValue placeholder="Все породы">
              {currentFilters.woodType
                ? WOOD_TYPES.find(
                    (wood) => wood.value === currentFilters.woodType,
                  )?.label
                : "Все породы"}
            </SelectValue>
          </SelectTrigger>

          <SelectContent
            side="bottom"
            align="start"
            alignItemWithTrigger={false}
          >
            <SelectItem value="all">Все породы</SelectItem>

            {WOOD_TYPES.map((wood) => (
              <SelectItem key={wood.value} value={wood.value}>
                {wood.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Выбор вида столба */}
        {isPostsCategory && (
          <Select
            value={currentFilters.postKind || "all"}
            onValueChange={handlePostKindChange}
          >
            <SelectTrigger className="w-44 sm:w-50">
              <SelectValue placeholder="Все виды">
                {currentFilters.postKind
                  ? POST_KINDS.find(
                      (kind) => kind.value === currentFilters.postKind,
                    )?.label
                  : "Все виды"}
              </SelectValue>
            </SelectTrigger>

            <SelectContent
              side="bottom"
              align="start"
              alignItemWithTrigger={false}
            >
              <SelectItem value="all">Все виды</SelectItem>

              {POST_KINDS.map((kind) => (
                <SelectItem key={kind.value} value={kind.value}>
                  {kind.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* Выбор стиля изделия */}
        {showStyleFilter && (
          <Select
            value={currentFilters.style || "all"}
            onValueChange={handleStyleChange}
          >
            <SelectTrigger className="w-44 sm:w-50">
              <SelectValue placeholder="Все стили">
                {currentFilters.style
                  ? styleOptions.find(
                      (style) => style.value === currentFilters.style,
                    )?.label
                  : "Все стили"}
              </SelectValue>
            </SelectTrigger>

            <SelectContent
              side="bottom"
              align="start"
              alignItemWithTrigger={false}
            >
              <SelectItem value="all">Все стили</SelectItem>

              {styleOptions.map((style) => (
                <SelectItem key={style.value} value={style.value}>
                  {style.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Количество найденных товаров */}
      <output className="text-sm text-muted-foreground" aria-live="polite">
        Найдено:{" "}
        <span className="font-medium text-foreground">{totalProducts}</span>{" "}
        {getProductWord(totalProducts)}
      </output>
    </section>
  );
}
