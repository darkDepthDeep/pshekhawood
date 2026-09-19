import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/site";
import { Hero } from "@/widgets/hero/ui/Hero";
import { Directions } from "@/widgets/directions/ui/Direction";
import { Advantages } from "@/widgets/advantages/ui/Advantages";
import { WorkProcess } from "@/widgets/work-process/ui/WorkProcess";
import { CTA } from "@/widgets/cta/ui/CTA";
import { Footer } from "@/widgets/footer/ui/Footer";

// Основной адрес главной страницы
const canonical = getCanonicalUrl("/");

// SEO главной страницы
export const metadata: Metadata = {
  title: "PshekhaWood — Мебельные ножки и изделия из дерева",

  description:
    "Изготавливаем мебельные ножки, балясины, столбы для лестниц и другие изделия из массива дерева. Стандартные размеры и изготовление на заказ.",

  // Основной адрес страницы для поисковых систем
  alternates: canonical
    ? {
        canonical,
      }
    : undefined,

  // Превью ссылки главной страницы
  openGraph: {
    title: "PshekhaWood — Мебельные ножки и изделия из дерева",
    description:
      "Изготавливаем мебельные ножки, балясины, столбы для лестниц и другие изделия из массива дерева. Стандартные размеры и изготовление на заказ.",
    siteName: "PshekhaWood",
    locale: "ru_RU",
    type: "website",

    ...(canonical
      ? {
          url: canonical,
        }
      : {}),
  },

  // Дополнительные данные для превью ссылки
  twitter: {
    card: "summary",
    title: "PshekhaWood — Мебельные ножки и изделия из дерева",
    description:
      "Изготавливаем мебельные ножки, балясины, столбы для лестниц и другие изделия из массива дерева. Стандартные размеры и изготовление на заказ.",
  },
};

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <Directions />
        <Advantages />
        <WorkProcess />
        <CTA />
      </main>

      <Footer />
    </>
  );
}
