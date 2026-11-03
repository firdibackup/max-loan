import { BASE_PATH } from "@/lib/base-path";
import type { Product } from "./types";

const bankLogos: Record<string, string[]> = {
  bca: ["Bank Central Asia"],
  "bca-syariah": [],
  mandiri: [],
  bri: ["Bank Rakyat Indonesia"],
  bni: ["Bank Negara Indonesia"],
  btn: ["Bank Tabungan Negara"],
  bsi: ["Bank Syariah Indonesia"],
  danamon: ["Danamon Indonesia"],
  maybank: ["Maybank Indonesia"],
  ocbc: ["OCBC NISP"],
  bjb: ["Bank Jabar Banten", "Bank Pembangunan Daerah Jawa Barat dan Banten"],
  uob: ["UOB Indonesia"],
  permata: ["Permata Bank"],
  "kb-bank": ["KB Bukopin", "Bukopin"],
  panin: ["Panin Bank", "Pan Indonesia"],
  muamalat: ["Muamalat Indonesia"],
  mega: [],
  "mega-syariah": [],
  "cimb-niaga": [],
  smbc: ["SMBC Indonesia", "BTPN"],
  mnc: ["MNC Internasional"],
  "woori-saudara": ["Bank Woori Saudara Indonesia 1906", "BWS"],
  mestika: ["Mestika Dharma"],
  ina: ["INA Perdana"],
  "ccb-indonesia": ["CCB", "China Construction Bank Indonesia"],
  dki: [],
  ganesha: [],
};

function normalizeBank(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/\b(pt|tbk|persero|bank)\b/g, "").replace(/\s+/g, "");
}

const logoByBank = new Map(Object.entries(bankLogos).flatMap(([slug, aliases]) =>
  [slug, ...aliases].map(name => [normalizeBank(name), slug] as const),
));

export function bankLogoSrc(bank: Product["bank"]): string | undefined {
  for (const value of [bank.id, bank.name, bank.mark]) {
    const slug = logoByBank.get(normalizeBank(value));
    if (slug) return `${BASE_PATH}/banks/${slug}.png`;
  }
}
