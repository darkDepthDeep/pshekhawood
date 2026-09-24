"use client";

import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface CatalogSearchProps {
  basePath: string;
}

// Живой поиск по товарам каталога
export function CatalogSearch({ basePath }: CatalogSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Поисковый запрос из URL
  const urlQuery = searchParams.get("q")?.trim() ?? "";

  // Текст в поле поиска
  const [query, setQuery] = useState(urlQuery);

  // Последний запрос, полученный из URL
  const [syncedUrlQuery, setSyncedUrlQuery] = useState(urlQuery);

  // Синхронизируем поле, если URL изменился извне
  if (urlQuery !== syncedUrlQuery) {
    setSyncedUrlQuery(urlQuery);
    setQuery(urlQuery);
  }

  // Автоматически обновляем результаты после ввода
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const trimmedQuery = query.trim();

      // Запрос уже соответствует URL
      if (trimmedQuery === urlQuery) return;

      const params = new URLSearchParams(searchParams.toString());

      if (trimmedQuery) {
        params.set("q", trimmedQuery);
      } else {
        params.delete("q");
      }

      // При новом поиске возвращаемся на первую страницу
      params.delete("page");

      const newQuery = params.toString();

      router.replace(newQuery ? `${basePath}?${newQuery}` : basePath, {
        scroll: false,
      });
    }, 300);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [query, urlQuery, basePath, router, searchParams]);

  // Очищаем поиск
  const handleClear = () => {
    setQuery("");

    const params = new URLSearchParams(searchParams.toString());

    params.delete("q");
    params.delete("page");

    const newQuery = params.toString();

    router.replace(newQuery ? `${basePath}?${newQuery}` : basePath, {
      scroll: false,
    });
  };

  return (
    <div className="mb-6 rounded-xl border bg-card p-3 shadow-sm">
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />

        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          maxLength={100}
          autoComplete="off"
          placeholder="Поиск по названию, артикулу или размеру..."
          aria-label="Поиск по каталогу"
          className="h-11 w-full rounded-lg border bg-background pl-10 pr-10 text-sm outline-none transition placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition hover:bg-secondary hover:text-foreground"
            aria-label="Очистить поиск"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
