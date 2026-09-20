import Image from "next/image";
import Link from "next/link";

const directions = [
  {
    title: "Мебельные ножки",
    description:
      "Ножки из массива дерева для столов, стульев, тумб и другой мебели.",
    href: "/catalog/mebelnye-nozhki",
    image: "/images/nozhki.jpg",
    alt: "Мебельные ножки из массива дерева",
  },
  {
    title: "Балясины",
    description:
      "Балясины из массива дерева для лестниц, ограждений и интерьеров.",
    href: "/catalog/balyasiny",
    image: "/images/balyasin.jpg",
    alt: "Деревянные балясины для лестниц",
  },
  {
    title: "Столбы для лестниц",
    description:
      "Деревянные столбы и полустолбы стандартных и индивидуальных размеров.",
    href: "/catalog/stolby-dlya-lestnits",
    image: "/images/stolbi.jpg",
    alt: "Деревянные столбы для лестниц",
  },
  {
    title: "Навершия",
    description:
      "Навершия из массива дерева для лестничных столбов разных форм и размеров.",
    href: "/catalog/navershiya-dlya-stolbov",

    // Временно используем фото столбов, пока не добавим отдельное фото наверший
    image: "/images/navershiya-dlya-stolbov.jpg",
    alt: "Деревянные навершия для лестничных столбов",
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
            Изготавливаем изделия из массива дерева для мебели, лестниц и
            индивидуальных проектов.
          </p>
        </div>

        {/* Основные категории */}
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {directions.map((direction) => (
            <li key={direction.title}>
              <Link
                href={direction.href}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                {/* Фото */}
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={direction.image}
                    alt={direction.alt}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
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

                  <span className="mt-auto pt-6 text-sm font-semibold text-primary transition-transform group-hover:translate-x-1">
                    Смотреть каталог →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* Индивидуальное изготовление */}
        <div className="mt-6 flex flex-col items-start justify-between gap-6 rounded-2xl border bg-card p-6 shadow-sm sm:p-8 md:flex-row md:items-center">
          <div className="max-w-3xl">
            <h3 className="text-2xl font-bold tracking-tight">
              Не нашли подходящее изделие?
            </h3>

            <p className="mt-2 leading-7 text-muted-foreground">
              Изготовим деревянное изделие по вашему размеру, фотографии,
              чертежу или 3D-модели.
            </p>
          </div>

          <Link
            href="/custom-order"
            className="shrink-0 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Изготовление на заказ →
          </Link>
        </div>
      </div>
    </section>
  );
}
