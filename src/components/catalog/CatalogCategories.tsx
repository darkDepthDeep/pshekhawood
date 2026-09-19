import Link from "next/link";

const categories = [
  {
    href: "/catalog",
    label: "Все изделия",
  },
  {
    href: "/catalog/mebelnye-nozhki",
    label: "Мебельные ножки",
  },
  {
    href: "/catalog/balyasiny",
    label: "Балясины",
  },
  {
    href: "/catalog/stolby-dlya-lestnits",
    label: "Столбы для лестниц",
  },
];

interface CatalogCategoriesProps {
  activeHref?: string;
}

// Навигация между основными категориями каталога
export function CatalogCategories({ activeHref }: CatalogCategoriesProps) {
  return (
    <nav aria-label="Категории каталога" className="mb-8">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isActive = category.href === activeHref;

          return (
            <Link
              key={category.href}
              href={category.href}
              aria-current={isActive ? "page" : undefined}
              className={
                isActive
                  ? "rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                  : "rounded-lg border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              }
            >
              {category.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
