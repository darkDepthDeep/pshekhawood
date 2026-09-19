import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Оплата",
  description:
    "Условия оплаты заказов PshekhaWood: расчёт стоимости, предоплата 70% и окончательный расчёт 30% после готовности изделий.",
};

export default function PaymentPage() {
  return (
    <main>
      {/* Заголовок */}
      <section className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            PshekhaWood
          </p>

          <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Оплата
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Стоимость заказа и условия оплаты согласовываются до начала
            изготовления. Вы заранее будете знать итоговую стоимость изделия.
          </p>
        </div>
      </section>

      {/* Основная информация */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
          {/* Карточки */}
          <div className="grid gap-4 md:grid-cols-3">
            {/* Расчёт */}
            <div className="rounded-2xl border bg-card p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                01
              </p>

              <h2 className="mt-3 text-xl font-bold">Расчёт стоимости</h2>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Перед изготовлением согласовываем изделие, породу дерева,
                размеры, количество и другие параметры, влияющие на стоимость.
              </p>
            </div>

            {/* Предоплата */}
            <div className="rounded-2xl border bg-card p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                02
              </p>

              <h2 className="mt-3 text-xl font-bold">Предоплата</h2>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Для запуска заказа в производство вносится предоплата 70% от
                согласованной стоимости заказа.
              </p>
            </div>

            {/* Остаток */}
            <div className="rounded-2xl border bg-card p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                03
              </p>

              <h2 className="mt-3 text-xl font-bold">Окончательный расчёт</h2>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Оставшиеся 30% оплачиваются после готовности изделий, перед
                передачей заказа на отправку или выдачу.
              </p>
            </div>
          </div>

          {/* Как проходит оплата */}
          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <h2 className="text-2xl font-bold">Как проходит оплата</h2>

              <ol className="mt-6 space-y-5">
                {/* 1 */}
                <li className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-primary">
                    1
                  </span>

                  <div>
                    <p className="font-semibold">Получаем вашу заявку</p>

                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Вы сообщаете, какое изделие нужно изготовить, размеры,
                      количество и другие пожелания.
                    </p>
                  </div>
                </li>

                {/* 2 */}
                <li className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-primary">
                    2
                  </span>

                  <div>
                    <p className="font-semibold">Рассчитываем стоимость</p>

                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      После уточнения параметров сообщаем стоимость изготовления
                      и условия оплаты.
                    </p>
                  </div>
                </li>

                {/* 3 */}
                <li className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-primary">
                    3
                  </span>

                  <div>
                    <p className="font-semibold">Согласовываем условия</p>

                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      До начала изготовления согласовываем стоимость заказа,
                      предоплату 70%, сроки изготовления и условия доставки.
                    </p>
                  </div>
                </li>

                {/* 4 */}
                <li className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-primary">
                    4
                  </span>

                  <div>
                    <p className="font-semibold">Начинаем изготовление</p>

                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      После поступления предоплаты 70% заказ передаётся в
                      производство. Оставшиеся 30% оплачиваются после готовности
                      изделий.
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            {/* CTA */}
            <div className="h-fit rounded-3xl border bg-secondary/40 p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Расчёт заказа
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                Хотите узнать стоимость?
              </h2>

              <p className="mt-4 leading-7 text-muted-foreground">
                Отправьте размеры, количество и при необходимости фото или
                чертёж. После уточнения деталей мы сможем рассчитать стоимость
                изготовления.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
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
                  href="/contacts"
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
                    transition
                    hover:bg-secondary
                  "
                >
                  Контакты
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
