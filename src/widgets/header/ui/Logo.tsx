import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" aria-label="PshekhaWood — на главную" className="shrink-0">
      <Image
        src="/images/logo.png"
        alt="PshekhaWood — деревообработка и производство изделий"
        width={160}
        height={160}
        priority
        className="h-14 w-14 object-contain"
      />
    </Link>
  );
}
