const advantages = [
  {
    title: "Натуральный массив дерева",
    description:
      "Изготавливаем мебельные и лестничные элементы из натуральной древесины с выразительной текстурой материала.",
  },
  {
    title: "Изготовление под размер",
    description:
      "Работаем со стандартными размерами и изготавливаем изделия по индивидуальным параметрам заказчика.",
  },
  {
    title: "Точная обработка",
    description:
      "Тщательно обрабатываем каждое изделие, уделяя внимание геометрии, форме, поверхности и деталям.",
  },
  {
    title: "Доставка по России",
    description:
      "Надёжно упаковываем готовые изделия и отправляем заказы в регионы России.",
  },
] as const;

export function Advantages() {
  return (
    <section aria-labelledby="advantages-title" className="border-b">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:py-20">
        {/* Заголовок секции */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Наши преимущества
          </p>

          <h2
            id="advantages-title"
            className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            Делаем качественные изделия из дерева
          </h2>

          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            Сочетаем натуральные материалы, точную обработку и индивидуальный
            подход к каждому заказу.
          </p>
        </div>

        {/* Преимущества */}
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((advantage, index) => {
            return (
              <li
                key={advantage.title}
                className="rounded-2xl border bg-card p-6 shadow-sm"
              >
                {/* Номер преимущества */}
                <span
                  className="text-sm font-bold text-primary"
                  aria-hidden="true"
                >
                  0{index + 1}
                </span>

                <h3 className="mt-5 text-lg font-bold tracking-tight">
                  {advantage.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {advantage.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
