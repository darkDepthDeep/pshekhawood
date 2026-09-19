import {
  BALUSTER_STYLES,
  POST_STYLES,
  WOOD_TYPES,
  type Product,
  type ProductCategory,
  type ProductStyle,
  type WoodType,
} from "@/entities/product/model/types";
import { mockProducts } from "@/entities/product/model/mock-data";

// === Фильтры каталога ===
export interface CatalogFilters {
  category?: ProductCategory; // Категория изделия
  woodType?: WoodType; // Порода дерева
  style?: ProductStyle; // Стиль изделия
  page?: number; // Текущая страница
  perPage?: number; // Количество товаров на странице
}

// Количество товаров на странице
const ITEMS_PER_PAGE = 12;

/**
 * Фильтрует товары и выполняет пагинацию.
 */
export function getFilteredProducts(filters: CatalogFilters): {
  products: Product[];
  total: number;
  currentPage: number;
  totalPages: number;
} {
  // Создаём копию массива
  let filtered = [...mockProducts];

  // === Фильтр по категории ===
  if (filters.category) {
    filtered = filtered.filter((product) => {
      return product.category === filters.category;
    });
  }

  // === Фильтр по породе дерева ===
  if (filters.woodType) {
    filtered = filtered.filter((product) => {
      return product.variants.some(
        (variant) => variant.woodType === filters.woodType,
      );
    });
  }

  // === Фильтр балясин по стилю ===
  if (filters.style && filters.category === "balusters") {
    filtered = filtered.filter((product) => {
      return product.balusterStyles?.includes(filters.style!) ?? false;
    });
  }

  // === Фильтр столбов по стилю ===
  if (filters.style && filters.category === "posts") {
    filtered = filtered.filter((product) => {
      return product.postStyles?.includes(filters.style!) ?? false;
    });
  }

  // Общее количество товаров
  const total = filtered.length;

  // Защита номера страницы
  const page = Math.max(1, filters.page || 1);

  // От 1 до 50 товаров на странице
  const perPage = Math.min(50, Math.max(1, filters.perPage || ITEMS_PER_PAGE));

  // Количество страниц
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  // Безопасный номер страницы
  const safePage = page > totalPages ? totalPages : page;

  // Товары текущей страницы
  const startIndex = (safePage - 1) * perPage;
  const paginatedProducts = filtered.slice(startIndex, startIndex + perPage);

  return {
    products: paginatedProducts,
    total,
    currentPage: safePage,
    totalPages,
  };
}

/**
 * Преобразует URL-параметры в безопасный объект фильтров.
 */
export function parseCatalogFilters(
  searchParams: URLSearchParams,
): CatalogFilters {
  const rawWoodType = searchParams.get("woodType");
  const rawStyle = searchParams.get("style");

  // Проверяем породу дерева
  const validWoodType =
    rawWoodType && WOOD_TYPES.some((wood) => wood.value === rawWoodType)
      ? (rawWoodType as WoodType)
      : undefined;

  // Проверяем стиль по всем допустимым стилям
  const validStyles = [...BALUSTER_STYLES, ...POST_STYLES];

  const validStyle =
    rawStyle && validStyles.some((style) => style.value === rawStyle)
      ? (rawStyle as ProductStyle)
      : undefined;

  return {
    woodType: validWoodType,
    style: validStyle,

    // Номер страницы
    page: parseInt(searchParams.get("page") || "1", 10),

    // Количество товаров на странице
    perPage: parseInt(
      searchParams.get("perPage") || String(ITEMS_PER_PAGE),
      10,
    ),
  };
}
