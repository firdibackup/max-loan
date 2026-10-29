import { APP_URL } from "@/lib/links";

export const productFeatures = [
  {
    label: "Dashboard KPR",
    title: "Kenali kondisi KPR kamu.",
    description:
      "Lihat informasi penting seperti cicilan bulanan, sisa pinjaman, sisa tenor, nilai properti, dan ekuitas dalam satu tampilan.",
    cta: { label: "Kenali KPR Saya", href: APP_URL },
  },
  {
    label: "Pengingat Perubahan Bunga",
    title: "Jangan sampai perubahan bunga mengejutkanmu.",
    description:
      "Ketahui kapan masa bunga tetap akan berakhir dan pelajari estimasi cicilan saat memasuki periode bunga berikutnya.",
    cta: { label: "Pelajari Perubahan Bunga", href: APP_URL },
  },
  {
    label: "Simulasi Takeover dan Refinancing",
    title: "Pertimbangkan pilihan sebelum memutuskan.",
    description:
      "Bandingkan skenario KPR dan pelajari dampaknya terhadap cicilan, total biaya, serta perkiraan waktu untuk mencapai titik impas.",
    cta: { label: "Pelajari Pilihan KPR", href: APP_URL },
  },
  {
    label: "Perjalanan Pokok dan Bunga",
    title: "Pahami ke mana cicilanmu dialokasikan.",
    description:
      "Lihat bagaimana pembayaran KPR terbagi antara pokok pinjaman dan bunga sepanjang tenor, agar progres pelunasan lebih mudah dipahami.",
    cta: { label: "Mulai Pahami KPR Saya", href: APP_URL },
    detail: "Dari pembayaran pertama hingga rumah sepenuhnya milikmu.",
  },
] as const;
