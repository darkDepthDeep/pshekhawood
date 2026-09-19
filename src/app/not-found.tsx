import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
      {/* Код ошибки */}
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
        Ошибка 404
      </p>

      {/* Главный заголовок */}
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
        Страница не найдена
      </h1>

      {/* Описание */}
      <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
        Возможно, страница была удалена, перемещена или адрес указан неверно.
      </p>

      {/* Действия */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 hover:shadow-md active:scale-[0.98]"
        >
          На главную
        </Link>

        <Link
          href="/catalog"
          className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-muted"
        >
          В каталог
        </Link>
      </div>
    </main>
  );
}
