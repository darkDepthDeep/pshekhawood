import type { Metadata } from "next";
import Link from "next/link";

import { CustomOrderForm } from "@/features/custom-order/ui/CustomOrderForm";
import { mockProducts } from "@/entities/product/model/mock-data";

export const metadata: Metadata = {
  title: "Изделия из дерева на заказ",
  description:
    "Изготавливаем мебельные ножки, балясины, столбы и навершия для лестниц, а также другие изделия из дерева по индивидуальным размерам и требованиям заказчика.",

  // Разрешаем индексацию страницы услуги
  robots: {
    index: true,
    follow: true,
  },
};

interface CustomOrderPageProps {
  searchParams: Promise<{
    product?: string | string[];
    wood?: string | string[];
    quantity?: string | string[];
  }>;
}

export default async function CustomOrderPage({
  searchParams,
}: CustomOrderPageProps) {
  const params = await searchParams;

  // Получаем slug товара из URL
  const productSlug =
    typeof params.product === "string" ? params.product : undefined;

  // Получаем выбранную породу дерева
  const woodParam = typeof params.wood === "string" ? params.wood : undefined;

  const allowedWoods = new Set(["beech", "ash", "oak"]);

  const initialWood =
    woodParam && allowedWoods.has(woodParam)
      ? (woodParam as "beech" | "ash" | "oak")
      : undefined;

  // Получаем выбранное количество
  const quantityParam =
    typeof params.quantity === "string" ? Number(params.quantity) : NaN;

  const initialQuantity =
    Number.isInteger(quantityParam) &&
    quantityParam >= 1 &&
    quantityParam <= 9999
      ? quantityParam
      : undefined;

  // Ищем товар, с которого клиент перешёл на заявку
  const selectedProduct = productSlug
    ? mockProducts.find((product) => product.slug === productSlug)
    : undefined;
  return (
    <main>
      {/* Заголовок*/}
      <section className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            PshekhaWood
          </p>

          <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Изделия из дерева по вашим размерам
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Изготавливаем мебельные ножки, балясины, столбы, навершия и другие
            деревянные элементы по индивидуальным параметрам, чертежам и
            требованиям заказчика.
          </p>
        </div>
      </section>

      {/* Основной блок */}
      <section>
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-[0.8fr_1.2fr] lg:py-16">
          {/* Информация */}
          <div>
            <h2 className="text-2xl font-bold">Что можно заказать</h2>

            <ul className="mt-6 space-y-4 text-muted-foreground">
              <li>Мебельные ножки нестандартных размеров</li>
              <li>Балясины для лестниц и ограждений</li>
              <li>Столбы и полустолбы для лестниц</li>
              <li>Навершия для лестничных столбов</li>
              <li>Точёные и фрезерованные деревянные детали</li>
              <li>Другие изделия по образцу или чертежу</li>
            </ul>

            <div className="mt-10 rounded-2xl border bg-card p-6">
              <h2 className="text-xl font-bold">Что желательно указать</h2>

              <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                <li>Породу дерева</li>
                <li>Размеры изделия</li>
                <li>Необходимое количество</li>
                <li>Форму или особенности изделия</li>
                <li>Фото, эскиз или чертёж, если они есть</li>
              </ul>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              Не знаете точные параметры? Это не проблема — оставьте заявку, и
              мы поможем определить необходимые размеры и детали.
            </p>

            <Link
              href="/catalog"
              className="mt-6 inline-flex text-sm font-semibold text-primary hover:underline"
            >
              Посмотреть каталог →
            </Link>
          </div>

          {/* Форма */}
          <CustomOrderForm
            initialProduct={
              selectedProduct
                ? {
                    name: selectedProduct.name,
                    slug: selectedProduct.slug,
                    category: selectedProduct.category,
                  }
                : undefined
            }
            initialWood={initialWood}
            initialQuantity={initialQuantity}
          />
        </div>
      </section>
    </main>
  );
}
