import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Доставка",
  description:
    "Информация о доставке изделий PshekhaWood по России. Условия упаковки, отправки и получения заказа.",
};

export default function DeliveryPage() {
  return (
    <main>
      {/* Заголовок */}
      <section className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            PshekhaWood
          </p>

          <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Доставка
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Отправляем готовые изделия по России. Способ доставки, стоимость и
            сроки согласовываются перед отправкой заказа.
          </p>
        </div>
      </section>

      {/* Основная информация */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
          <div className="grid gap-4 md:grid-cols-3">
            {/* По России */}
            <div className="rounded-2xl border bg-card p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                01
              </p>

              <h2 className="mt-3 text-xl font-bold">Доставка по России</h2>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Отправляем мебельные ножки, балясины, столбы для лестниц и
                другие изделия в регионы России.
              </p>
            </div>

            {/* Упаковка */}
            <div className="rounded-2xl border bg-card p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                02
              </p>

              <h2 className="mt-3 text-xl font-bold">Надёжная упаковка</h2>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Перед отправкой изделия упаковываются с учётом их размера, формы
                и особенностей транспортировки.
              </p>
            </div>

            {/* Стоимость */}
            <div className="rounded-2xl border bg-card p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                03
              </p>

              <h2 className="mt-3 text-xl font-bold">Стоимость доставки</h2>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Стоимость зависит от города получения, веса, габаритов заказа и
                выбранного способа доставки.
              </p>
            </div>
          </div>

          {/* Как проходит доставка */}
          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <h2 className="text-2xl font-bold">Как проходит отправка</h2>

              <ol className="mt-6 space-y-5">
                <li className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-primary">
                    1
                  </span>

                  <div>
                    <p className="font-semibold">Согласовываем заказ</p>

                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Уточняем изделие, размеры, количество и другие параметры
                      заказа.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-primary">
                    2
                  </span>

                  <div>
                    <p className="font-semibold">Изготавливаем и упаковываем</p>

                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      После изготовления проверяем изделия и подготавливаем их к
                      транспортировке.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-primary">
                    3
                  </span>

                  <div>
                    <p className="font-semibold">Согласовываем доставку</p>

                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Сообщаем возможный способ отправки и стоимость доставки.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-primary">
                    4
                  </span>

                  <div>
                    <p className="font-semibold">Передаём заказ на отправку</p>

                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      После передачи заказа сообщаем информацию, необходимую для
                      его получения.
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            {/* CTA */}
            <div className="h-fit rounded-3xl border bg-secondary/40 p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Есть вопросы?
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                Уточните доставку до вашего города
              </h2>

              <p className="mt-4 leading-7 text-muted-foreground">
                При расчёте заказа мы сможем подобрать подходящий вариант
                доставки с учётом размеров и количества изделий.
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
