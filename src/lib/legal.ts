// Public legal text for Maxloan. A `null` table value renders as "Menunggu data resmi":
// fill it from company records, never with a guess. Keep claims limited to what the
// application actually does (tests/legal.test.mjs rejects unproven ones).
export const LEGAL_ENTITY = "PT Signature Properties";
export const LEGAL_VERSION = "6 November 2026";
export const LEGAL_EFFECTIVE_DATE: string | null = null;

export type LegalBlock =
  | string
  | { list: string[] }
  | { table: { head: [string, string]; rows: [string, string | null][] } };

export type LegalDoc = {
  slug: string;
  title: string;
  tab: string;
  description: string;
  summary: string[];
  sections: { id: string; title: string; body: LegalBlock[] }[];
};

const CONTACT_NOTE = "Hubungi kami lewat kontak di halaman Legalitas.";

export const LEGAL_DOCS: LegalDoc[] = [
  {
    slug: "legalitas",
    title: "Legalitas",
    tab: "Legalitas",
    description: `Identitas pengelola Maxloan, peran layanan, dan kontak pengaduan.`,
    summary: [
      "Maxloan adalah bagian dari REMAX Indonesia.",
      `Layanan ini dikelola oleh ${LEGAL_ENTITY}.`,
      "Maxloan bukan bank atau pemberi pinjaman.",
    ],
    sections: [
      {
        id: "identitas",
        title: "Identitas pengelola",
        body: [
          {
            table: {
              head: ["Keterangan", "Detail"],
              rows: [
                ["Nama layanan", "Maxloan"],
                ["Bagian dari", "REMAX Indonesia"],
                ["Badan hukum pengelola", LEGAL_ENTITY],
                ["Alamat terdaftar", null],
                ["Nomor Induk Berusaha", null],
              ],
            },
          },
        ],
      },
      {
        id: "peran",
        title: "Peran layanan",
        body: [
          "Maxloan membantu kamu memahami, mensimulasikan, memantau, dan mengajukan KPR.",
          "Maxloan bukan bank atau pemberi pinjaman. Keputusan kredit mengikuti ketentuan lembaga keuangan terkait.",
        ],
      },
      {
        id: "kontak",
        title: "Kontak dan pengaduan",
        body: [
          {
            table: {
              head: ["Keperluan", "Kontak"],
              rows: [
                ["Data pribadi", null],
                ["Pengaduan layanan", null],
              ],
            },
          },
        ],
      },
    ],
  },
  {
    slug: "syarat-dan-ketentuan",
    title: "Syarat & Ketentuan",
    tab: "Syarat & Ketentuan",
    description: "Aturan penggunaan situs dan aplikasi Maxloan.",
    summary: [
      "Maxloan membantu proses KPR, tetapi keputusan kredit ada di bank.",
      "Semua angka adalah estimasi, bukan penawaran atau persetujuan kredit.",
      "Kamu bertanggung jawab atas kebenaran data yang kamu berikan.",
      "Data dikirim ke bank hanya setelah kamu menyetujuinya.",
    ],
    sections: [
      {
        id: "layanan",
        title: "Tentang layanan",
        body: [
          `Maxloan adalah bagian dari REMAX Indonesia dan dikelola oleh ${LEGAL_ENTITY}. Ketentuan ini berlaku saat kamu memakai situs dan aplikasi Maxloan.`,
          "Maxloan bukan bank atau pemberi pinjaman.",
        ],
      },
      {
        id: "akun",
        title: "Akun",
        body: [
          "Kamu perlu akun untuk memantau KPR dan membuat pengajuan. Jaga password akunmu dan jangan membagikannya kepada orang lain.",
        ],
      },
      {
        id: "kebenaran-data",
        title: "Kebenaran data",
        body: [
          "Pastikan data dan dokumen yang kamu berikan benar. Berikan data pasangan, keluarga, atau pihak lain hanya jika kamu berhak memberikannya.",
        ],
      },
      {
        id: "simulasi",
        title: "Simulasi dan estimasi",
        body: [
          "Hasil simulasi, skor, dan perbandingan adalah estimasi. Hasil ini bukan penawaran resmi bank dan bukan persetujuan kredit.",
        ],
      },
      {
        id: "pengajuan",
        title: "Pengajuan ke bank",
        body: [
          "Data dan dokumen dikirim hanya setelah kamu memilih satu program, memberi persetujuan, dan menekan Submit.",
          "Setelah data diterima bank, proses dan keputusan kredit mengikuti ketentuan bank.",
        ],
      },
      {
        id: "larangan",
        title: "Penggunaan yang tidak diperbolehkan",
        body: [
          {
            list: [
              "Memakai data atau dokumen orang lain tanpa hak.",
              "Memberikan data atau dokumen palsu.",
              "Mengakses akun atau data pengguna lain.",
              "Mengganggu keamanan atau jalannya layanan.",
            ],
          },
        ],
      },
      {
        id: "tanggung-jawab",
        title: "Batas tanggung jawab",
        body: [
          "Bunga, biaya, dan keputusan kredit ditentukan oleh bank, bukan oleh Maxloan.",
          "Ketentuan ini tidak mengurangi hak kamu menurut Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi.",
        ],
      },
      {
        id: "perubahan",
        title: "Perubahan ketentuan",
        body: [
          "Versi dan tanggal ketentuan tercantum di bagian atas halaman ini. Jika ada perubahan, kami memberi tahu kamu melalui layanan.",
        ],
      },
      {
        id: "hukum",
        title: "Hukum yang berlaku",
        body: ["Ketentuan ini tunduk pada hukum Republik Indonesia."],
      },
    ],
  },
  {
    slug: "kebijakan-privasi",
    title: "Kebijakan Privasi",
    tab: "Kebijakan Privasi",
    description: "Data yang kami proses, tujuannya, penyimpanannya, dan hak kamu.",
    summary: [
      "Data dipakai untuk layanan KPR yang kamu minta.",
      "Data baru dikirim ke bank setelah kamu memilih satu program dan menyetujuinya.",
      "Dokumen dipakai hingga akad atau proses pengajuan selesai, lalu tetap disimpan sebagai arsip dengan akses terbatas.",
      "Kamu bisa meminta akses, koreksi, penghapusan, atau menarik persetujuan.",
    ],
    sections: [
      {
        id: "siapa-kami",
        title: "Siapa kami",
        body: [
          `Maxloan adalah bagian dari REMAX Indonesia dan dikelola oleh ${LEGAL_ENTITY} sebagai Pengendali Data Pribadi.`,
          "Kebijakan ini menjelaskan data apa yang kami proses, untuk apa, siapa yang menerimanya, berapa lama disimpan, dan apa hak kamu.",
        ],
      },
      {
        id: "data",
        title: "Data yang kami kumpulkan",
        body: [
          {
            table: {
              head: ["Kategori", "Contoh"],
              rows: [
                ["Akun", "Nama, email, dan password"],
                ["Identitas", "Nama sesuai KTP, NIK, alamat, dan pekerjaan"],
                ["Keuangan", "Penghasilan, kewajiban lain, dan data KPR seperti cicilan, bunga, dan sisa pokok"],
                ["Properti", "Data properti yang kamu masukkan"],
                ["Dokumen", "KTP, NPWP, bukti penghasilan, dan dokumen properti"],
                ["Aktivitas", "Riwayat pengajuan, pengingat, dan aktivitas di akun"],
              ],
            },
          },
          "Data keuangan pribadi termasuk data pribadi yang bersifat spesifik menurut Pasal 4 Undang-Undang Nomor 27 Tahun 2022.",
          "Kalkulator KPR berjalan di browser tanpa login. Jika kamu memilih lanjut ke aplikasi, angka simulasi dibawa melalui tautan ke aplikasi.",
        ],
      },
      {
        id: "tujuan",
        title: "Tujuan dan dasar pemrosesan",
        body: [
          {
            list: [
              "Membuat dan mengelola akun.",
              "Menampilkan simulasi, pemantauan KPR, dan pengingat.",
              "Memproses pengajuan yang kamu pilih.",
              "Mengirim data ke bank setelah kamu menyetujuinya.",
              "Menjaga keamanan layanan.",
            ],
          },
          "Dasar pemrosesan utamanya adalah persetujuan eksplisit yang kamu berikan di aplikasi.",
        ],
      },
      {
        id: "dokumen",
        title: "Dokumen pribadi",
        body: [
          "Dokumen diminta saat kamu mengajukan KPR. Jenisnya mengikuti produk dan bank yang kamu pilih.",
          {
            table: {
              head: ["Dokumen", "Kenapa diminta"],
              rows: [
                ["KTP", "Verifikasi identitas oleh bank"],
                ["NPWP", "Verifikasi pajak oleh bank"],
                ["Bukti penghasilan", "Penilaian kemampuan bayar"],
                ["Dokumen properti", "Penilaian agunan"],
              ],
            },
          },
          "Jika dokumen memuat data pasangan atau keluarga, pastikan kamu berhak memberikannya.",
        ],
      },
      {
        id: "penerima",
        title: "Siapa yang menerima data",
        body: [
          {
            list: [
              "Bank atau lembaga keuangan yang kamu pilih, setelah kamu menyetujui pengiriman.",
              "Tim berwenang yang memproses pengajuanmu.",
              "Penyedia teknologi yang membantu layanan, seperti login Google, pengiriman email, dan hosting aplikasi.",
            ],
          },
          "Setelah data diterima bank, pemrosesannya juga mengikuti kebijakan bank.",
        ],
      },
      {
        id: "lokasi",
        title: "Lokasi pemrosesan",
        body: [
          {
            table: {
              head: ["Keterangan", "Detail"],
              rows: [
                ["Lokasi penyimpanan data", null],
                ["Transfer ke luar Indonesia", null],
              ],
            },
          },
        ],
      },
      {
        id: "penyimpanan",
        title: "Lama penyimpanan",
        body: [
          {
            table: {
              head: ["Tahap", "Perlakuan"],
              rows: [
                ["Selama proses", "Dokumen dipakai untuk memproses pengajuan hingga akad atau proses pengajuan selesai."],
                ["Setelah selesai", "Dokumen tetap disimpan sebagai arsip dengan akses terbatas."],
                ["Masa simpan arsip", null],
                ["Pengajuan batal atau ditolak", null],
                ["Hapus akun", "Akun dihapus, tetapi riwayat data dan dokumen tetap disimpan sebagai arsip internal. Pengajuan yang sudah dikirim ke bank mengikuti ketentuan bank."],
              ],
            },
          },
        ],
      },
      {
        id: "keamanan",
        title: "Keamanan",
        body: [
          "Kontrol yang kami terapkan dijelaskan di Kebijakan Keamanan Informasi.",
        ],
      },
      {
        id: "hak",
        title: "Hak kamu",
        body: [
          "Menurut Undang-Undang Nomor 27 Tahun 2022, kamu berhak:",
          {
            list: [
              "Mendapat informasi tentang pemrosesan data pribadimu.",
              "Melengkapi, memperbarui, dan memperbaiki data.",
              "Mengakses dan memperoleh salinan data.",
              "Mengakhiri pemrosesan, menghapus, atau memusnahkan data sesuai ketentuan peraturan.",
              "Menarik kembali persetujuan.",
              "Mengajukan keberatan atas keputusan yang sepenuhnya otomatis.",
              "Menunda atau membatasi pemrosesan.",
              "Menggugat dan menerima ganti rugi atas pelanggaran.",
            ],
          },
          `${CONTACT_NOTE} Kami perlu memverifikasi identitasmu sebelum memproses permintaan.`,
          "Jika kamu menarik persetujuan, pemrosesan dihentikan paling lambat 3 x 24 jam sejak permintaan diterima, sesuai Pasal 40.",
        ],
      },
      {
        id: "insiden",
        title: "Jika terjadi insiden",
        body: [
          "Jika terjadi kegagalan pelindungan data pribadi, kami memberi tahu kamu dan lembaga terkait secara tertulis paling lambat 3 x 24 jam, sesuai Pasal 46.",
        ],
      },
      {
        id: "cookie",
        title: "Cookie dan penyimpanan browser",
        body: [
          "Situs ini tidak memakai cookie iklan atau analitik. Aplikasi menyimpan sesi login di browser agar kamu tetap masuk.",
        ],
      },
      {
        id: "perubahan",
        title: "Perubahan kebijakan",
        body: [
          "Versi dan tanggal kebijakan tercantum di bagian atas halaman ini. Kami memberi tahu kamu sebelum informasi pemrosesan data berubah.",
        ],
      },
      {
        id: "kontak",
        title: "Kontak data pribadi",
        body: [CONTACT_NOTE],
      },
    ],
  },
  {
    slug: "kebijakan-keamanan-informasi",
    title: "Kebijakan Keamanan Informasi",
    tab: "Keamanan Informasi",
    description: "Cara kami menjaga informasi dan dokumen pengguna Maxloan.",
    summary: [
      "Dokumen disimpan di penyimpanan privat, bukan publik.",
      "Akses dokumen dibatasi untuk pemilik akun dan admin berwenang.",
      "Kami tidak pernah meminta password, PIN, atau OTP perbankan kamu.",
    ],
    sections: [
      {
        id: "komitmen",
        title: "Komitmen",
        body: [
          "Kami menjaga kerahasiaan, keutuhan, dan ketersediaan informasi pengguna, serta mencegah akses yang tidak sah.",
        ],
      },
      {
        id: "lingkup",
        title: "Ruang lingkup",
        body: [
          "Kebijakan ini berlaku untuk situs Maxloan, aplikasi, serta data dan dokumen yang kamu berikan di dalamnya.",
        ],
      },
      {
        id: "kontrol",
        title: "Kontrol yang diterapkan",
        body: [
          {
            list: [
              "Dokumen pengajuan dan bukti bayar disimpan di penyimpanan privat.",
              "Akses dokumen dibatasi untuk pemilik akun dan admin berwenang.",
              "Tautan unduh dokumen bersifat sementara.",
              "Akun baru diverifikasi lewat kode yang dikirim ke email.",
              "Password minimal 8 karakter dan berisi huruf serta angka.",
              "Koneksi ke layanan memakai HTTPS.",
            ],
          },
        ],
      },
      {
        id: "akun",
        title: "Keamanan akun kamu",
        body: [
          "Kami tidak pernah meminta password, PIN, atau OTP perbankan kamu. Jangan berikan data itu kepada siapa pun yang mengaku dari Maxloan.",
        ],
      },
      {
        id: "risiko",
        title: "Batas keamanan",
        body: [
          "Tidak ada sistem yang bebas risiko sepenuhnya. Karena itu kami menjelaskan kontrol yang berjalan dan tidak menjanjikan keamanan mutlak.",
        ],
      },
      {
        id: "insiden",
        title: "Penanganan insiden",
        body: [
          "Jika terjadi kegagalan pelindungan data pribadi, kami memberi tahu kamu dan lembaga terkait secara tertulis paling lambat 3 x 24 jam, sesuai Pasal 46 Undang-Undang Nomor 27 Tahun 2022.",
        ],
      },
      {
        id: "pelaporan",
        title: "Pelaporan dan penanggung jawab",
        body: [
          {
            table: {
              head: ["Keterangan", "Detail"],
              rows: [
                ["Kontak pelaporan keamanan", null],
                ["Penanggung jawab kebijakan", null],
              ],
            },
          },
        ],
      },
    ],
  },
];
