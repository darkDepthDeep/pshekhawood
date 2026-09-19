// src/components/catalog/LoadingSkeleton.tsx

/**
 * Компонент-скелетон для состояния загрузки каталога.
 * Повторяет структуру ProductGrid, но использует анимацию pulse вместо контента.
 * Улучшает воспринимаемую производительность и предотвращает Layout Shift.
 */
export default function LoadingSkeleton() {
  return (
    //  aria-hidden="true": полностью скрывает скелетон от скринридеров и роботов
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      aria-hidden="true"
      role="presentation"
    >
      {/* Генерируем 8 заглушек для заполнения первого экрана */}
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="bg-card rounded-xl overflow-hidden border border-border animate-pulse"
        >
          {/* Заглушка изображения (сохраняем aspect-square как у реальных фото) */}
          <div className="aspect-square bg-muted" />

          {/* Заглушки текстовых блоков с разной шириной для реалистичности */}
          <div className="p-5 space-y-3">
            {/* Название товара */}
            <div className="h-5 bg-muted rounded w-3/4" />

            <div className="flex justify-between items-center pt-2 mt-auto">
              <div className="space-y-1">
                {/* Надпись "Цена от" */}
                <div className="h-3 bg-muted rounded w-12" />
                {/* Блок цены */}
                <div className="h-7 bg-muted rounded w-20" />
              </div>
              {/* Кнопка "Подробнее" */}
              <div className="h-9 bg-muted rounded-full w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
