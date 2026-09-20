"use client";

import { ChevronDown, Filter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BALUSTER_STYLES,
  LEG_PURPOSES,
  POST_KINDS,
  POST_STYLES,
  WOOD_TYPES,
  type LegPurpose,
  type PostKind,
  type ProductStyle,
  type WoodType,
} from "@/entities/product/model/types";

interface CatalogFiltersProps {
  currentFilters: {
    woodType?: WoodType;
    purposes?: LegPurpose[];
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

  const [isPurposeOpen, setIsPurposeOpen] = useState(false);
  const purposeRef = useRef<HTMLDivElement>(null);

  // Определяем текущую категорию
  const isLegsCategory = basePath === "/catalog/mebelnye-nozhki";
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

  // Закрываем назначения при клике вне списка
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        purposeRef.current &&
        !purposeRef.current.contains(event.target as Node)
      ) {
        setIsPurposeOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  // Изменение назначения мебельной ножки
  const handlePurposeChange = (purpose: LegPurpose) => {
    const currentPurposes = currentFilters.purposes ?? [];

    const nextPurposes = currentPurposes.includes(purpose)
      ? currentPurposes.filter((item) => item !== purpose)
      : [...currentPurposes, purpose];

    updateFilter(
      "purpose",
      nextPurposes.length > 0 ? nextPurposes.join(",") : null,
    );
  };

  // Сбрасываем все назначения
  const clearPurposes = () => {
    updateFilter("purpose", null);
  };

  // Изменение вида столба
  const handlePostKindChange = (value: string | null) => {
    updateFilter("postKind", value === "all" ? null : value);
  };

  // Изменение стиля изделия
  const handleStyleChange = (value: string | null) => {
    updateFilter("style", value === "all" ? null : value);
  };

  // Текст кнопки назначения
  const selectedPurposeCount = currentFilters.purposes?.length ?? 0;

  const purposeLabel =
    selectedPurposeCount > 0
      ? `Назначение: ${selectedPurposeCount}`
      : "Все назначения";

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

        {/* Выбор назначения мебельной ножки */}
        {isLegsCategory && (
          <div ref={purposeRef} className="relative">
            <button
              type="button"
              onClick={() => setIsPurposeOpen((open) => !open)}
              className="flex h-9 w-44 items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none transition hover:bg-accent sm:w-50"
              aria-haspopup="menu"
              aria-expanded={isPurposeOpen}
            >
              <span className="truncate">{purposeLabel}</span>

              <ChevronDown
                className={`size-4 shrink-0 opacity-50 transition-transform ${isPurposeOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>

            {isPurposeOpen && (
              <div className="absolute left-0 top-full z-50 mt-1 w-56 rounded-md border bg-popover p-2 text-popover-foreground shadow-md">
                {/* Все назначения */}
                <button
                  type="button"
                  onClick={clearPurposes}
                  className="flex w-full items-center gap-3 rounded-sm px-2 py-2 text-left text-sm transition hover:bg-accent"
                >
                  <span
                    className={`flex size-4 items-center justify-center rounded border ${selectedPurposeCount === 0 ? "border-primary bg-primary text-primary-foreground" : "border-input"}`}
                  >
                    {selectedPurposeCount === 0 ? "✓" : ""}
                  </span>

                  <span>Все назначения</span>
                </button>

                <div className="my-1 border-t" />

                {/* Отдельные назначения */}
                {LEG_PURPOSES.map((purpose) => {
                  const isChecked =
                    currentFilters.purposes?.includes(purpose.value) ?? false;

                  return (
                    <label
                      key={purpose.value}
                      className="flex cursor-pointer items-center gap-3 rounded-sm px-2 py-2 text-sm transition hover:bg-accent"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handlePurposeChange(purpose.value)}
                        className="size-4 cursor-pointer accent-primary"
                      />

                      <span>{purpose.label}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        )}

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
