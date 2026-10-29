import Image from "next/image";
import * as motion from "motion/react-client";
import { ArrowUpRight } from "lucide-react";
import { ArrowLink } from "./arrow-link";
import { ease, item, rise, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { APP_URL } from "@/lib/links";
import { eyebrow, wrap } from "./styles";

const articles = [
  {
    category: "BUNGA & CICILAN",
    title: "Fixed dan floating: apa bedanya?",
    summary: "Pahami apa yang tetap dan apa yang dapat berubah.",
  },
  {
    category: "DASAR KPR",
    title: "Apa itu sisa pokok pinjaman?",
    summary: "Bedakan pokok tersisa dengan total cicilan.",
  },
  {
    category: "OPSI KPR",
    title: "Takeover, refinancing, dan top-up",
    summary: "Kenali perbedaannya sebelum menentukan langkah.",
  },
  {
    category: "BIAYA KPR",
    title: "Jangan bandingkan bunga saja",
    summary: "Periksa penalti, biaya proses, dan titik impas.",
  },
];

export function ArticlesSection() {
  return (
    <section id="artikel" className="bg-paper">
      <div
        className={cn(wrap, "flex flex-col gap-10 py-16 sm:py-20 lg:py-24")}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <motion.div {...rise()} className="flex flex-col gap-4">
            <p className={cn(eyebrow, "text-pine")}>RUANG UNTUK MEMAHAMI</p>
            <h2 className="font-display text-section font-medium">
              Lebih paham rumahmu.
              <br />
              Lebih paham KPR-mu.
            </h2>
          </motion.div>
          <ArrowLink href={APP_URL} className="sm:shrink-0">
            Lihat Semua Artikel
          </ArrowLink>
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,590fr)_minmax(0,642fr)]">
          <article className="group flex flex-col gap-5">
            <motion.a
              href={APP_URL}
              aria-label="Baca artikel: Apa itu ekuitas rumah?"
              data-reveal=""
              initial={{ clipPath: "inset(8% 8% 8% 8% round 16px)" }}
              whileInView={{ clipPath: "inset(0% 0% 0% 0% round 16px)" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.1, ease }}
              className="relative block aspect-[590/300] overflow-hidden rounded-2xl"
            >
              <Image
                src="/images/jurnal-ekuitas-rumah.webp"
                alt="Pemilik rumah tersenyum mencatat di papan klip di depan rumahnya saat senja"
                fill
                sizes="(min-width: 1024px) 590px, 100vw"
                className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
              />
            </motion.a>
            <motion.div {...rise(0.15)} className="flex flex-col gap-4">
              <p className="text-xs leading-[18px] font-semibold tracking-[0.11em] text-pine">
                PROPERTI &amp; EKUITAS
              </p>
              <h3 className="font-display text-[clamp(1.625rem,1.45rem+0.6vw,1.875rem)] leading-[1.3] font-medium">
                Apa itu ekuitas rumah?
              </h3>
              <p className="text-base leading-6 text-slate">
                Kenali selisih antara estimasi nilai rumah dan sisa
                pinjaman—serta mengapa angka ini perlu dipahami dalam
                konteks.
              </p>
              <a
                href={APP_URL}
                className="inline-flex items-center gap-1 self-start text-sm font-semibold text-pine underline-offset-4 hover:underline"
              >
                Baca Artikel
                <ArrowUpRight aria-hidden className="size-4" />
              </a>
            </motion.div>
          </article>

          <motion.ul {...stagger(0.1)} className="flex flex-col">
            {articles.map((a) => (
              <motion.li
                {...item}
                key={a.title}
                className="border-t border-line"
              >
                <a
                  href={APP_URL}
                  className="group flex flex-col gap-3 py-[22px] lg:min-h-[180px]"
                >
                  <span className="text-[11px] leading-[17px] tracking-[0.12em] text-slate">
                    {a.category}
                  </span>
                  <span className="flex items-center gap-5">
                    <span className="flex-1 font-display text-[clamp(1.375rem,1.25rem+0.5vw,1.5rem)] leading-[1.2] font-medium transition-colors group-hover:text-pine">
                      {a.title}
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="size-[22px] shrink-0 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-pine"
                    />
                  </span>
                  <span className="text-sm text-slate">{a.summary}</span>
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
