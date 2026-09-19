import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Контакты PshekhaWood. Изготовление мебельных ножек, балясин, столбов для лестниц и других изделий из дерева.",
};

// Потом заменим на твои реальные данные
const PHONE_DISPLAY = "+7 (939) 465-07-69";
const PHONE_HREF = "+79394650769";
const MAX_URL =
  "https://max.ru/u/f9LHodD0cOKM0P_defwo4RZNLRJQMx5jsbBL9MZ4AepzOVCZlUTI2-7fGaM ";

const EMAIL = "pshekhawood@mail.ru";

export default function ContactsPage() {
  return (
    <main>
      {/* Заголовок */}
      <section className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            PshekhaWood
          </p>

          <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Контакты
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Свяжитесь с нами удобным способом или оставьте заявку на
            изготовление изделия по вашим размерам.
          </p>
        </div>
      </section>

      {/* Контакты */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
          {/* Основные контакты */}
          <div>
            <h2 className="text-2xl font-bold">Связаться с нами</h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {/* Телефон */}
              <div className="rounded-2xl border bg-card p-6">
                <p className="text-sm font-medium text-muted-foreground">
                  Телефон
                </p>

                <a
                  href={`tel:${PHONE_HREF}`}
                  className="mt-2 block text-xl font-bold transition hover:text-primary"
                >
                  {PHONE_DISPLAY}
                </a>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Позвоните, если нужно быстро обсудить изделие, размеры или
                  возможность изготовления.
                </p>
              </div>

              {/* MAX */}
              <div className="rounded-2xl border bg-card p-6">
                <p className="text-sm font-medium text-muted-foreground">MAX</p>

                <a
                  href={MAX_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-xl font-bold transition hover:text-primary"
                >
                  Написать в MAX →
                </a>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Можно отправить фотографии, размеры, эскиз или задать вопрос
                  по заказу.
                </p>
              </div>

              {/* Email */}
              <div className="rounded-2xl border bg-card p-6">
                <p className="text-sm font-medium text-muted-foreground">
                  Электронная почта
                </p>

                <a
                  href={`mailto:${EMAIL}`}
                  className="mt-2 block text-lg font-bold transition hover:text-primary"
                >
                  {EMAIL}
                </a>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Подходит для отправки чертежей, технического задания и другой
                  информации по заказу.
                </p>
              </div>

              {/* Местоположение */}
              <div className="rounded-2xl border bg-card p-6">
                <p className="text-sm font-medium text-muted-foreground">
                  Производство
                </p>

                <p className="mt-2 text-lg font-bold">
                  Краснодарский край, г. Апшеронск
                </p>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Изготавливаем изделия из дерева и отправляем заказы в другие
                  регионы России.
                </p>
              </div>
            </div>
          </div>

          {/* Изготовление на заказ */}
          <div
            className="
        mt-8
        flex
        flex-col
        gap-6
        rounded-3xl
        border
        bg-secondary/40
        p-6
        sm:p-8
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
          >
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Изготовление на заказ
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                Есть размеры, фото или чертёж?
              </h2>

              <p className="mt-3 leading-7 text-muted-foreground">
                Заполните форму и прикрепите необходимые материалы. Мы получим
                заявку вместе с файлами и свяжемся с вами для уточнения деталей.
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/custom-order"
                className="
            inline-flex
            h-11
            items-center
            justify-center
            rounded-xl
            bg-primary
            px-6
            text-sm
            font-semibold
            text-primary-foreground
            transition
            hover:opacity-90
          "
              >
                Оставить заявку
              </Link>

              <Link
                href="/catalog"
                className="
            inline-flex
            h-11
            items-center
            justify-center
            rounded-xl
            border
            bg-background
            px-6
            text-sm
            font-semibold
            text-primary
            transition
            hover:bg-secondary
          "
              >
                Посмотреть каталог
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
