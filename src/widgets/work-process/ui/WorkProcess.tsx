const steps = [
  {
    number: "01",
    title: "Оставляете заявку",
    description:
      "Выбираете нужное изделие или рассказываете, что необходимо изготовить.",
  },
  {
    number: "02",
    title: "Согласовываем параметры",
    description:
      "Обсуждаем размеры, породу дерева, количество и другие параметры заказа.",
  },
  {
    number: "03",
    title: "Изготавливаем",
    description:
      "Изготавливаем изделия по согласованным параметрам, уделяя внимание форме, размерам и деталям.",
  },
  {
    number: "04",
    title: "Упаковываем и отправляем",
    description:
      "Надёжно упаковываем готовые изделия и отправляем заказ в доставку.",
  },
] as const;

export function WorkProcess() {
  return (
    <section aria-labelledby="work-process-title" className="border-b">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:py-20">
        {/* Заголовок */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Как мы работаем
          </p>

          <h2
            id="work-process-title"
            className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            От заявки до готового изделия
          </h2>

          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            Проходим каждый этап вместе с заказчиком — от обсуждения параметров
            до отправки готового изделия.
          </p>
        </div>

        {/* Этапы */}
        <ol className="mt-12 grid gap-8 md:grid-cols-4">
          {steps.map((step) => (
            <li
              key={step.number}
              className="relative md:after:absolute md:after:left-6 md:after:top-6 md:after:h-0.5 md:after:w-[calc(100%+2rem)]    md:after:bg-border md:after:content-[''] md:last:after:hidden"
            >
              {/* Номер */}
              <span
                className="relative z-10 flex size-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
                aria-hidden="true"
              >
                {step.number}
              </span>

              {/* Заголовок */}
              <h3 className="mt-5 text-lg font-bold tracking-tight">
                {step.title}
              </h3>

              {/* Описание */}
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
