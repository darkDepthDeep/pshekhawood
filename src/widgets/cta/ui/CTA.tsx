import Link from "next/link";

export function CTA() {
  return (
    <section aria-labelledby="cta-title">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:py-20">
        <div className="overflow-hidden rounded-3xl border bg-primary px-6 py-10 text-primary-foreground shadow-sm sm:px-10 sm:py-12 lg:px-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
              Изделия на заказ
            </p>

            <h2
              id="cta-title"
              className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl"
            >
              Нужны деревянные изделия по вашим размерам?
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-primary-foreground/80 sm:text-lg">
              Изготавливаем деревянные изделия по вашим размерам. Обсудим
              материал, параметры и детали заказа.
            </p>

            <div className="mt-8">
              <Link
                href="/custom-order"
                className="inline-flex items-center justify-center rounded-lg bg-background px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-all hover:bg-background/90 hover:shadow-md active:scale-[0.98]"
              >
                Оставить заявку
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
