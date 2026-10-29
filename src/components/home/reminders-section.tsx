import * as motion from "motion/react-client";
import { rise } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { eyebrow, wrap } from "./styles";
import { TestimonialMarquee } from "./testimonial-marquee";

const testimonials = [
  {
    name: "Andi Pratama",
    context: "KPR berjalan 3 tahun",
    quote: "Jujur selama ini aku cuma tahu bayar cicilan tiap bulan, tapi nggak terlalu ngerti sisa utangku berapa. Pas lihat semuanya dirangkum, jadi lebih kebayang KPR-ku sudah sampai mana.",
  },
  {
    name: "Dina Maharani",
    context: "Mendekati akhir bunga fixed",
    quote: "Aku paling khawatir kalau bunga floating mulai berlaku. Setidaknya dengan estimasi cicilan, aku bisa mulai hitung-hitung pengeluaran dari sekarang, nggak nunggu sampai berubah dulu.",
  },
  {
    name: "Rizky Aditya",
    context: "Pemilik KPR pertama",
    quote: "Baru ngeh ternyata cicilan yang aku bayar itu ada bagian pokok dan bunganya. Biasanya cuma lihat nominal tagihan, sekarang jadi lebih ngerti uangnya ke mana.",
  },
  {
    name: "Salsa Putri",
    context: "Sedang mempertimbangkan takeover",
    quote: "Aku sempat kepikiran pindah bank karena lihat penawaran bunga yang lebih rendah. Tapi ternyata nggak bisa lihat bunga aja, biaya pindahnya juga perlu dihitung. Simulasi seperti ini bakal membantu banget.",
  },
  {
    name: "Bima Saputra",
    context: "KPR berjalan 5 tahun",
    quote: "Yang aku suka itu informasinya nggak harus dicari satu-satu. Kalau lagi pengin cek sisa pinjaman atau tenor, tinggal buka dan lihat ringkasannya.",
  },
  {
    name: "Nadia Permata",
    context: "KPR rumah pertama",
    quote: "Dulu aku agak bingung kalau keluarga nanya sisa KPR-ku berapa tahun lagi. Sekarang informasi seperti itu lebih gampang dicek. Hal kecil, tapi bikin lebih paham kondisi sendiri.",
  },
  {
    name: "Farhan Maulana",
    context: "Pengguna KPR pemula",
    quote: "Aku bukan orang yang paham finansial banget. Jadi buatku penting kalau informasi KPR bisa dijelaskan dengan cara yang nggak bikin tambah pusing.",
  },
  {
    name: "Maya Anggraini",
    context: "Sedang mengevaluasi KPR",
    quote: "Aku pengin tahu apakah takeover itu benar-benar menguntungkan atau cuma kelihatan murah di awal. Buatku, bisa membandingkan biaya dan cicilan dalam satu tempat akan memudahkan proses pertimbangannya.",
  },
  {
    name: "Ilham Ramadhan",
    context: "Pemilik rumah",
    quote: "Menurutku punya rumah itu bukan selesai waktu akad aja. Cicilannya masih panjang, jadi bagus kalau ada cara buat terus memantau dan memahami perkembangan KPR.",
  },
  {
    name: "Tania Kusuma",
    context: "KPR berjalan 4 tahun",
    quote: "Aku lebih nyaman kalau sebelum mengambil keputusan, semua angkanya sudah kelihatan. Nggak berarti langsung tahu harus pilih apa, tapi setidaknya bisa mempertimbangkan pilihan dengan lebih matang.",
  },
] as const;

export function TestimonialsSection() {
  return (
    <section id="testimoni" aria-labelledby="testimonials-heading" className="bg-ink py-16 text-paper sm:py-20 lg:py-24">
      <div className={wrap}>
        <motion.div {...rise()} className="mx-auto flex max-w-[800px] flex-col items-center gap-6 text-center">
          <p className={cn(eyebrow, "text-aqua")}>CERITA PENGGUNA</p>
          <h2 id="testimonials-heading" className="font-display text-display font-medium tracking-[-0.018em]">
            Memahami KPR seharusnya nggak sesulit itu.
          </h2>
          <p className="max-w-[680px] text-lg leading-[1.6] text-fog">
            Setiap perjalanan KPR punya tantangannya sendiri. REMAX hadir untuk membantu kamu memahami angka, mengenali perubahan, dan mempertimbangkan pilihan dengan lebih jelas.
          </p>
        </motion.div>
      </div>

      <TestimonialMarquee rows={[testimonials.slice(0, 5), testimonials.slice(5)].map((row) => (
          row.map((testimonial) => (
            <figure key={testimonial.name} className="flex w-[min(82vw,400px)] shrink-0 flex-col rounded-2xl bg-paper p-7 text-ink sm:p-8">
              <blockquote className="text-base leading-[1.75]">
                <p>“{testimonial.quote}”</p>
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 pt-7">
                <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-full bg-mint text-base font-bold text-pine">
                  {testimonial.name.charAt(0)}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold">{testimonial.name}</p>
                  <p className="mt-1 text-xs leading-5 text-slate">{testimonial.context}</p>
                </div>
              </figcaption>
            </figure>
          ))
      ))} />
    </section>
  );
}
