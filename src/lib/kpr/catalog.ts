import type { Product, Mode, RatePeriod } from "./types";

type RecordValue = Record<string, unknown>;
const record = (v: unknown): RecordValue => v !== null && typeof v === "object" && !Array.isArray(v) ? v as RecordValue : {};
const text = (v: unknown) => typeof v === "string" ? v : "";
const number = (v: unknown, max = 1e13) => typeof v === "number" && Number.isFinite(v) && v >= 0 && v <= max ? v : null;
const date = (v: unknown) => /^\d{4}-\d{2}-\d{2}$/.test(text(v)) && Number.isFinite(Date.parse(text(v))) ? text(v) : "";

// Explicit public projection: never return a raw database doc or admin metadata.
export function publicCatalog(bankRows: unknown[], productRows: unknown[], asOf: string): Product[] {
  const banks = new Map(bankRows.map(row => {
    const doc = record(record(row).doc);
    return [text(doc.id), doc] as const;
  }));
  return productRows.flatMap(row => {
    const doc = record(record(row).doc);
    const bank = banks.get(text(record(doc.bank).id));
    if (!bank || bank.active !== true || doc.status !== "published" || doc.scheme !== "conventional") return [];
    const effectiveFrom = date(doc.effectiveFrom), effectiveUntil = date(doc.effectiveUntil), lastVerifiedAt = date(doc.lastVerifiedAt);
    if (!effectiveFrom || !effectiveUntil || !lastVerifiedAt || effectiveFrom > asOf || effectiveUntil < asOf) return [];
    const e = record(doc.eligibility), f = record(doc.fees);
    const ltv = number(e.maximumLtvBps, 10_000), tenor = number(e.maximumTenorMonths, 600), dti = number(e.maximumDtiBps, 10_000);
    const provision = number(f.provisionBps, 9999), admin = number(f.admin);
    if (!ltv || !tenor || !Number.isInteger(tenor) || dti === null || provision === null || admin === null) return [];
    if (!Array.isArray(doc.ratePeriods) || !doc.ratePeriods.length) return [];
    const periods: RatePeriod[] = [];
    for (const [index, value] of doc.ratePeriods.entries()) {
      const p = record(value), rate = number(p.rateBps, 10_000);
      const duration = p.durationMonths === null ? null : number(p.durationMonths, 600);
      if (rate === null || (p.type !== "fixed" && p.type !== "floating") || (duration !== null && (!duration || !Number.isInteger(duration))) || (duration === null && (p.type !== "floating" || index !== doc.ratePeriods.length - 1))) return [];
      periods.push({ type: p.type, rateBps: rate, durationMonths: duration });
    }
    const fees: Product['fees'] = { provisionBps: provision, admin };
    for (const key of ['appraisal', 'notary', 'insurance'] as const) {
      if (f[key] !== undefined) {
        const amount = number(f[key]);
        if (amount === null) return [];
        fees[key] = amount;
      }
    }
    const types = Array.isArray(doc.productTypes) ? doc.productTypes.filter((t): t is Mode => t === 'primary' || t === 'takeover' || t === 'topup') : [];
    if (!text(doc.id) || !text(doc.name) || !types.length) return [];
    return [{ id: text(doc.id), name: text(doc.name), version: number(doc.version) ?? 0,
      bank: { id: text(bank.id), name: text(bank.name), mark: text(bank.mark) },
      scheme: 'conventional' as const, productTypes: types, effectiveFrom, effectiveUntil, lastVerifiedAt,
      ratePeriods: periods, fees,
      eligibility: { maximumLtvBps: ltv, maximumTenorMonths: tenor, maximumDtiBps: dti,
        minimumIncome: number(e.minimumIncome) ?? undefined,
        purposes: Array.isArray(e.purposes) ? e.purposes.filter((p): p is string => typeof p === 'string') : [],
      },
    }];
  });
}
