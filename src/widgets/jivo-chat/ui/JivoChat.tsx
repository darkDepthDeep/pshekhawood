"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { MessageCircle } from "lucide-react";

declare global {
  interface Window {
    jivo_api?: {
      open: (params?: { start?: "chat" | "call" | "menu" }) => {
        result: "ok" | "fail";
        reason?: string;
      };
      showProactiveInvitation: (message: string) => void;
      chatMode: () => "online" | "offline";
      sendPageTitle?: (title: string, fromApi?: boolean, url?: string) => void;
      setCustomData?: (
        fields: {
          title?: string;
          key?: string;
          content: string;
          link?: string;
        }[],
      ) => void;
    };
    jivo_onLoadCallback?: () => void;
    jivo_onOpen?: () => void;
    jivo_onClose?: () => void;
  }
}

function sendCurrentPageToJivo() {
  const jivo = window.jivo_api;

  if (!jivo) return;

  const title = document.title;
  const url = window.location.href;

  jivo.sendPageTitle?.(title, true, url);

  jivo.setCustomData?.([
    {
      title: "Страница клиента",
      content: title,
    },
    {
      key: "URL",
      content: url,
      link: url,
    },
  ]);
}

export function JivoChat() {
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Ждём полной загрузки Jivo
  useEffect(() => {
    const handleJivoLoad = () => {
      setIsReady(true);
    };

    const handleJivoOpen = () => {
      document.body.classList.add("jivo-chat-open");
      setIsChatOpen(true);
    };

    const handleJivoClose = () => {
      document.body.classList.remove("jivo-chat-open");
      setIsChatOpen(false);
    };

    window.jivo_onLoadCallback = handleJivoLoad;
    window.jivo_onOpen = handleJivoOpen;
    window.jivo_onClose = handleJivoClose;

    return () => {
      delete window.jivo_onLoadCallback;
      delete window.jivo_onOpen;
      delete window.jivo_onClose;

      document.body.classList.remove("jivo-chat-open");
    };
  }, []);

  // Передаём Jivo текущую страницу
  useEffect(() => {
    if (!isReady) return;

    const timer = window.setTimeout(() => {
      sendCurrentPageToJivo();
    }, 200);

    return () => window.clearTimeout(timer);
  }, [pathname, isReady]);

  // Одно приглашение за визит
  useEffect(() => {
    if (!isReady) return;

    if (sessionStorage.getItem("jivo-invite-shown") === "true") {
      return;
    }

    const isProductPage = pathname.startsWith("/catalog/");

    const delay = isProductPage ? 7_000 : 10_000;

    const message = isProductPage
      ? "Нужна помощь с выбором размера или породы дерева для этого изделия?"
      : "Здравствуйте! Нужна помощь с выбором размера, породы дерева или расчётом заказа? 👋";

    const timer = window.setTimeout(() => {
      const jivo = window.jivo_api;

      if (!jivo) return;

      if (jivo.chatMode() !== "online") return;

      // Передаём текущую страницу
      sendCurrentPageToJivo();

      jivo.showProactiveInvitation(message);
      setIsChatOpen(true);

      sessionStorage.setItem("jivo-invite-shown", "true");
    }, delay);

    return () => window.clearTimeout(timer);
  }, [pathname, isReady]);

  // Открываем чат своей кнопкой
  const handleOpenChat = () => {
    const jivo = window.jivo_api;

    if (!jivo) return;

    sendCurrentPageToJivo();

    const result = jivo.open({
      start: "chat",
    });

    if (result.result === "ok") {
      setIsChatOpen(true);
      return;
    }

    console.warn("Jivo не смог открыть чат:", result.reason);
  };

  return (
    <>
      <Script
        src="https://code.jivo.ru/widget/Ts0EjgpkC6"
        strategy="afterInteractive"
        onReady={() => {
          if (window.jivo_api) {
            setIsReady(true);
          }
        }}
      />

      {/* Своя кнопка Jivo */}
      {isReady && !isChatOpen && (
        <button
          type="button"
          onClick={handleOpenChat}
          aria-label="Открыть онлайн-чат"
          className="
            fixed
            bottom-4
            left-4
            z-50
            flex
            size-12
            items-center
            justify-center
            rounded-full
            bg-primary
            text-primary-foreground
            shadow-lg
            transition-transform
            hover:scale-105
            active:scale-95
            sm:bottom-6
            sm:left-6
            sm:size-14
          "
        >
          <MessageCircle className="size-5 sm:size-6" aria-hidden="true" />
        </button>
      )}
    </>
  );
}
