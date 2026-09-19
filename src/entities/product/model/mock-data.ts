import type { Product } from "./types";

// Временные данные каталога.
// Позже заменим их на данные из базы/API.

export const mockProducts: Product[] = [
  {
    id: "prod-001",
    name: "Ножка мебельная Pshekha Classic",
    category: "legs",
    description:
      "Мебельная ножка из массива натурального дерева. Подходит для стульев, столов, комодов и шкафов. Доступна из бука, ясеня и дуба. Покрытие — натуральное масло. Также возможно окрашивание эмалью в любой оттенок по каталогу RAL под заказ.",
    material: "Массив дерева",
    // Фотографии товара
    images: [
      "/images/nozhki.jpg",
      "/images/balyasin.jpg",
      "/images/stolbi.jpg",
    ],
    slug: "nozhka-classic",
    variants: [
      // === БУК (самый доступный) ===
      {
        id: "var-beech-120", // ID варианта
        woodType: "beech", // Порода: бук
        size: "45x35x120", // Размер ШxГxВ в мм
        price: 135, // Цена в рублях
        sku: "PSH-CL-BEE-120", // Артикул
        leadTime: "5-7 рабочих дней", // Срок изготовления
      },
      {
        id: "var-beech-150",
        woodType: "beech",
        size: "45x35x150",
        price: 145,
        sku: "PSH-CL-BEE-150",
        leadTime: "5-7 рабочих дней",
      },
      {
        id: "var-beech-180",
        woodType: "beech",
        size: "45x35x180",
        price: 150,
        sku: "PSH-CL-BEE-180",
        leadTime: "5-7 рабочих дней",
      },
      {
        id: "var-beech-250",
        woodType: "beech",
        size: "45x35x250",
        price: 155,
        sku: "PSH-CL-BEE-250",
        leadTime: "5-7 рабочих дней",
      },
      {
        id: "var-beech-300",
        woodType: "beech",
        size: "45x30x300",
        price: 165,
        sku: "PSH-CL-BEE-300",
        leadTime: "5-7 рабочих дней",
      },
      {
        id: "var-beech-900",
        woodType: "beech",
        size: "45x25x900",
        price: 315,
        sku: "PSH-CL-BEE-900",
        leadTime: "5-7 рабочих дней",
      },

      // === ЯСЕНЬ (средний сегмент) ===
      {
        id: "var-ash-120",
        woodType: "ash", // Порода: ясень
        size: "45x35x120",
        price: 165, // ~20% дороже бука
        sku: "PSH-CL-ASH-120",
        leadTime: "7-10 рабочих дней",
      },
      {
        id: "var-ash-150",
        woodType: "ash",
        size: "45x35x150",
        price: 175,
        sku: "PSH-CL-ASH-150",
        leadTime: "7-10 рабочих дней",
      },
      {
        id: "var-ash-180",
        woodType: "ash",
        size: "45x35x180",
        price: 185,
        sku: "PSH-CL-ASH-180",
        leadTime: "7-10 рабочих дней",
      },
      {
        id: "var-ash-250",
        woodType: "ash",
        size: "45x35x250",
        price: 195,
        sku: "PSH-CL-ASH-250",
        leadTime: "7-10 рабочих дней",
      },
      {
        id: "var-ash-300",
        woodType: "ash",
        size: "45x30x300",
        price: 210,
        sku: "PSH-CL-ASH-300",
        leadTime: "7-10 рабочих дней",
      },
      {
        id: "var-ash-900",
        woodType: "ash",
        size: "45x25x900",
        price: 385,
        sku: "PSH-CL-ASH-900",
        leadTime: "7-10 рабочих дней",
      },

      // === ДУБ (премиум) ===
      {
        id: "var-oak-120",
        woodType: "oak", // Порода: дуб
        size: "45x35x120",
        price: 215, // ~60% дороже бука
        sku: "PSH-CL-OAK-120",
        leadTime: "10-14 рабочих дней",
      },
      {
        id: "var-oak-150",
        woodType: "oak",
        size: "45x35x150",
        price: 235,
        sku: "PSH-CL-OAK-150",
        leadTime: "10-14 рабочих дней",
      },
      {
        id: "var-oak-180",
        woodType: "oak",
        size: "45x35x180",
        price: 250,
        sku: "PSH-CL-OAK-180",
        leadTime: "10-14 рабочих дней",
      },
      {
        id: "var-oak-250",
        woodType: "oak",
        size: "45x35x250",
        price: 270,
        sku: "PSH-CL-OAK-250",
        leadTime: "10-14 рабочих дней",
      },
      {
        id: "var-oak-300",
        woodType: "oak",
        size: "45x30x300",
        price: 295,
        sku: "PSH-CL-OAK-300",
        leadTime: "10-14 рабочих дней",
      },
      {
        id: "var-oak-900",
        woodType: "oak",
        size: "45x25x900",
        price: 520,
        sku: "PSH-CL-OAK-900",
        leadTime: "10-14 рабочих дней",
      },
    ],
  },
  /*=================================== БАЛЯСИНЫ ===========================================*/

  // === БАЛЯСИНА PW-BL-012 ===
  {
    id: "pw-bl-012",
    name: "Балясина классическая PW-BL-012",
    category: "balusters",

    // Тип балясины
    balusterStyles: ["classic"],

    description:
      "Точёная балясина PW-BL-012 из массива дерева для лестниц и ограждений. Стандартный размер 50×50×900 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    // Фотографии товара
    images: [
      "/images/products/balyasiny/PW-BL-012/PW-BL-012_gallery_1.jpg",
      "/images/products/balyasiny/PW-BL-012/PW-BL-012_gallery_2.jpg",
      "/images/products/balyasiny/PW-BL-012/PW-BL-012_gallery_3.jpg",
      "/images/products/balyasiny/PW-BL-012/PW-BL-012_gallery_4.jpg",
    ],

    // Адрес карточки товара
    slug: "balyasina-pw-bl-012",

    variants: [
      // === БУК ===
      {
        id: "pw-bl-012-beech-50x50x900",
        woodType: "beech",
        size: "50×50×900 мм",
        price: null,
        sku: "PW-BL-012-BEE-50X50X900",
        leadTime: "Уточняется при заказе",
      },

      // === ЯСЕНЬ ===
      {
        id: "pw-bl-012-ash-50x50x900",
        woodType: "ash",
        size: "50×50×900 мм",
        price: null,
        sku: "PW-BL-012-ASH-50X50X900",
        leadTime: "Уточняется при заказе",
      },

      // === ДУБ ===
      {
        id: "pw-bl-012-oak-50x50x900",
        woodType: "oak",
        size: "50×50×900 мм",
        price: null,
        sku: "PW-BL-012-OAK-50X50X900",
        leadTime: "Уточняется при заказе",
      },
    ],
  },

  // === БАЛЯСИНА PW-BL-013 ===
  {
    id: "pw-bl-013",
    name: "Балясина классическая PW-BL-013",
    category: "balusters",

    // Типы балясины
    balusterStyles: ["classic"],

    description:
      "Классическая точёная балясина PW-BL-013 из массива дерева для лестниц и ограждений. Стандартный размер 50×50×900 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    // Фотографии товара
    images: [
      "/images/products/balyasiny/PW-BL-013/PW-BL-013_gallery_1.jpg",
      "/images/products/balyasiny/PW-BL-013/PW-BL-013_gallery_2.jpg",
      "/images/products/balyasiny/PW-BL-013/PW-BL-013_gallery_3.jpg",
      "/images/products/balyasiny/PW-BL-013/PW-BL-013_gallery_4.jpg",
    ],

    // Адрес карточки товара
    slug: "balyasina-pw-bl-013",

    variants: [
      // === БУК ===
      {
        id: "pw-bl-013-beech-50x50x900",
        woodType: "beech",
        size: "50×50×900 мм",
        price: null,
        sku: "PW-BL-013-BEE-50X50X900",
        leadTime: "Уточняется при заказе",
      },

      // === ЯСЕНЬ ===
      {
        id: "pw-bl-013-ash-50x50x900",
        woodType: "ash",
        size: "50×50×900 мм",
        price: null,
        sku: "PW-BL-013-ASH-50X50X900",
        leadTime: "Уточняется при заказе",
      },

      // === ДУБ ===
      {
        id: "pw-bl-013-oak-50x50x900",
        woodType: "oak",
        size: "50×50×900 мм",
        price: null,
        sku: "PW-BL-013-OAK-50X50X900",
        leadTime: "Уточняется при заказе",
      },
    ],
  },

  // === БАЛЯСИНА PW-BL-014 ===
  {
    id: "pw-bl-014",
    name: "Балясина классическая PW-BL-014",
    category: "balusters",

    // Типы балясины
    balusterStyles: ["classic"],

    description:
      "Классическая точёная балясина PW-BL-014 из массива дерева для лестниц и ограждений. Стандартный размер 50×50×900 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    // Фотографии товара
    images: [
      "/images/products/balyasiny/PW-BL-014/PW-BL-014_gallery_1.jpg",
      "/images/products/balyasiny/PW-BL-014/PW-BL-014_gallery_2.jpg",
      "/images/products/balyasiny/PW-BL-014/PW-BL-014_gallery_3.jpg",
      "/images/products/balyasiny/PW-BL-014/PW-BL-014_gallery_4.jpg",
    ],

    // Адрес карточки товара
    slug: "balyasina-pw-bl-014",

    variants: [
      // === БУК ===
      {
        id: "pw-bl-014-beech-50x50x900",
        woodType: "beech",
        size: "50×50×900 мм",
        price: null,
        sku: "PW-BL-014-BEE-50X50X900",
        leadTime: "Уточняется при заказе",
      },

      // === ЯСЕНЬ ===
      {
        id: "pw-bl-014-ash-50x50x900",
        woodType: "ash",
        size: "50×50×900 мм",
        price: null,
        sku: "PW-BL-014-ASH-50X50X900",
        leadTime: "Уточняется при заказе",
      },

      // === ДУБ ===
      {
        id: "pw-bl-014-oak-50x50x900",
        woodType: "oak",
        size: "50×50×900 мм",
        price: null,
        sku: "PW-BL-014-OAK-50X50X900",
        leadTime: "Уточняется при заказе",
      },
    ],
  },

  // === БАЛЯСИНА PW-BL-015 ===
  {
    id: "pw-bl-015",
    name: "Балясина классическая PW-BL-015",
    category: "balusters",

    // Типы балясины
    balusterStyles: ["classic"],

    description:
      "Массивная классическая точёная балясина PW-BL-015 из массива дерева для лестниц и ограждений. Стандартный размер 95×95×900 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    // Фотографии товара
    images: [
      "/images/products/balyasiny/PW-BL-015/PW-BL-015_gallery_1.jpg",
      "/images/products/balyasiny/PW-BL-015/PW-BL-015_gallery_2.jpg",
      "/images/products/balyasiny/PW-BL-015/PW-BL-015_gallery_3.jpg",
      "/images/products/balyasiny/PW-BL-015/PW-BL-015_gallery_4.jpg",
    ],

    // Адрес карточки товара
    slug: "balyasina-pw-bl-015",

    variants: [
      // === БУК ===
      {
        id: "pw-bl-015-beech-95x95x900",
        woodType: "beech",
        size: "95×95×900 мм",
        price: null,
        sku: "PW-BL-015-BEE-95X95X900",
        leadTime: "Уточняется при заказе",
      },

      // === ЯСЕНЬ ===
      {
        id: "pw-bl-015-ash-95x95x900",
        woodType: "ash",
        size: "95×95×900 мм",
        price: null,
        sku: "PW-BL-015-ASH-95X95X900",
        leadTime: "Уточняется при заказе",
      },

      // === ДУБ ===
      {
        id: "pw-bl-015-oak-95x95x900",
        woodType: "oak",
        size: "95×95×900 мм",
        price: null,
        sku: "PW-BL-015-OAK-95X95X900",
        leadTime: "Уточняется при заказе",
      },
    ],
  },

  // === БАЛЯСИНА PW-BL-016 ===
  {
    id: "pw-bl-016",
    name: "Балясина классическая PW-BL-016",
    category: "balusters",

    // Типы балясины
    balusterStyles: ["classic"],

    description:
      "Классическая точёная балясина PW-BL-016 из массива дерева для лестниц и ограждений. Стандартный размер 50×50×900 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    // Фотографии товара
    images: [
      "/images/products/balyasiny/PW-BL-016/PW-BL-016_gallery_1.jpg",
      "/images/products/balyasiny/PW-BL-016/PW-BL-016_gallery_2.jpg",
      "/images/products/balyasiny/PW-BL-016/PW-BL-016_gallery_3.jpg",
      "/images/products/balyasiny/PW-BL-016/PW-BL-016_gallery_4.jpg",
    ],

    // Адрес карточки товара
    slug: "balyasina-pw-bl-016",

    variants: [
      // === БУК ===
      {
        id: "pw-bl-016-beech-50x50x900",
        woodType: "beech",
        size: "50×50×900 мм",
        price: null,
        sku: "PW-BL-016-BEE-50X50X900",
        leadTime: "Уточняется при заказе",
      },

      // === ЯСЕНЬ ===
      {
        id: "pw-bl-016-ash-50x50x900",
        woodType: "ash",
        size: "50×50×900 мм",
        price: null,
        sku: "PW-BL-016-ASH-50X50X900",
        leadTime: "Уточняется при заказе",
      },

      // === ДУБ ===
      {
        id: "pw-bl-016-oak-50x50x900",
        woodType: "oak",
        size: "50×50×900 мм",
        price: null,
        sku: "PW-BL-016-OAK-50X50X900",
        leadTime: "Уточняется при заказе",
      },
    ],
  },

  // === БАЛЯСИНА PW-BL-017 ===
  {
    id: "pw-bl-017",
    name: "Балясина классическая PW-BL-017",
    category: "balusters",

    // Типы балясины
    balusterStyles: ["classic"],

    description:
      "Классическая точёная балясина PW-BL-017 из массива дерева для лестниц и ограждений. Стандартный размер 65×65×900 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    // Фотографии товара
    images: [
      "/images/products/balyasiny/PW-BL-017/PW-BL-017_gallery_1.jpg",
      "/images/products/balyasiny/PW-BL-017/PW-BL-017_gallery_2.jpg",
      "/images/products/balyasiny/PW-BL-017/PW-BL-017_gallery_3.jpg",
      "/images/products/balyasiny/PW-BL-017/PW-BL-017_gallery_4.jpg",
    ],

    // Адрес карточки товара
    slug: "balyasina-pw-bl-017",

    variants: [
      // === БУК ===
      {
        id: "pw-bl-017-beech-65x65x900",
        woodType: "beech",
        size: "65×65×900 мм",
        price: null,
        sku: "PW-BL-017-BEE-65X65X900",
        leadTime: "Уточняется при заказе",
      },

      // === ЯСЕНЬ ===
      {
        id: "pw-bl-017-ash-65x65x900",
        woodType: "ash",
        size: "65×65×900 мм",
        price: null,
        sku: "PW-BL-017-ASH-65X65X900",
        leadTime: "Уточняется при заказе",
      },

      // === ДУБ ===
      {
        id: "pw-bl-017-oak-65x65x900",
        woodType: "oak",
        size: "65×65×900 мм",
        price: null,
        sku: "PW-BL-017-OAK-65X65X900",
        leadTime: "Уточняется при заказе",
      },
    ],
  },

  // === БАЛЯСИНА PW-BL-018 ===
  {
    id: "pw-bl-018",
    name: "Балясина классическая PW-BL-018",
    category: "balusters",

    // Типы балясины
    balusterStyles: ["classic"],

    description:
      "Классическая точёная балясина PW-BL-018 из массива дерева для лестниц и ограждений. Стандартный размер 50×50×900 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    // Фотографии товара
    images: [
      "/images/products/balyasiny/PW-BL-018/PW-BL-018_gallery_1.jpg",
      "/images/products/balyasiny/PW-BL-018/PW-BL-018_gallery_2.jpg",
      "/images/products/balyasiny/PW-BL-018/PW-BL-018_gallery_3.jpg",
      "/images/products/balyasiny/PW-BL-018/PW-BL-018_gallery_4.jpg",
    ],

    // Адрес карточки товара
    slug: "balyasina-pw-bl-018",

    variants: [
      // === БУК ===
      {
        id: "pw-bl-018-beech-50x50x900",
        woodType: "beech",
        size: "50×50×900 мм",
        price: null,
        sku: "PW-BL-018-BEE-50X50X900",
        leadTime: "Уточняется при заказе",
      },

      // === ЯСЕНЬ ===
      {
        id: "pw-bl-018-ash-50x50x900",
        woodType: "ash",
        size: "50×50×900 мм",
        price: null,
        sku: "PW-BL-018-ASH-50X50X900",
        leadTime: "Уточняется при заказе",
      },

      // === ДУБ ===
      {
        id: "pw-bl-018-oak-50x50x900",
        woodType: "oak",
        size: "50×50×900 мм",
        price: null,
        sku: "PW-BL-018-OAK-50X50X900",
        leadTime: "Уточняется при заказе",
      },
    ],
  },

  // === БАЛЯСИНА PW-BL-019 ===
  {
    id: "pw-bl-019",
    name: "Балясина каннелированная PW-BL-019",
    category: "balusters",

    // Типы балясины
    balusterStyles: ["fluted", "classic"],

    description:
      "Классическая точёная балясина PW-BL-019 с продольными каннелюрами из массива дерева для лестниц и ограждений. Стандартный размер 60×60×900 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    // Фотографии товара
    images: [
      "/images/products/balyasiny/PW-BL-019/PW-BL-019_gallery_1.jpg",
      "/images/products/balyasiny/PW-BL-019/PW-BL-019_gallery_2.jpg",
      "/images/products/balyasiny/PW-BL-019/PW-BL-019_gallery_3.jpg",
      "/images/products/balyasiny/PW-BL-019/PW-BL-019_gallery_4.jpg",
    ],

    // Адрес карточки товара
    slug: "balyasina-pw-bl-019",

    variants: [
      // === БУК ===
      {
        id: "pw-bl-019-beech-60x60x900",
        woodType: "beech",
        size: "60×60×900 мм",
        price: null,
        sku: "PW-BL-019-BEE-60X60X900",
        leadTime: "Уточняется при заказе",
      },

      // === ЯСЕНЬ ===
      {
        id: "pw-bl-019-ash-60x60x900",
        woodType: "ash",
        size: "60×60×900 мм",
        price: null,
        sku: "PW-BL-019-ASH-60X60X900",
        leadTime: "Уточняется при заказе",
      },

      // === ДУБ ===
      {
        id: "pw-bl-019-oak-60x60x900",
        woodType: "oak",
        size: "60×60×900 мм",
        price: null,
        sku: "PW-BL-019-OAK-60X60X900",
        leadTime: "Уточняется при заказе",
      },
    ],
  },

  // === БАЛЯСИНА PW-BL-020 ===
  {
    id: "pw-bl-020",
    name: "Балясина каннелированная PW-BL-020",
    category: "balusters",

    // Типы балясины
    balusterStyles: ["fluted", "classic"],

    description:
      "Классическая балясина PW-BL-020 с продольными каннелюрами из массива дерева для лестниц и ограждений. Стандартный размер 50×50×900 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    // Фотографии товара
    images: [
      "/images/products/balyasiny/PW-BL-020/PW-BL-020_gallery_1.jpg",
      "/images/products/balyasiny/PW-BL-020/PW-BL-020_gallery_2.jpg",
      "/images/products/balyasiny/PW-BL-020/PW-BL-020_gallery_3.jpg",
      "/images/products/balyasiny/PW-BL-020/PW-BL-020_gallery_4.jpg",
    ],

    // Адрес карточки товара
    slug: "balyasina-pw-bl-020",

    variants: [
      // === БУК ===
      {
        id: "pw-bl-020-beech-50x50x900",
        woodType: "beech",
        size: "50×50×900 мм",
        price: null,
        sku: "PW-BL-020-BEE-50X50X900",
        leadTime: "Уточняется при заказе",
      },

      // === ЯСЕНЬ ===
      {
        id: "pw-bl-020-ash-50x50x900",
        woodType: "ash",
        size: "50×50×900 мм",
        price: null,
        sku: "PW-BL-020-ASH-50X50X900",
        leadTime: "Уточняется при заказе",
      },

      // === ДУБ ===
      {
        id: "pw-bl-020-oak-50x50x900",
        woodType: "oak",
        size: "50×50×900 мм",
        price: null,
        sku: "PW-BL-020-OAK-50X50X900",
        leadTime: "Уточняется при заказе",
      },
    ],
  },

  // === БАЛЯСИНА PW-BL-021 ===
  {
    id: "pw-bl-021",
    name: "Балясина каннелированная PW-BL-021",
    category: "balusters",

    // Типы балясины
    balusterStyles: ["fluted", "classic"],

    description:
      "Классическая балясина PW-BL-021 с продольными каннелюрами из массива дерева для лестниц и ограждений. Стандартный размер 50×50×900 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    // Фотографии товара
    images: [
      "/images/products/balyasiny/PW-BL-021/PW-BL-021_gallery_1.jpg",
      "/images/products/balyasiny/PW-BL-021/PW-BL-021_gallery_2.jpg",
      "/images/products/balyasiny/PW-BL-021/PW-BL-021_gallery_3.jpg",
      "/images/products/balyasiny/PW-BL-021/PW-BL-021_gallery_4.jpg",
    ],

    // Адрес карточки товара
    slug: "balyasina-pw-bl-021",

    variants: [
      // === БУК ===
      {
        id: "pw-bl-021-beech-50x50x900",
        woodType: "beech",
        size: "50×50×900 мм",
        price: null,
        sku: "PW-BL-021-BEE-50X50X900",
        leadTime: "Уточняется при заказе",
      },

      // === ЯСЕНЬ ===
      {
        id: "pw-bl-021-ash-50x50x900",
        woodType: "ash",
        size: "50×50×900 мм",
        price: null,
        sku: "PW-BL-021-ASH-50X50X900",
        leadTime: "Уточняется при заказе",
      },

      // === ДУБ ===
      {
        id: "pw-bl-021-oak-50x50x900",
        woodType: "oak",
        size: "50×50×900 мм",
        price: null,
        sku: "PW-BL-021-OAK-50X50X900",
        leadTime: "Уточняется при заказе",
      },
    ],
  },

  // === БАЛЯСИНА PW-BL-022 ===
  {
    id: "pw-bl-022",
    name: "Балясина каннелированная PW-BL-022",
    category: "balusters",

    // Типы балясины
    balusterStyles: ["fluted", "classic"],

    description:
      "Каннелированная балясина PW-BL-022 из массива дерева для лестниц и ограждений. Стандартный размер 60×60×900 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    images: [
      "/images/products/balyasiny/PW-BL-022/PW-BL-022_gallery_1.jpg",
      "/images/products/balyasiny/PW-BL-022/PW-BL-022_gallery_2.jpg",
      "/images/products/balyasiny/PW-BL-022/PW-BL-022_gallery_3.jpg",
      "/images/products/balyasiny/PW-BL-022/PW-BL-022_gallery_4.jpg",
    ],

    slug: "balyasina-pw-bl-022",

    variants: [
      {
        id: "pw-bl-022-beech-60x60x900",
        woodType: "beech",
        size: "60×60×900 мм",
        price: null,
        sku: "PW-BL-022-BEE-60X60X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-022-ash-60x60x900",
        woodType: "ash",
        size: "60×60×900 мм",
        price: null,
        sku: "PW-BL-022-ASH-60X60X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-022-oak-60x60x900",
        woodType: "oak",
        size: "60×60×900 мм",
        price: null,
        sku: "PW-BL-022-OAK-60X60X900",
        leadTime: "Уточняется при заказе",
      },
    ],
  },

  // === БАЛЯСИНА PW-BL-023 ===
  {
    id: "pw-bl-023",
    name: "Балясина классическая PW-BL-023",
    category: "balusters",

    balusterStyles: ["classic"],

    description:
      "Классическая балясина PW-BL-023 из массива дерева для лестниц и ограждений. Стандартный размер 50×50×900 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    images: [
      "/images/products/balyasiny/PW-BL-023/PW-BL-023_gallery_1.jpg",
      "/images/products/balyasiny/PW-BL-023/PW-BL-023_gallery_2.jpg",
      "/images/products/balyasiny/PW-BL-023/PW-BL-023_gallery_3.jpg",
      "/images/products/balyasiny/PW-BL-023/PW-BL-023_gallery_4.jpg",
    ],

    slug: "balyasina-pw-bl-023",

    variants: [
      {
        id: "pw-bl-023-beech-50x50x900",
        woodType: "beech",
        size: "50×50×900 мм",
        price: null,
        sku: "PW-BL-023-BEE-50X50X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-023-ash-50x50x900",
        woodType: "ash",
        size: "50×50×900 мм",
        price: null,
        sku: "PW-BL-023-ASH-50X50X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-023-oak-50x50x900",
        woodType: "oak",
        size: "50×50×900 мм",
        price: null,
        sku: "PW-BL-023-OAK-50X50X900",
        leadTime: "Уточняется при заказе",
      },
    ],
  },

  // === БАЛЯСИНА PW-BL-024 ===
  {
    id: "pw-bl-024",
    name: "Балясина витая PW-BL-024",
    category: "balusters",

    // Тип балясины
    balusterStyles: ["twisted"],

    description:
      "Витая балясина PW-BL-024 из массива дерева для лестниц и ограждений. Стандартный размер 60×60×900 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    images: [
      "/images/products/balyasiny/PW-BL-024/PW-BL-024_gallery_1.jpg",
      "/images/products/balyasiny/PW-BL-024/PW-BL-024_gallery_2.jpg",
      "/images/products/balyasiny/PW-BL-024/PW-BL-024_gallery_3.jpg",
      "/images/products/balyasiny/PW-BL-024/PW-BL-024_gallery_4.jpg",
    ],

    slug: "balyasina-pw-bl-024",

    variants: [
      {
        id: "pw-bl-024-beech-60x60x900",
        woodType: "beech",
        size: "60×60×900 мм",
        price: null,
        sku: "PW-BL-024-BEE-60X60X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-024-ash-60x60x900",
        woodType: "ash",
        size: "60×60×900 мм",
        price: null,
        sku: "PW-BL-024-ASH-60X60X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-024-oak-60x60x900",
        woodType: "oak",
        size: "60×60×900 мм",
        price: null,
        sku: "PW-BL-024-OAK-60X60X900",
        leadTime: "Уточняется при заказе",
      },
    ],
  },

  // === БАЛЯСИНА PW-BL-025 ===
  {
    id: "pw-bl-025",
    name: "Балясина витая PW-BL-025",
    category: "balusters",

    // Тип балясины
    balusterStyles: ["twisted"],

    description:
      "Витая балясина PW-BL-025 из массива дерева для лестниц и ограждений. Стандартный размер 60×60×900 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    // Фотографии товара
    images: [
      "/images/products/balyasiny/PW-BL-025/PW-BL-025_gallery_1.jpg",
      "/images/products/balyasiny/PW-BL-025/PW-BL-025_gallery_2.jpg",
      "/images/products/balyasiny/PW-BL-025/PW-BL-025_gallery_3.jpg",
      "/images/products/balyasiny/PW-BL-025/PW-BL-025_gallery_4.jpg",
    ],

    // Адрес карточки товара
    slug: "balyasina-pw-bl-025",

    variants: [
      // === БУК ===
      {
        id: "pw-bl-025-beech-60x60x900",
        woodType: "beech",
        size: "60×60×900 мм",
        price: null,
        sku: "PW-BL-025-BEE-60X60X900",
        leadTime: "Уточняется при заказе",
      },

      // === ЯСЕНЬ ===
      {
        id: "pw-bl-025-ash-60x60x900",
        woodType: "ash",
        size: "60×60×900 мм",
        price: null,
        sku: "PW-BL-025-ASH-60X60X900",
        leadTime: "Уточняется при заказе",
      },

      // === ДУБ ===
      {
        id: "pw-bl-025-oak-60x60x900",
        woodType: "oak",
        size: "60×60×900 мм",
        price: null,
        sku: "PW-BL-025-OAK-60X60X900",
        leadTime: "Уточняется при заказе",
      },
    ],
  },

  // === БАЛЯСИНА PW-BL-026 ===
  {
    id: "pw-bl-026",
    name: "Балясина витая PW-BL-026",
    category: "balusters",

    // Тип балясины
    balusterStyles: ["twisted"],

    description:
      "Витая балясина PW-BL-026 из массива дерева для лестниц и ограждений. Стандартный размер 60×60×900 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    // Фотографии товара
    images: [
      "/images/products/balyasiny/PW-BL-026/PW-BL-026_gallery_1.jpg",
      "/images/products/balyasiny/PW-BL-026/PW-BL-026_gallery_2.jpg",
      "/images/products/balyasiny/PW-BL-026/PW-BL-026_gallery_3.jpg",
      "/images/products/balyasiny/PW-BL-026/PW-BL-026_gallery_4.jpg",
    ],

    // Адрес карточки товара
    slug: "balyasina-pw-bl-026",

    variants: [
      {
        id: "pw-bl-026-beech-60x60x900",
        woodType: "beech",
        size: "60×60×900 мм",
        price: null,
        sku: "PW-BL-026-BEE-60X60X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-026-ash-60x60x900",
        woodType: "ash",
        size: "60×60×900 мм",
        price: null,
        sku: "PW-BL-026-ASH-60X60X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-026-oak-60x60x900",
        woodType: "oak",
        size: "60×60×900 мм",
        price: null,
        sku: "PW-BL-026-OAK-60X60X900",
        leadTime: "Уточняется при заказе",
      },
    ],
  },

  // === БАЛЯСИНА PW-BL-027 ===
  {
    id: "pw-bl-027",
    name: "Балясина витая PW-BL-027",
    category: "balusters",

    // Тип балясины
    balusterStyles: ["twisted"],

    description:
      "Витая балясина PW-BL-027 из массива дерева для лестниц и ограждений. Стандартный размер 60×60×900 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    // Фотографии товара
    images: [
      "/images/products/balyasiny/PW-BL-027/PW-BL-027_gallery_1.jpg",
      "/images/products/balyasiny/PW-BL-027/PW-BL-027_gallery_2.jpg",
      "/images/products/balyasiny/PW-BL-027/PW-BL-027_gallery_3.jpg",
      "/images/products/balyasiny/PW-BL-027/PW-BL-027_gallery_4.jpg",
    ],

    // Адрес карточки товара
    slug: "balyasina-pw-bl-027",

    variants: [
      {
        id: "pw-bl-027-beech-60x60x900",
        woodType: "beech",
        size: "80×80×900 мм",
        price: null,
        sku: "PW-BL-027-BEE-60X60X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-027-ash-60x60x900",
        woodType: "ash",
        size: "80×80×900 мм",
        price: null,
        sku: "PW-BL-027-ASH-60X60X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-027-oak-60x60x900",
        woodType: "oak",
        size: "80×80×900 мм",
        price: null,
        sku: "PW-BL-027-OAK-60X60X900",
        leadTime: "Уточняется при заказе",
      },
    ],
  },

  // === БАЛЯСИНА PW-BL-028 ===
  {
    id: "pw-bl-028",
    name: "Балясина витая PW-BL-028",
    category: "balusters",

    // Тип балясины
    balusterStyles: ["twisted"],

    description:
      "Витая балясина PW-BL-028 из массива дерева для лестниц и ограждений. Стандартный размер 60×60×900 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    // Фотографии товара
    images: [
      "/images/products/balyasiny/PW-BL-028/PW-BL-028_gallery_1.jpg",
      "/images/products/balyasiny/PW-BL-028/PW-BL-028_gallery_2.jpg",
      "/images/products/balyasiny/PW-BL-028/PW-BL-028_gallery_3.jpg",
      "/images/products/balyasiny/PW-BL-028/PW-BL-028_gallery_4.jpg",
    ],

    // Адрес карточки товара
    slug: "balyasina-pw-bl-028",

    variants: [
      {
        id: "pw-bl-028-beech-60x60x900",
        woodType: "beech",
        size: "Ø60×900 мм",
        price: null,
        sku: "PW-BL-028-BEE-60X60X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-028-ash-60x60x900",
        woodType: "ash",
        size: "Ø60×900 мм",
        price: null,
        sku: "PW-BL-028-ASH-60X60X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-028-oak-60x60x900",
        woodType: "oak",
        size: "Ø60×900 мм",
        price: null,
        sku: "PW-BL-028-OAK-60X60X900",
        leadTime: "Уточняется при заказе",
      },
    ],
  },

  // === БАЛЯСИНА PW-BL-029 ===
  {
    id: "pw-bl-029",
    name: "Балясина витая PW-BL-029",
    category: "balusters",

    // Тип балясины
    balusterStyles: ["twisted"],

    description:
      "Витая балясина PW-BL-029 из массива дерева для лестниц и ограждений. Стандартный размер 60×60×900 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    // Фотографии товара
    images: [
      "/images/products/balyasiny/PW-BL-029/PW-BL-029_gallery_1.jpg",
      "/images/products/balyasiny/PW-BL-029/PW-BL-029_gallery_2.jpg",
      "/images/products/balyasiny/PW-BL-029/PW-BL-029_gallery_3.jpg",
      "/images/products/balyasiny/PW-BL-029/PW-BL-029_gallery_4.jpg",
    ],

    // Адрес карточки товара
    slug: "balyasina-pw-bl-029",

    variants: [
      {
        id: "pw-bl-029-beech-60x60x900",
        woodType: "beech",
        size: "Ø60×900 мм",
        price: null,
        sku: "PW-BL-029-BEE-60X60X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-029-ash-60x60x900",
        woodType: "ash",
        size: "Ø60×900 мм",
        price: null,
        sku: "PW-BL-029-ASH-60X60X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-029-oak-60x60x900",
        woodType: "oak",
        size: "Ø60×900 мм",
        price: null,
        sku: "PW-BL-029-OAK-60X60X900",
        leadTime: "Уточняется при заказе",
      },
    ],
  },

  // === БАЛЯСИНА PW-BL-030 ===
  {
    id: "pw-bl-030",
    name: "Балясина витая PW-BL-030",
    category: "balusters",

    // Тип балясины
    balusterStyles: ["twisted"],

    description:
      "Витая балясина PW-BL-030 из массива дерева для лестниц и ограждений. Стандартный размер Ø80×900 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    // Фотографии товара
    images: [
      "/images/products/balyasiny/PW-BL-030/PW-BL-030_gallery_1.jpg",
      "/images/products/balyasiny/PW-BL-030/PW-BL-030_gallery_2.jpg",
      "/images/products/balyasiny/PW-BL-030/PW-BL-030_gallery_3.jpg",
      "/images/products/balyasiny/PW-BL-030/PW-BL-030_gallery_4.jpg",
    ],

    // Адрес карточки товара
    slug: "balyasina-pw-bl-030",

    variants: [
      {
        id: "pw-bl-030-beech-d80x900",
        woodType: "beech",
        size: "Ø80×900 мм",
        price: null,
        sku: "PW-BL-030-BEE-D80X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-030-ash-d80x900",
        woodType: "ash",
        size: "Ø80×900 мм",
        price: null,
        sku: "PW-BL-030-ASH-D80X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-030-oak-d80x900",
        woodType: "oak",
        size: "Ø80×900 мм",
        price: null,
        sku: "PW-BL-030-OAK-D80X900",
        leadTime: "Уточняется при заказе",
      },
    ],
  },

  // === БАЛЯСИНА PW-BL-031 ===
  {
    id: "pw-bl-031",
    name: "Балясина витая резная PW-BL-031",
    category: "balusters",

    // Типы балясины
    balusterStyles: ["twisted", "carved"],

    description:
      "Витая резная балясина PW-BL-031 из массива дерева для лестниц и ограждений. Стандартный размер 60×60×900 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    // Фотографии товара
    images: [
      "/images/products/balyasiny/PW-BL-031/PW-BL-031_gallery_1.jpg",
      "/images/products/balyasiny/PW-BL-031/PW-BL-031_gallery_2.jpg",
      "/images/products/balyasiny/PW-BL-031/PW-BL-031_gallery_3.jpg",
      "/images/products/balyasiny/PW-BL-031/PW-BL-031_gallery_4.jpg",
    ],

    // Адрес карточки товара
    slug: "balyasina-pw-bl-031",

    variants: [
      {
        id: "pw-bl-031-beech-60x60x900",
        woodType: "beech",
        size: "60×60×900 мм",
        price: null,
        sku: "PW-BL-031-BEE-60X60X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-031-ash-60x60x900",
        woodType: "ash",
        size: "60×60×900 мм",
        price: null,
        sku: "PW-BL-031-ASH-60X60X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-031-oak-60x60x900",
        woodType: "oak",
        size: "60×60×900 мм",
        price: null,
        sku: "PW-BL-031-OAK-60X60X900",
        leadTime: "Уточняется при заказе",
      },
    ],
  },

  // === БАЛЯСИНА PW-BL-032 ===
  {
    id: "pw-bl-032",
    name: "Балясина витая каннелированная PW-BL-032",
    category: "balusters",

    // Типы балясины
    balusterStyles: ["twisted", "fluted"],

    description:
      "Витая каннелированная балясина PW-BL-032 из массива дерева для лестниц и ограждений. Стандартный размер 60×60×900 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    // Фотографии товара
    images: [
      "/images/products/balyasiny/PW-BL-032/PW-BL-032_gallery_1.jpg",
      "/images/products/balyasiny/PW-BL-032/PW-BL-032_gallery_2.jpg",
      "/images/products/balyasiny/PW-BL-032/PW-BL-032_gallery_3.jpg",
      "/images/products/balyasiny/PW-BL-032/PW-BL-032_gallery_4.jpg",
    ],

    // Адрес карточки товара
    slug: "balyasina-pw-bl-032",

    variants: [
      {
        id: "pw-bl-032-beech-60x60x900",
        woodType: "beech",
        size: "80×80×900 мм",
        price: null,
        sku: "PW-BL-032-BEE-60X60X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-032-ash-60x60x900",
        woodType: "ash",
        size: "80×80×900 мм",
        price: null,
        sku: "PW-BL-032-ASH-60X60X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-032-oak-60x60x900",
        woodType: "oak",
        size: "80×80×900 мм",
        price: null,
        sku: "PW-BL-032-OAK-60X60X900",
        leadTime: "Уточняется при заказе",
      },
    ],
  },

  // === БАЛЯСИНА PW-BL-033 ===
  {
    id: "pw-bl-033",
    name: "Балясина каннелированная PW-BL-033",
    category: "balusters",

    // Типы балясины
    balusterStyles: ["fluted", "classic"],

    description:
      "Каннелированная балясина PW-BL-033 из массива дерева для лестниц и ограждений. Стандартный размер 60×60×900 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    // Фотографии товара
    images: [
      "/images/products/balyasiny/PW-BL-033/PW-BL-033_gallery_1.jpg",
      "/images/products/balyasiny/PW-BL-033/PW-BL-033_gallery_2.jpg",
      "/images/products/balyasiny/PW-BL-033/PW-BL-033_gallery_3.jpg",
      "/images/products/balyasiny/PW-BL-033/PW-BL-033_gallery_4.jpg",
    ],

    // Адрес карточки товара
    slug: "balyasina-pw-bl-033",

    variants: [
      {
        id: "pw-bl-033-beech-60x60x900",
        woodType: "beech",
        size: "60×60×900 мм",
        price: null,
        sku: "PW-BL-033-BEE-60X60X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-033-ash-60x60x900",
        woodType: "ash",
        size: "60×60×900 мм",
        price: null,
        sku: "PW-BL-033-ASH-60X60X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-033-oak-60x60x900",
        woodType: "oak",
        size: "60×60×900 мм",
        price: null,
        sku: "PW-BL-033-OAK-60X60X900",
        leadTime: "Уточняется при заказе",
      },
    ],
  },

  // === БАЛЯСИНА PW-BL-034 ===
  {
    id: "pw-bl-034",
    name: "Балясина каннелированная PW-BL-034",
    category: "balusters",

    // Типы балясины
    balusterStyles: ["fluted", "classic"],

    description:
      "Каннелированная балясина PW-BL-034 из массива дерева для лестниц и ограждений. Стандартный размер 60×60×900 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    // Фотографии товара
    images: [
      "/images/products/balyasiny/PW-BL-034/PW-BL-034_gallery_1.jpg",
      "/images/products/balyasiny/PW-BL-034/PW-BL-034_gallery_2.jpg",
      "/images/products/balyasiny/PW-BL-034/PW-BL-034_gallery_3.jpg",
      "/images/products/balyasiny/PW-BL-034/PW-BL-034_gallery_4.jpg",
    ],

    // Адрес карточки товара
    slug: "balyasina-pw-bl-034",

    variants: [
      {
        id: "pw-bl-034-beech-60x60x900",
        woodType: "beech",
        size: "60×60×900 мм",
        price: null,
        sku: "PW-BL-034-BEE-60X60X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-034-ash-60x60x900",
        woodType: "ash",
        size: "60×60×900 мм",
        price: null,
        sku: "PW-BL-034-ASH-60X60X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-034-oak-60x60x900",
        woodType: "oak",
        size: "60×60×900 мм",
        price: null,
        sku: "PW-BL-034-OAK-60X60X900",
        leadTime: "Уточняется при заказе",
      },
    ],
  },

  // === БАЛЯСИНА PW-BL-035 ===
  {
    id: "pw-bl-035",
    name: "Балясина каннелированная PW-BL-035",
    category: "balusters",

    // Типы балясины
    balusterStyles: ["fluted", "classic"],

    description:
      "Каннелированная балясина PW-BL-035 из массива дерева для лестниц и ограждений. Стандартный размер 50×50×900 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    // Фотографии товара
    images: [
      "/images/products/balyasiny/PW-BL-035/PW-BL-035_gallery_1.jpg",
      "/images/products/balyasiny/PW-BL-035/PW-BL-035_gallery_2.jpg",
      "/images/products/balyasiny/PW-BL-035/PW-BL-035_gallery_3.jpg",
      "/images/products/balyasiny/PW-BL-035/PW-BL-035_gallery_4.jpg",
    ],

    // Адрес карточки товара
    slug: "balyasina-pw-bl-035",

    variants: [
      {
        id: "pw-bl-035-beech-50x50x900",
        woodType: "beech",
        size: "50×50×900 мм",
        price: null,
        sku: "PW-BL-035-BEE-50X50X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-035-ash-50x50x900",
        woodType: "ash",
        size: "50×50×900 мм",
        price: null,
        sku: "PW-BL-035-ASH-50X50X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-035-oak-50x50x900",
        woodType: "oak",
        size: "50×50×900 мм",
        price: null,
        sku: "PW-BL-035-OAK-50X50X900",
        leadTime: "Уточняется при заказе",
      },
    ],
  },

  // === БАЛЯСИНА PW-BL-036 ===
  {
    id: "pw-bl-036",
    name: "Балясина каннелированная PW-BL-036",
    category: "balusters",

    // Типы балясины
    balusterStyles: ["fluted", "classic"],

    description:
      "Каннелированная балясина PW-BL-036 из массива дерева для лестниц и ограждений. Стандартный размер 60×60×900 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    // Фотографии товара
    images: [
      "/images/products/balyasiny/PW-BL-036/PW-BL-036_gallery_1.jpg",
      "/images/products/balyasiny/PW-BL-036/PW-BL-036_gallery_2.jpg",
      "/images/products/balyasiny/PW-BL-036/PW-BL-036_gallery_3.jpg",
      "/images/products/balyasiny/PW-BL-036/PW-BL-036_gallery_4.jpg",
    ],

    // Адрес карточки товара
    slug: "balyasina-pw-bl-036",

    variants: [
      {
        id: "pw-bl-036-beech-60x60x900",
        woodType: "beech",
        size: "60×60×900 мм",
        price: null,
        sku: "PW-BL-036-BEE-60X60X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-036-ash-60x60x900",
        woodType: "ash",
        size: "60×60×900 мм",
        price: null,
        sku: "PW-BL-036-ASH-60X60X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-036-oak-60x60x900",
        woodType: "oak",
        size: "60×60×900 мм",
        price: null,
        sku: "PW-BL-036-OAK-60X60X900",
        leadTime: "Уточняется при заказе",
      },
    ],
  },

  // === БАЛЯСИНА PW-BL-037 ===
  {
    id: "pw-bl-037",
    name: "Балясина резная PW-BL-037",
    category: "balusters",

    // Типы балясины
    balusterStyles: ["carved", "classic"],

    description:
      "Резная балясина PW-BL-037 из массива дерева для лестниц и ограждений. Стандартный размер 50×50×900 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    // Фотографии товара
    images: [
      "/images/products/balyasiny/PW-BL-037/PW-BL-037_gallery_1.jpg",
      "/images/products/balyasiny/PW-BL-037/PW-BL-037_gallery_2.jpg",
      "/images/products/balyasiny/PW-BL-037/PW-BL-037_gallery_3.jpg",
      "/images/products/balyasiny/PW-BL-037/PW-BL-037_gallery_4.jpg",
    ],

    // Адрес карточки товара
    slug: "balyasina-pw-bl-037",

    variants: [
      {
        id: "pw-bl-037-beech-50x50x900",
        woodType: "beech",
        size: "50×50×900 мм",
        price: null,
        sku: "PW-BL-037-BEE-50X50X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-037-ash-50x50x900",
        woodType: "ash",
        size: "50×50×900 мм",
        price: null,
        sku: "PW-BL-037-ASH-50X50X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-037-oak-50x50x900",
        woodType: "oak",
        size: "50×50×900 мм",
        price: null,
        sku: "PW-BL-037-OAK-50X50X900",
        leadTime: "Уточняется при заказе",
      },
    ],
  },

  // === БАЛЯСИНА PW-BL-038 ===
  {
    id: "pw-bl-038",
    name: "Балясина резная PW-BL-038",
    category: "balusters",

    // Типы балясины
    balusterStyles: ["carved", "classic"],

    description:
      "Резная балясина PW-BL-038 из массива дерева для лестниц и ограждений. Стандартный размер 60×60×900 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    // Фотографии товара
    images: [
      "/images/products/balyasiny/PW-BL-038/PW-BL-038_gallery_1.jpg",
      "/images/products/balyasiny/PW-BL-038/PW-BL-038_gallery_2.jpg",
      "/images/products/balyasiny/PW-BL-038/PW-BL-038_gallery_3.jpg",
      "/images/products/balyasiny/PW-BL-038/PW-BL-038_gallery_4.jpg",
    ],

    // Адрес карточки товара
    slug: "balyasina-pw-bl-038",

    variants: [
      {
        id: "pw-bl-038-beech-60x60x900",
        woodType: "beech",
        size: "60×60×900 мм",
        price: null,
        sku: "PW-BL-038-BEE-60X60X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-038-ash-60x60x900",
        woodType: "ash",
        size: "60×60×900 мм",
        price: null,
        sku: "PW-BL-038-ASH-60X60X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-038-oak-60x60x900",
        woodType: "oak",
        size: "60×60×900 мм",
        price: null,
        sku: "PW-BL-038-OAK-60X60X900",
        leadTime: "Уточняется при заказе",
      },
    ],
  },

  // === БАЛЯСИНА PW-BL-039 ===
  {
    id: "pw-bl-039",
    name: "Балясина витая PW-BL-039",
    category: "balusters",

    // Тип балясины
    balusterStyles: ["twisted"],

    description:
      "Витая балясина PW-BL-039 из массива дерева для лестниц и ограждений. Стандартный размер 60×60×900 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    // Фотографии товара
    images: [
      "/images/products/balyasiny/PW-BL-039/PW-BL-039_gallery_1.jpg",
      "/images/products/balyasiny/PW-BL-039/PW-BL-039_gallery_2.jpg",
      "/images/products/balyasiny/PW-BL-039/PW-BL-039_gallery_3.jpg",
      "/images/products/balyasiny/PW-BL-039/PW-BL-039_gallery_4.jpg",
    ],

    // Адрес карточки товара
    slug: "balyasina-pw-bl-039",

    variants: [
      {
        id: "pw-bl-039-beech-60x60x900",
        woodType: "beech",
        size: "60×60×900 мм",
        price: null,
        sku: "PW-BL-039-BEE-60X60X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-039-ash-60x60x900",
        woodType: "ash",
        size: "60×60×900 мм",
        price: null,
        sku: "PW-BL-039-ASH-60X60X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-039-oak-60x60x900",
        woodType: "oak",
        size: "60×60×900 мм",
        price: null,
        sku: "PW-BL-039-OAK-60X60X900",
        leadTime: "Уточняется при заказе",
      },
    ],
  },

  // === БАЛЯСИНА PW-BL-040 ===
  {
    id: "pw-bl-040",
    name: "Балясина витая каннелированная PW-BL-040",
    category: "balusters",

    // Тип балясины
    balusterStyles: ["twisted", "fluted"],

    description:
      "Витая каннелированная балясина PW-BL-040 из массива дерева для лестниц и ограждений. Стандартный размер 60×60×900 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    // Фотографии товара
    images: [
      "/images/products/balyasiny/PW-BL-040/PW-BL-040_gallery_1.jpg",
      "/images/products/balyasiny/PW-BL-040/PW-BL-040_gallery_2.jpg",
      "/images/products/balyasiny/PW-BL-040/PW-BL-040_gallery_3.jpg",
      "/images/products/balyasiny/PW-BL-040/PW-BL-040_gallery_4.jpg",
    ],

    // Адрес карточки товара
    slug: "balyasina-pw-bl-040",

    variants: [
      {
        id: "pw-bl-040-beech-60x60x900",
        woodType: "beech",
        size: "60×60×900 мм",
        price: null,
        sku: "PW-BL-040-BEE-60X60X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-040-ash-60x60x900",
        woodType: "ash",
        size: "60×60×900 мм",
        price: null,
        sku: "PW-BL-040-ASH-60X60X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-040-oak-60x60x900",
        woodType: "oak",
        size: "60×60×900 мм",
        price: null,
        sku: "PW-BL-040-OAK-60X60X900",
        leadTime: "Уточняется при заказе",
      },
    ],
  },

  // === БАЛЯСИНА PW-BL-041 ===
  {
    id: "pw-bl-041",
    name: "Балясина витая PW-BL-041",
    category: "balusters",

    // Тип балясины
    balusterStyles: ["twisted"],

    description:
      "Витая балясина PW-BL-041 из массива дерева для лестниц и ограждений. Стандартный размер 60×60×900 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    // Фотографии товара
    images: [
      "/images/products/balyasiny/PW-BL-041/PW-BL-041_gallery_1.jpg",
      "/images/products/balyasiny/PW-BL-041/PW-BL-041_gallery_2.jpg",
      "/images/products/balyasiny/PW-BL-041/PW-BL-041_gallery_3.jpg",
      "/images/products/balyasiny/PW-BL-041/PW-BL-041_gallery_4.jpg",
    ],

    // Адрес карточки товара
    slug: "balyasina-pw-bl-041",

    variants: [
      {
        id: "pw-bl-041-beech-60x60x900",
        woodType: "beech",
        size: "60×60×900 мм",
        price: null,
        sku: "PW-BL-041-BEE-60X60X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-041-ash-60x60x900",
        woodType: "ash",
        size: "60×60×900 мм",
        price: null,
        sku: "PW-BL-041-ASH-60X60X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-041-oak-60x60x900",
        woodType: "oak",
        size: "60×60×900 мм",
        price: null,
        sku: "PW-BL-041-OAK-60X60X900",
        leadTime: "Уточняется при заказе",
      },
    ],
  },

  // === БАЛЯСИНА PW-BL-042 ===
  {
    id: "pw-bl-042",
    name: "Балясина витая PW-BL-042",
    category: "balusters",

    // Тип балясины
    balusterStyles: ["twisted"],

    description:
      "Витая балясина PW-BL-042 из массива дерева для лестниц и ограждений. Стандартный размер 60×60×900 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    // Фотографии товара
    images: [
      "/images/products/balyasiny/PW-BL-042/PW-BL-042_gallery_1.jpg",
      "/images/products/balyasiny/PW-BL-042/PW-BL-042_gallery_2.jpg",
      "/images/products/balyasiny/PW-BL-042/PW-BL-042_gallery_3.jpg",
      "/images/products/balyasiny/PW-BL-042/PW-BL-042_gallery_4.jpg",
    ],

    // Адрес карточки товара
    slug: "balyasina-pw-bl-042",

    variants: [
      {
        id: "pw-bl-042-beech-60x60x900",
        woodType: "beech",
        size: "Ø60×900 мм",
        price: null,
        sku: "PW-BL-042-BEE-60X60X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-042-ash-60x60x900",
        woodType: "ash",
        size: "Ø60×900 мм",
        price: null,
        sku: "PW-BL-042-ASH-60X60X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-042-oak-60x60x900",
        woodType: "oak",
        size: "Ø60×900 мм",
        price: null,
        sku: "PW-BL-042-OAK-60X60X900",
        leadTime: "Уточняется при заказе",
      },
    ],
  },

  // === БАЛЯСИНА PW-BL-043 ===
  {
    id: "pw-bl-043",
    name: "Балясина витая PW-BL-043",
    category: "balusters",

    // Тип балясины
    balusterStyles: ["twisted"],

    description:
      "Витая балясина PW-BL-043 из массива дерева для лестниц и ограждений. Стандартный размер Ø60×900 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    // Фотографии товара
    images: [
      "/images/products/balyasiny/PW-BL-043/PW-BL-043_gallery_1.jpg",
      "/images/products/balyasiny/PW-BL-043/PW-BL-043_gallery_2.jpg",
      "/images/products/balyasiny/PW-BL-043/PW-BL-043_gallery_3.jpg",
      "/images/products/balyasiny/PW-BL-043/PW-BL-043_gallery_4.jpg",
    ],

    // Адрес карточки товара
    slug: "balyasina-pw-bl-043",

    variants: [
      {
        id: "pw-bl-043-beech-d60x900",
        woodType: "beech",
        size: "Ø60×900 мм",
        price: null,
        sku: "PW-BL-043-BEE-D60X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-043-ash-d60x900",
        woodType: "ash",
        size: "Ø60×900 мм",
        price: null,
        sku: "PW-BL-043-ASH-D60X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-043-oak-d60x900",
        woodType: "oak",
        size: "Ø60×900 мм",
        price: null,
        sku: "PW-BL-043-OAK-D60X900",
        leadTime: "Уточняется при заказе",
      },
    ],
  },

  // === БАЛЯСИНА PW-BL-044 ===
  {
    id: "pw-bl-044",
    name: "Балясина каннелированная резная PW-BL-044",
    category: "balusters",

    // Типы балясины
    balusterStyles: ["fluted", "carved", "classic"],

    description:
      "Каннелированная резная балясина PW-BL-044 из массива дерева для лестниц и ограждений. Стандартный размер 50×50×900 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    // Фотографии товара
    images: [
      "/images/products/balyasiny/PW-BL-044/PW-BL-044_gallery_1.jpg",
      "/images/products/balyasiny/PW-BL-044/PW-BL-044_gallery_2.jpg",
      "/images/products/balyasiny/PW-BL-044/PW-BL-044_gallery_3.jpg",
      "/images/products/balyasiny/PW-BL-044/PW-BL-044_gallery_4.jpg",
    ],

    // Адрес карточки товара
    slug: "balyasina-pw-bl-044",

    variants: [
      {
        id: "pw-bl-044-beech-50x50x900",
        woodType: "beech",
        size: "50×50×900 мм",
        price: null,
        sku: "PW-BL-044-BEE-50X50X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-044-ash-50x50x900",
        woodType: "ash",
        size: "50×50×900 мм",
        price: null,
        sku: "PW-BL-044-ASH-50X50X900",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-bl-044-oak-50x50x900",
        woodType: "oak",
        size: "50×50×900 мм",
        price: null,
        sku: "PW-BL-044-OAK-50X50X900",
        leadTime: "Уточняется при заказе",
      },
    ],
  },

  /*=================================== СТОЛБЫ ===========================================*/

  // === СТОЛБ PW-ST-001 ===
  {
    id: "pw-st-001",
    name: "Столб резной PW-ST-001",
    category: "posts",

    // Типы столба
    postStyles: ["carved", "classic"],

    description:
      "Резной столб PW-ST-001 из массива дерева для лестниц и ограждений. Стандартный размер 100×100×1100 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    // Фотографии товара
    images: [
      "/images/products/stolby/PW-ST-001/PW-ST-001_gallery_1.jpg",
      "/images/products/stolby/PW-ST-001/PW-ST-001_gallery_2.jpg",
      "/images/products/stolby/PW-ST-001/PW-ST-001_gallery_3.jpg",
      "/images/products/stolby/PW-ST-001/PW-ST-001_gallery_4.jpg",
    ],

    // Адрес карточки товара
    slug: "stolb-pw-st-001",

    variants: [
      {
        id: "pw-st-001-beech-100x100x1100",
        woodType: "beech",
        size: "100×100×1100 мм",
        price: null,
        sku: "PW-ST-001-BEE-100X100X1100",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-st-001-ash-100x100x1100",
        woodType: "ash",
        size: "100×100×1100 мм",
        price: null,
        sku: "PW-ST-001-ASH-100X100X1100",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-st-001-oak-100x100x1100",
        woodType: "oak",
        size: "100×100×1100 мм",
        price: null,
        sku: "PW-ST-001-OAK-100X100X1100",
        leadTime: "Уточняется при заказе",
      },
    ],
  },

  // === СТОЛБ PW-ST-005 ===
  {
    id: "pw-st-005",
    name: "Столб витой PW-ST-005",
    category: "posts",

    // Типы столба
    postStyles: ["twisted", "classic"],

    description:
      "Витой столб PW-ST-005 из массива дерева для лестниц и ограждений. Стандартный размер 100×100×1100 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    // Фотографии товара
    images: [
      "/images/products/stolby/PW-ST-005/PW-ST-005_gallery_1.jpg",
      "/images/products/stolby/PW-ST-005/PW-ST-005_gallery_2.jpg",
      "/images/products/stolby/PW-ST-005/PW-ST-005_gallery_3.jpg",
      "/images/products/stolby/PW-ST-005/PW-ST-005_gallery_4.jpg",
    ],

    // Адрес карточки товара
    slug: "stolb-pw-st-005",

    variants: [
      {
        id: "pw-st-005-beech-100x100x1100",
        woodType: "beech",
        size: "100×100×1100 мм",
        price: null,
        sku: "PW-ST-005-BEE-100X100X1100",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-st-005-ash-100x100x1100",
        woodType: "ash",
        size: "100×100×1100 мм",
        price: null,
        sku: "PW-ST-005-ASH-100X100X1100",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-st-005-oak-100x100x1100",
        woodType: "oak",
        size: "100×100×1100 мм",
        price: null,
        sku: "PW-ST-005-OAK-100X100X1100",
        leadTime: "Уточняется при заказе",
      },
    ],
  },

  // === СТОЛБ PW-ST-006 ===
  {
    id: "pw-st-006",
    name: "Столб витой резной PW-ST-006",
    category: "posts",

    // Типы столба
    postStyles: ["twisted", "carved", "classic"],

    description:
      "Витой резной столб PW-ST-006 из массива дерева для лестниц и ограждений. Стандартный размер 100×100×1100 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    // Фотографии товара
    images: [
      "/images/products/stolby/PW-ST-006/PW-ST-006_gallery_1.jpg",
      "/images/products/stolby/PW-ST-006/PW-ST-006_gallery_2.jpg",
      "/images/products/stolby/PW-ST-006/PW-ST-006_gallery_3.jpg",
      "/images/products/stolby/PW-ST-006/PW-ST-006_gallery_4.jpg",
    ],

    // Адрес карточки товара
    slug: "stolb-pw-st-006",

    variants: [
      {
        id: "pw-st-006-beech-100x100x1100",
        woodType: "beech",
        size: "100×100×1100 мм",
        price: null,
        sku: "PW-ST-006-BEE-100X100X1100",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-st-006-ash-100x100x1100",
        woodType: "ash",
        size: "100×100×1100 мм",
        price: null,
        sku: "PW-ST-006-ASH-100X100X1100",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-st-006-oak-100x100x1100",
        woodType: "oak",
        size: "100×100×1100 мм",
        price: null,
        sku: "PW-ST-006-OAK-100X100X1100",
        leadTime: "Уточняется при заказе",
      },
    ],
  },

  // === СТОЛБ PW-ST-007 ===
  {
    id: "pw-st-007",
    name: "Столб резной PW-ST-007",
    category: "posts",

    // Типы столба
    postStyles: ["carved", "classic"],

    description:
      "Резной столб PW-ST-007 из массива дерева для лестниц и ограждений. Центральная часть украшена геометрическим рельефным узором. Стандартный размер 100×100×1100 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    // Фотографии товара
    images: [
      "/images/products/stolby/PW-ST-007/PW-ST-007_gallery_1.jpg",
      "/images/products/stolby/PW-ST-007/PW-ST-007_gallery_2.jpg",
      "/images/products/stolby/PW-ST-007/PW-ST-007_gallery_3.jpg",
      "/images/products/stolby/PW-ST-007/PW-ST-007_gallery_4.jpg",
    ],

    // Адрес карточки товара
    slug: "stolb-pw-st-007",

    variants: [
      {
        id: "pw-st-007-beech-100x100x1100",
        woodType: "beech",
        size: "100×100×1100 мм",
        price: null,
        sku: "PW-ST-007-BEE-100X100X1100",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-st-007-ash-100x100x1100",
        woodType: "ash",
        size: "100×100×1100 мм",
        price: null,
        sku: "PW-ST-007-ASH-100X100X1100",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-st-007-oak-100x100x1100",
        woodType: "oak",
        size: "100×100×1100 мм",
        price: null,
        sku: "PW-ST-007-OAK-100X100X1100",
        leadTime: "Уточняется при заказе",
      },
    ],
  },

  // === СТОЛБ PW-ST-008 ===
  {
    id: "pw-st-008",
    name: "Столб каннелированный PW-ST-008",
    category: "posts",

    // Типы столба
    postStyles: ["fluted", "classic"],

    description:
      "Каннелированный столб PW-ST-008 из массива дерева для лестниц и ограждений. Стандартный размер Ø100×1100 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    // Фотографии товара
    images: [
      "/images/products/stolby/PW-ST-008/PW-ST-008_gallery_1.jpg",
      "/images/products/stolby/PW-ST-008/PW-ST-008_gallery_2.jpg",
      "/images/products/stolby/PW-ST-008/PW-ST-008_gallery_3.jpg",
      "/images/products/stolby/PW-ST-008/PW-ST-008_gallery_4.jpg",
    ],

    // Адрес карточки товара
    slug: "stolb-pw-st-008",

    variants: [
      {
        id: "pw-st-008-beech-d100x1100",
        woodType: "beech",
        size: "Ø100×1100 мм",
        price: null,
        sku: "PW-ST-008-BEE-D100X1100",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-st-008-ash-d100x1100",
        woodType: "ash",
        size: "Ø100×1100 мм",
        price: null,
        sku: "PW-ST-008-ASH-D100X1100",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-st-008-oak-d100x1100",
        woodType: "oak",
        size: "Ø100×1100 мм",
        price: null,
        sku: "PW-ST-008-OAK-D100X1100",
        leadTime: "Уточняется при заказе",
      },
    ],
  },

  // === СТОЛБ PW-ST-013 ===
  {
    id: "pw-st-013",
    name: "Столб каннелированный PW-ST-013",
    category: "posts",

    // Типы столба
    postStyles: ["fluted", "classic"],

    description:
      "Каннелированный столб PW-ST-013 из массива дерева для лестниц и ограждений. Стандартный размер 100×100×1100 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    // Фотографии товара
    images: [
      "/images/products/stolby/PW-ST-013/PW-ST-013_gallery_1.jpg",
      "/images/products/stolby/PW-ST-013/PW-ST-013_gallery_2.jpg",
      "/images/products/stolby/PW-ST-013/PW-ST-013_gallery_3.jpg",
      "/images/products/stolby/PW-ST-013/PW-ST-013_gallery_4.jpg",
    ],

    // Адрес карточки товара
    slug: "stolb-pw-st-013",

    variants: [
      {
        id: "pw-st-013-beech-100x100x1100",
        woodType: "beech",
        size: "100×100×1100 мм",
        price: null,
        sku: "PW-ST-013-BEE-100X100X1100",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-st-013-ash-100x100x1100",
        woodType: "ash",
        size: "100×100×1100 мм",
        price: null,
        sku: "PW-ST-013-ASH-100X100X1100",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-st-013-oak-100x100x1100",
        woodType: "oak",
        size: "100×100×1100 мм",
        price: null,
        sku: "PW-ST-013-OAK-100X100X1100",
        leadTime: "Уточняется при заказе",
      },
    ],
  },

  // === СТОЛБ PW-ST-014 ===
  {
    id: "pw-st-014",
    name: "Столб фигурный PW-ST-014",
    category: "posts",

    // Типы столба
    postStyles: ["classic"],

    description:
      "Фигурный столб PW-ST-014 из массива дерева для лестниц и ограждений. Стандартный размер 120×120×1100 мм. Изготовление из бука, ясеня и дуба. Другие размеры — под заказ.",

    material: "Массив дерева",

    // Фотографии товара
    images: [
      "/images/products/stolby/PW-ST-014/PW-ST-014_gallery_1.jpg",
      "/images/products/stolby/PW-ST-014/PW-ST-014_gallery_2.jpg",
      "/images/products/stolby/PW-ST-014/PW-ST-014_gallery_3.jpg",
      "/images/products/stolby/PW-ST-014/PW-ST-014_gallery_4.jpg",
    ],

    // Адрес карточки товара
    slug: "stolb-pw-st-014",

    variants: [
      {
        id: "pw-st-014-beech-120x120x1100",
        woodType: "beech",
        size: "120×120×1100 мм",
        price: null,
        sku: "PW-ST-014-BEE-120X120X1100",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-st-014-ash-120x120x1100",
        woodType: "ash",
        size: "120×120×1100 мм",
        price: null,
        sku: "PW-ST-014-ASH-120X120X1100",
        leadTime: "Уточняется при заказе",
      },
      {
        id: "pw-st-014-oak-120x120x1100",
        woodType: "oak",
        size: "120×120×1100 мм",
        price: null,
        sku: "PW-ST-014-OAK-120X120X1100",
        leadTime: "Уточняется при заказе",
      },
    ],
  },
];
