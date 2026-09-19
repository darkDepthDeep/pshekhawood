// Адрес сайта из переменных окружения.
// Настоящий домен добавим перед публикацией сайта.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

// Возвращаем основной адрес сайта.
// Пока домен не указан, возвращаем undefined.
export function getSiteUrl() {
  return siteUrl;
}

// Создаём абсолютный canonical URL.
// Пока домен не указан, canonical не выводим.
export function getCanonicalUrl(path: string) {
  if (!siteUrl) return undefined;

  return new URL(path, siteUrl).toString();
}
