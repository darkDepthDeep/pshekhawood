// === Порода дерева для фильтрации вариантов ===
export type WoodType = "beech" | "ash" | "oak"; // Бук, Ясень, Дуб

// === Категория товара ===
// Нужна, чтобы понимать к какому разделу относится товар:
// мебельные ножки, балясины или столбы для лестниц
export type ProductCategory = "legs" | "balusters" | "posts";

// Список всех категорий каталога
export const PRODUCT_CATEGORIES: {
  value: ProductCategory; // value — внутреннее значение для кода
  label: string; // label — название, которое увидит покупатель
  slug: string; // slug — адрес категории в URL
}[] = [
  {
    value: "legs",
    label: "Мебельные ножки",
    slug: "mebelnye-nozhki",
  },
  {
    value: "balusters",
    label: "Балясины",
    slug: "balyasiny",
  },
  {
    value: "posts",
    label: "Столбы для лестниц",
    slug: "stolby-dlya-lestnits",
  },
];

export const WOOD_TYPES: { value: WoodType; label: string }[] = [
  { value: "beech", label: "Бук" },
  { value: "ash", label: "Ясень" },
  { value: "oak", label: "Дуб" },
];

// === Типы и стили балясин ===

// === Стили изделий ===
export type ProductStyle = "twisted" | "fluted" | "carved" | "classic";

// Стили балясин для фильтра каталога
export const BALUSTER_STYLES: {
  value: ProductStyle;
  label: string;
}[] = [
  { value: "twisted", label: "Витые" },
  { value: "fluted", label: "Каннелированные" },
  { value: "carved", label: "Резные" },
  { value: "classic", label: "Классические" },
];

// Стили столбов для фильтра каталога
export const POST_STYLES: {
  value: ProductStyle;
  label: string;
}[] = [
  { value: "twisted", label: "Витые" },
  { value: "fluted", label: "Каннелированные" },
  { value: "carved", label: "Резные" },
  { value: "classic", label: "Классические" },
];

// === Вариант товара (размер, цена, остаток) ===
export interface ProductVariant {
  id: string;
  woodType: WoodType;
  size: string; // Размер ножки
  price: number | null; // Цена в р
  sku: string; // Артикул для учёта и отображения в админке
  leadTime: string; // Срок изготовления: "7-10 дней", "2-3 недели"
}

// Товар (карточка мебельной ножки)

export interface Product {
  id: string;
  name: string; // Название: "Ножка мебельная Pshekha Classic"
  description: string; // Описание для карточки и SEO
  material: string; // Материал: "Массив бука", "Дуб"
  images: string[]; // Массив URL изображений (первое = обложка)
  variants: ProductVariant[]; // Все доступные размеры этого товара
  balusterStyles?: ProductStyle[]; // Стили балясины
  postStyles?: ProductStyle[]; // Стили столба
  slug: string; // URL-friendly имя: "nozhka-classic" → /catalog/nozhka-classic
  category: ProductCategory; // Категория: ножки / балясины / столбы
}

// Элемент корзины (товар + выбранный вариант + количество). Храним оба объекта, чтобы не делать повторных запросов при рендере корзины.

export interface CartItem {
  product: Product; // Для названия, фото, материала в корзине
  variant: ProductVariant; // Для цены, размера, срока изготовления
  quantity: number; // Сколько штук заказал клиент
}
