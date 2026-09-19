import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="border-b">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:gap-12 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div className="max-w-2xl">
          {/* Надзаголовок */}
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Деревообработка
          </p>

          {/* Главный заголовок страницы */}
          <h1
            id="hero-title"
            className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Изготавливаем изделия из дерева
          </h1>

          {/* Описание */}
          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Мебельные ножки, элементы лестниц и другие деревянные компоненты.
            Изготовление по стандартным размерам и на заказ.
          </p>

          {/* Основное действие */}
          <div className="mt-8">
            <Link
              href="/catalog"
              className="
                inline-flex
                items-center
                justify-center
                rounded-lg
                bg-primary
                px-6
                py-3
                text-sm
                font-semibold
                text-primary-foreground
                shadow-sm
                transition-all
                hover:opacity-90
                hover:shadow-md
                active:scale-[0.98]
              "
            >
              Смотреть каталог
            </Link>
          </div>
        </div>

        {/* Визуальная часть Hero */}
        <div className="relative aspect-4/3 overflow-hidden rounded-2xl border bg-muted shadow-sm">
          {/* Временно оставляем место под изображение */}
          <Image
            src="/images/hero-products-v2.jpg"
            alt="Деревянные мебельные ножки, столбы, балясины и элементы для лестниц"
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
