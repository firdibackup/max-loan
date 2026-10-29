import * as motion from "motion/react-client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { rise } from "@/lib/motion";

const faqs = [
  {
    q: "Apa itu REMAX?",
    a: "REMAX adalah asisten finansial KPR pribadi yang membantu kamu memahami kondisi pinjaman, memantau informasi penting, dan mengevaluasi pilihan KPR melalui simulasi.",
  },
  {
    q: "Apakah REMAX hanya untuk orang yang baru mengambil KPR?",
    a: "Tidak. REMAX ditujukan untuk membantu pengguna memahami KPR yang sedang berjalan, termasuk cicilan, sisa pinjaman, tenor, dan periode bunga.",
  },
  {
    q: "Apa yang bisa saya pantau di REMAX?",
    a: "Kamu dapat melihat informasi seperti cicilan, sisa pokok pinjaman, sisa tenor, progres pelunasan, dan informasi KPR lainnya sesuai fitur yang tersedia.",
  },
  {
    q: "Bisakah REMAX membantu saya memahami perubahan bunga?",
    a: "REMAX dirancang untuk membantu pengguna mengenali akhir periode bunga tetap dan memahami estimasi cicilan pada periode berikutnya. Hasil estimasi bergantung pada data dan asumsi perhitungan yang digunakan.",
  },
  {
    q: "Apa itu takeover dan refinancing?",
    a: "Takeover adalah pemindahan fasilitas KPR dari satu bank ke bank lain. Refinancing adalah pembiayaan kembali pinjaman yang sudah berjalan. REMAX membantu kamu mengevaluasi skenario melalui simulasi; hasilnya bukan jaminan persetujuan bank atau penawaran resmi.",
  },
  {
    q: "Apakah simulasi REMAX menjamin cicilan saya akan turun?",
    a: "Tidak. Simulasi adalah estimasi berdasarkan data dan asumsi yang digunakan. Hasil aktual dapat berbeda karena suku bunga, biaya, ketentuan bank, dan kondisi pengajuan.",
  },
  {
    q: "Apakah REMAX merupakan bank atau pemberi pinjaman?",
    a: "REMAX diposisikan sebagai asisten finansial KPR, bukan bank atau pemberi pinjaman. Setiap keputusan kredit dan persetujuan pembiayaan tetap mengikuti ketentuan lembaga keuangan terkait.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="bg-white">
      <div className="mx-auto flex max-w-[1080px] flex-col gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:py-[88px]">
        <motion.h2
          {...rise()}
          className="text-center font-display text-section font-medium"
        >
          Punya pertanyaan?
          <br />
          Mulai dari sini.
        </motion.h2>
        <motion.div {...rise(0.1)}>
          <Accordion type="single" collapsible>
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`faq-${i}`}
                className="border-b border-line"
              >
                <AccordionTrigger className="items-center gap-4 rounded-none py-5 text-base leading-5 sm:py-6 lg:py-7 font-semibold text-ink transition-colors hover:text-pine hover:no-underline **:data-[slot=accordion-trigger-icon]:size-5 **:data-[slot=accordion-trigger-icon]:text-current">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="max-w-[760px] pb-6 text-base leading-[1.6] text-slate">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
