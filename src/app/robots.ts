import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/site";

// Настройки для поисковых роботов
export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    // Разрешаем поисковикам обходить сайт
    rules: {
      userAgent: "*",
      allow: "/",
    },

    // После подключения настоящего домена
    // автоматически укажем поисковикам карту сайта
    ...(siteUrl
      ? {
          sitemap: new URL("/sitemap.xml", siteUrl).toString(),
        }
      : {}),
  };
}
