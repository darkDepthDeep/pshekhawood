import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* О компании */}
          <div>
            <Link
              href="/"
              className="font-heading text-xl font-extrabold tracking-tight"
            >
              PshekhaWood
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
              Деревообработка и производство изделий из натуральной древесины.
            </p>
          </div>

          {/* Каталог */}
          <div>
            <h2 className="text-sm font-bold">Каталог</h2>

            <nav
              aria-label="Каталог"
              className="mt-4 flex flex-col items-start gap-3"
            >
              <Link
                href="/catalog?category=legs"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Мебельные ножки
              </Link>

              <Link
                href="/catalog?category=balusters"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Балясины
              </Link>

              <Link
                href="/catalog?category=posts"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Столбы для лестниц
              </Link>

              <Link
                href="/custom-order"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Изделия на заказ
              </Link>
            </nav>
          </div>

          {/* Информация */}
          <div>
            <h2 className="text-sm font-bold">Информация</h2>

            <nav
              aria-label="Информация"
              className="mt-4 flex flex-col items-start gap-3"
            >
              <Link
                href="/delivery"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Доставка
              </Link>

              <Link
                href="/payment"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Оплата
              </Link>

              <Link
                href="/contacts"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Контакты
              </Link>
            </nav>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="mt-10 border-t pt-6">
          <div className="flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} PshekhaWood</p>

            <div className="flex flex-col gap-2 sm:flex-row sm:gap-5">
              <Link
                href="/privacy"
                className="transition-colors hover:text-foreground"
              >
                Политика обработки персональных данных
              </Link>

              <Link
                href="/consent"
                className="transition-colors hover:text-foreground"
              >
                Согласие на обработку персональных данных
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
