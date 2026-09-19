import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";

import "./globals.css";

import { Cart } from "@/features/cart/ui/Cart";
import { Header } from "@/widgets/header/ui/Header";
import { CartUIProvider } from "@/features/cart/model/context";
import { getSiteUrl } from "@/lib/site";
import { JivoChat } from "@/widgets/jivo-chat/ui/JivoChat";

const montserrat = Montserrat({
  subsets: ["cyrillic", "latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

// Настоящий адрес сайта.
// Пока домен не подключён, будет undefined.
const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  // После подключения настоящего домена Next.js
  // будет использовать его как базовый URL для metadata
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,

  // Название сайта и шаблон заголовков внутренних страниц
  title: {
    default: "PshekhaWood — Мебельные ножки и изделия из дерева",
    template: "%s | PshekhaWood",
  },

  // Общее описание сайта
  description:
    "Изготавливаем мебельные ножки, балясины, столбы для лестниц и другие деревянные изделия из массива. Стандартные размеры и изготовление на заказ.",

  // Название проекта
  applicationName: "PshekhaWood",

  // Общие Open Graph данные для страниц,
  // у которых нет собственных настроек
  openGraph: {
    title: "PshekhaWood — Мебельные ножки и изделия из дерева",
    description:
      "Изготавливаем мебельные ножки, балясины, столбы для лестниц и другие деревянные изделия из массива. Стандартные размеры и изготовление на заказ.",
    siteName: "PshekhaWood",
    locale: "ru_RU",
    type: "website",
  },

  // Общие данные для превью ссылок
  twitter: {
    card: "summary",
    title: "PshekhaWood — Мебельные ножки и изделия из дерева",
    description:
      "Изготавливаем мебельные ножки, балясины, столбы для лестниц и другие деревянные изделия из массива. Стандартные размеры и изготовление на заказ.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={`${montserrat.variable} ${inter.variable}`}
    >
      <body className="antialiased min-h-screen bg-background text-foreground">
        <CartUIProvider>
          {/* Шапка сайта */}
          <Header />

          {/* Содержимое страницы */}
          {children}

          {/* Общая корзина */}
          <Cart />

          {/* Jivo */}
          <JivoChat />
        </CartUIProvider>
      </body>
    </html>
  );
}
