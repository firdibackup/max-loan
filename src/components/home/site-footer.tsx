import Image from "next/image";
import { cn } from "@/lib/utils";
import { APP_URL, CALCULATOR_URL } from "@/lib/links";
import { BASE_PATH } from "@/lib/base-path";
import { wrap } from "./styles";

const footerLinks = [
  {
    title: "Produk",
    links: [
      ["Pantau KPR", APP_URL],
      ["KPR Health", APP_URL],
      ["Kalkulator KPR", CALCULATOR_URL],
      ["Take Over & Refinancing", APP_URL],
    ],
  },
  {
    title: "Edukasi",
    links: [
      ["Artikel KPR", APP_URL],
      ["Bunga Fixed dan Floating", APP_URL],
      ["Takeover KPR", APP_URL],
      ["Refinancing dan Top-up", APP_URL],
    ],
  },
  {
    title: "REMAX",
    links: [
      ["Tentang REMAX", APP_URL],
      ["Cara Kerja", APP_URL],
      ["Masuk", APP_URL],
      ["Daftar", APP_URL],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Syarat & Ketentuan", APP_URL],
      ["Kebijakan Privasi", APP_URL],
      ["Disclaimer", APP_URL],
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper">
      <div className={cn(wrap, "flex flex-col gap-10 pt-14 pb-8 lg:pt-16")}>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[300px_repeat(4,minmax(0,1fr))] lg:gap-12">
          <div className="col-span-2 flex flex-col gap-6 lg:col-span-1">
            <Image
              src={`${BASE_PATH}/max-loan-logo-white.svg`}
              alt="MAX LOAN"
              width={230}
              height={42}
            />
            <p className="text-base leading-[1.56]">
              Personal KPR Financial Assistant
            </p>
          </div>
          {footerLinks.map((col) => (
            <nav
              key={col.title}
              aria-label={col.title}
              className="flex flex-col gap-3.5"
            >
              <p className="text-sm leading-[22px] font-semibold">
                {col.title}
              </p>
              <ul className="flex flex-col gap-3.5">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm leading-[22px] text-fog transition-colors hover:text-paper"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div
          id="disclaimer"
          className="flex flex-col gap-6 border-t border-deep-line pt-7"
        >
          <p className="text-xs leading-[19px] text-fog">
            © REMAX. Seluruh hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
