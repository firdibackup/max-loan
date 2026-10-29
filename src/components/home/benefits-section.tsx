import Image from "next/image";
import * as motion from "motion/react-client";
import { item, rise, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { eyebrow, wrap } from "./styles";

const benefitCards = [
  {
    number: "01",
    title: "Lebih tenang menjalani KPR",
    body: "Kamu nggak harus menebak-nebak posisi pinjamanmu. Pahami perjalanan KPR yang sedang kamu jalani, tanpa harus mengurai istilah finansial yang rumit.",
    image: "/feature section/Modern Mortgage Dashboard with Floating Home.webp",
    imageAlt: "Ilustrasi rumah dan dashboard ringkasan KPR yang menampilkan sisa pokok pinjaman, cicilan bulanan, dan sisa tenor",
    tone: "bg-[#eef2ff]",
    layout: "wide",
  },
  {
    number: "02",
    title: "Punya waktu untuk bersiap",
    body: "Perubahan bunga bisa memengaruhi keuangan bulananmu. Kenali hal penting lebih awal agar kamu punya waktu untuk menyusun rencana.",
    image: "/feature section/Mortgage Rate Alert Notification.webp",
    imageAlt: "Ilustrasi kalender dan lonceng pengingat masa bunga tetap berakhir lima bulan lagi, disertai estimasi cicilan baru",
    tone: "bg-[#000e35] text-white",
    layout: "narrow",
  },
  {
    number: "03",
    title: "Lebih yakin sebelum memilih",
    body: "Saat mempertimbangkan pilihan lain, pahami konsekuensi finansialnya terlebih dahulu agar keputusanmu nggak hanya berdasarkan angka cicilan.",
    image: "/feature section/Perbandingan KPR dan Opsi Takeover.webp",
    imageAlt: "Ilustrasi kalkulator dan perbandingan bunga, cicilan bulanan, serta sisa tenor KPR saat ini dengan opsi takeover",
    tone: "bg-[#fbf8ef]",
    layout: "wide",
  },
] as const;

export function BenefitsSection() {
  return (
    <section id="fitur" className="bg-white">
      <div
        className={cn(
          wrap,
          "flex flex-col gap-8 pb-16 sm:gap-10 sm:pb-20 lg:pb-[100px]",
        )}
      >
        <motion.div
          {...rise()}
          className="flex max-w-[840px] flex-col items-start gap-5"
        >
          <p className={cn(eyebrow, "tracking-[0.15em] text-pine")}>
            KENALI MANFAATNYA
          </p>
          <h2 className="font-display text-display font-medium tracking-[-0.018em]">
            Lebih paham KPR, lebih siap melangkah.
          </h2>
          <p className="max-w-[760px] text-lg leading-[1.55] text-slate">
            Pahami kondisi KPR kamu, bersiap menghadapi perubahan bunga,
            dan bandingkan pilihan sebelum mengambil keputusan.
          </p>
        </motion.div>

        <motion.ul
          {...stagger(0.1)}
          className="grid gap-4 sm:gap-5 lg:grid-cols-3"
        >
          {benefitCards.map((card) => (
            <motion.li
              {...item}
              key={card.number}
              className={cn(
                "benefit-card relative isolate flex flex-col gap-6 overflow-hidden rounded-[24px] p-6 sm:p-8",
                card.tone,
                card.layout === "wide"
                  ? "benefit-card-wide lg:col-span-2"
                  : "benefit-card-narrow lg:col-span-1",
                card.number === "03" && "benefit-card-comparison lg:col-span-3",
              )}
            >
              <div key="copy" className="benefit-copy relative z-10 flex max-w-[480px] flex-col items-start gap-4">
                <span
                  className={cn(
                    "rounded-full px-3.5 py-2 text-sm leading-none font-semibold tabular-nums",
                    card.number === "02"
                      ? "bg-[#8aa8ff] text-ink"
                      : "bg-white/65 text-ink",
                  )}
                >
                  {card.number}
                </span>
                <h3 className="max-w-[430px] font-display text-[clamp(1.75rem,1.45rem+1vw,2.25rem)] leading-[1.08] font-medium tracking-[-0.018em]">
                  {card.title}
                </h3>
                <p
                  className={cn(
                    "max-w-[430px] text-base leading-[1.5] sm:text-lg",
                    card.number === "02" ? "text-white/80" : "text-slate",
                  )}
                >
                  {card.body}
                </p>
              </div>
              <div
                key="art"
                className={cn(
                  "benefit-art relative mt-auto w-full shrink-0",
                  card.number === "02" && "benefit-art-full",
                )}
              >
                <Image
                  src={card.image}
                  alt={card.imageAlt}
                  fill={card.number !== "02"}
                  width={card.number === "02" ? 1024 : undefined}
                  height={card.number === "02" ? 683 : undefined}
                  sizes={
                    card.number === "03"
                      ? "100vw"
                      : card.layout === "wide"
                        ? "(min-width: 1024px) 66vw, 100vw"
                        : "(min-width: 1024px) 34vw, 100vw"
                  }
                  className="pointer-events-none object-contain object-right-bottom"
                />
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
