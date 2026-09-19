import type { MetadataRoute } from "next";

import { mockProducts } from "@/entities/product/model/mock-data";
import { getSiteUrl } from "@/lib/site";

// Карта сайта для поисковых систем
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  // Пока настоящий домен не указан,
  // не создаём ссылки с localhost
  if (!siteUrl) {
    return [];
  }

  // Основные страницы сайта
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: new URL("/", siteUrl).toString(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: new URL("/catalog", siteUrl).toString(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: new URL("/catalog/mebelnye-nozhki", siteUrl).toString(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: new URL("/catalog/balyasiny", siteUrl).toString(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: new URL("/catalog/stolby-dlya-lestnits", siteUrl).toString(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: new URL("/custom-order", siteUrl).toString(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: new URL("/delivery", siteUrl).toString(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: new URL("/payment", siteUrl).toString(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: new URL("/contacts", siteUrl).toString(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: new URL("/privacy", siteUrl).toString(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: new URL("/consent", siteUrl).toString(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  // Все карточки товаров создаём автоматически из mockProducts
  const productPages: MetadataRoute.Sitemap = mockProducts.map((product) => ({
    url: new URL(`/catalog/${product.slug}`, siteUrl).toString(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}
