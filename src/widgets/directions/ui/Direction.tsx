import Image from "next/image";
import Link from "next/link";

const directions = [
  {
    title: "Мебельные ножки",
    description:
      "Мебельные ножки из массива дерева для столов, тумб и другой мебели. Стандартные размеры и изготовление на заказ.",
    href: "/catalog?category=legs",
    image: "/images/nozhki.jpg",
    alt: "Мебельные ножки из массива дерева",
  },
  {
    title: "Балясины",
    description:
      "Точёные балясины из дерева для лестниц, ограждений и интерьерных конструкций.",
    href: "/catalog?category=balusters",
    image: "/images/balyasin.jpg",
    alt: "Точёные балясины из дерева для лестниц",
  },
  {
    title: "Столбы для лестниц",
    description:
      "Столбы из дерева для лестниц, перил и ограждений. Изготовление стандартных и индивидуальных размеров.",
    href: "/catalog?category=posts",
    image: "/images/stolbi.jpg",
    alt: "Деревянные столбы для лестниц",
  },
  {
    title: "Изделия на заказ",
    description:
      "Изготавливаем деревянные изделия по индивидуальным размерам, чертежам и требованиям заказчика.",
    href: "/custom-order",
    image: "/images/nazakaz.jpg",
    alt: "Деревянные изделия на заказ",
  },
] as const;

export function Directions() {
  return (
    <section aria-labelledby="directions-title" className="border-b">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:py-20">
        {/* Заголовок секции */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            PshekhaWood
          </p>

          <h2
            id="directions-title"
            className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            Наши направления
          </h2>

          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            Изготавливаем деревянные изделия для мебели, лестниц и
            индивидуальных проектов.
          </p>
        </div>

        {/* Направления */}
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {directions.map((direction) => (
            <li key={direction.title}>
              <Link
                href={direction.href}
                className="
                  group
                  flex
                  h-full
                  flex-col
                  overflow-hidden
                  rounded-2xl
                  border
                  bg-card
                  shadow-sm
                  transition-all
                  hover:-translate-y-1
                  hover:shadow-md
                "
              >
                {/* Фото */}
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={direction.image}
                    alt={direction.alt}
                    fill
                    sizes="
                      (max-width: 639px) 100vw,
                      (max-width: 1023px) 50vw,
                      25vw
                    "
                    className="
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-105
                    "
                  />
                </div>

                {/* Текст */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold tracking-tight">
                    {direction.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {direction.description}
                  </p>

                  <span
                    className="
                      mt-auto
                      pt-6
                      text-sm
                      font-semibold
                      text-primary
                      transition-transform
                      group-hover:translate-x-1
                    "
                  >
                    Перейти в раздел →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
