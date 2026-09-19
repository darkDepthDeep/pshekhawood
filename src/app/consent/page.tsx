import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных",
  description: "Согласие на обработку персональных данных PshekhaWood.",

  // Не индексируем юридическую страницу
  robots: {
    index: false,
    follow: false,
  },
};

export default function ConsentPage() {
  return (
    <main>
      {/* Заголовок */}
      <section className="border-b">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            PshekhaWood
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Согласие на обработку персональных данных
          </h1>

          <p className="mt-5 text-sm leading-6 text-muted-foreground">
            Редакция от 8 сентября 2026 года
          </p>
        </div>
      </section>

      {/* Содержание */}
      <section>
        <div className="mx-auto max-w-4xl space-y-10 px-4 py-12 sm:py-16">
          {/* 1 */}
          <div>
            <h2 className="text-2xl font-bold">1. Предоставление согласия</h2>

            <div className="mt-4 space-y-4 leading-7 text-muted-foreground">
              <p>
                Пользователь сайта PshekhaWood, отправляя форму заявки и
                подтверждая своё согласие, свободно, своей волей и в своём
                интересе даёт согласие на обработку предоставленных им
                персональных данных.
              </p>

              <p>
                Обработка персональных данных осуществляется оператором сайта
                PshekhaWood в соответствии с Федеральным законом от 27.07.2006 №
                152-ФЗ «О персональных данных».
              </p>
            </div>
          </div>

          {/* 2 */}
          <div>
            <h2 className="text-2xl font-bold">2. Персональные данные</h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Согласие предоставляется на обработку следующих данных:
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-muted-foreground">
              <li>имя;</li>

              <li>номер телефона;</li>

              <li>
                информация, указанная пользователем в комментарии к заявке;
              </li>

              <li>
                фотографии, эскизы, чертежи и другие файлы, добровольно
                прикреплённые пользователем;
              </li>

              <li>
                иные сведения, добровольно предоставленные пользователем при
                обращении.
              </li>
            </ul>
          </div>

          {/* 3 */}
          <div>
            <h2 className="text-2xl font-bold">3. Цели обработки</h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Персональные данные обрабатываются в целях:
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-muted-foreground">
              <li>приёма и обработки заявки;</li>

              <li>связи с пользователем для уточнения деталей заказа;</li>

              <li>определения возможности изготовления изделия;</li>

              <li>расчёта стоимости заказа;</li>

              <li>подготовки, согласования и исполнения заказа.</li>
            </ul>
          </div>

          {/* 4 */}
          <div>
            <h2 className="text-2xl font-bold">
              4. Действия с персональными данными
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              В рамках обработки персональных данных могут осуществляться сбор,
              запись, систематизация, накопление, хранение, уточнение,
              извлечение, использование, передача в случаях, необходимых для
              обработки обращения, блокирование, удаление и уничтожение
              персональных данных.
            </p>
          </div>

          {/* 5 */}
          <div>
            <h2 className="text-2xl font-bold">5. Используемые сервисы</h2>

            <div className="mt-4 space-y-4 leading-7 text-muted-foreground">
              <p>
                Для получения уведомлений о поступивших заявках могут
                использоваться сервисы электронной почты и обмена сообщениями.
              </p>

              <p>
                В связи с этим данные, необходимые для обработки заявки, могут
                передаваться используемым оператором сервисам в объёме,
                необходимом для получения и обработки обращения.
              </p>
            </div>
          </div>

          {/* 6 */}
          <div>
            <h2 className="text-2xl font-bold">6. Срок действия согласия</h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Согласие действует до достижения целей обработки персональных
              данных либо до его отзыва пользователем, если иное хранение
              персональных данных не требуется в соответствии с
              законодательством Российской Федерации.
            </p>
          </div>

          {/* 7 */}
          <div>
            <h2 className="text-2xl font-bold">7. Отзыв согласия</h2>

            <div className="mt-4 space-y-4 leading-7 text-muted-foreground">
              <p>
                Пользователь вправе отозвать согласие на обработку персональных
                данных, направив соответствующее обращение на электронную почту:
                <strong className="text-foreground">
                  {" "}
                  pshekhawood@mail.ru
                </strong>
                .
              </p>

              <p>
                После получения отзыва обработка персональных данных
                прекращается, за исключением случаев, когда дальнейшая обработка
                допускается законодательством Российской Федерации.
              </p>
            </div>
          </div>

          {/* 8 */}
          <div>
            <h2 className="text-2xl font-bold">
              8. Политика обработки персональных данных
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Дополнительная информация о порядке обработки и защиты
              персональных данных размещена в{" "}
              <Link
                href="/privacy"
                className="font-medium text-primary hover:underline"
              >
                Политике обработки персональных данных
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
