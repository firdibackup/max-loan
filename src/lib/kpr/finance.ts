import type { Inputs, Mode, Product, RatePeriod, ScheduleRow, Simulation } from "./types";

const money = (n: number) => Math.round(n);

export function payment(principal: number, rateBps: number, months: number): number {
  if (!Number.isFinite(principal) || principal < 0 || !Number.isInteger(months) || months < 1 || !Number.isFinite(rateBps) || rateBps < 0) {
    throw new Error("Plafon, bunga, atau tenor tidak valid.");
  }
  const r = rateBps / 120_000;
  return r === 0 ? principal / months : principal * r / -Math.expm1(-months * Math.log1p(r));
}

// Re-amortize the remaining balance at EVERY rate transition, including stepped fixed rates.
export function schedule(principal: number, months: number, periods: RatePeriod[]): ScheduleRow[] {
  if (principal <= 0 || !periods.length) throw new Error("Plafon dan periode bunga harus terisi.");
  const rows: ScheduleRow[] = [];
  let balance = principal;
  let elapsed = 0;
  for (const period of periods) {
    if (elapsed >= months) break;
    const duration = period.durationMonths ?? (months - elapsed);
    if (!Number.isInteger(duration) || duration < 1) throw new Error("Durasi bunga tidak valid.");
    const pay = payment(balance, period.rateBps, months - elapsed);
    for (let n = 0; n < duration && elapsed < months; n++) {
      const interest = balance * period.rateBps / 120_000;
      const opening = money(balance);
      const last = elapsed === months - 1;
      balance = last ? 0 : Math.max(0, balance - (pay - interest));
      const principalPaid = opening - money(balance);
      const roundedPay = last ? principalPaid + money(interest) : money(pay);
      rows.push({ month: ++elapsed, rateBps: period.rateBps, floating: period.type === "floating", payment: roundedPay, principal: principalPaid, interest: roundedPay - principalPaid, balance: money(balance) });
    }
  }
  if (elapsed !== months) throw new Error("Periode bunga produk belum mencakup tenor ini.");
  return rows;
}

export function validateInputs(mode: Mode, i: Inputs): string[] {
  const errors: string[] = [];
  if (Object.values(i).some(v => typeof v === "number" && (!Number.isFinite(v) || v < 0 || v > 1e13))) errors.push("Isi angka yang valid dan tidak negatif.");
  if (i.price <= 0) errors.push("Isi nilai properti lebih dari Rp0.");
  if (!Number.isInteger(i.months) || i.months < 12 || i.months > 360) errors.push("Tenor baru harus 12–360 bulan.");
  if (mode === "primary" && (i.downPayment >= i.price || i.downPayment < 0)) errors.push("DP harus lebih kecil dari harga properti.");
  if (mode !== "primary") {
    if (i.outstanding <= 0) errors.push("Isi sisa pokok KPR yang masih berjalan.");
    if (!Number.isInteger(i.remainingMonths) || i.remainingMonths < 1 || i.remainingMonths > 360) errors.push("Sisa tenor harus 1–360 bulan.");
    if (i.currentRate > 100 || i.currentFloatingRate > 100 || i.penaltyRate > 100) errors.push("Bunga dan penalti tidak boleh melebihi 100%.");
    if (!Number.isInteger(i.fixedMonthsLeft) || i.fixedMonthsLeft > i.remainingMonths) errors.push("Sisa fixed tidak boleh melebihi sisa tenor.");
    if (i.currentPayment > 0 && i.currentPayment <= i.outstanding * i.currentRate / 1200) errors.push("Cicilan lama harus lebih besar dari bunga bulanan.");
  }
  if (mode === "topup" && i.requestedCash <= 0) errors.push("Isi dana tambahan yang ingin diterima.");
  return errors;
}

// A recorded installment is used through the remaining fixed period. The final
// payment settles the residual so an inconsistent input cannot invent savings.
export function baseline(i: Inputs): number[] {
  let balance = i.outstanding;
  const payments: number[] = [];
  let pay = i.currentPayment || payment(balance, i.currentRate * 100, i.remainingMonths);
  for (let m = 0; m < i.remainingMonths; m++) {
    const floating = i.fixedMonthsLeft > 0 && m >= i.fixedMonthsLeft;
    const rate = floating ? i.currentFloatingRate : i.currentRate;
    if (i.fixedMonthsLeft > 0 && m === i.fixedMonthsLeft) pay = payment(balance, rate * 100, i.remainingMonths - m);
    const interest = balance * rate / 1200;
    const amount = m === i.remainingMonths - 1 ? balance + interest : Math.min(pay, balance + interest);
    balance = Math.max(0, balance + interest - amount);
    payments.push(money(amount));
  }
  return payments;
}

export function simulate(product: Product, mode: Mode, i: Inputs): Simulation {
  const invalid = validateInputs(mode, i);
  if (invalid.length) throw new Error(invalid[0]);
  const f = product.fees;
  const exit = mode === "primary" ? 0 : money(i.outstanding * i.penaltyRate / 100) + i.exitAdmin;
  const fixedCosts = f.admin + (f.appraisal ?? 0) + (f.notary ?? 0) + (f.insurance ?? 0) + exit + i.additionalCosts;
  const maxPrincipal = Math.floor(i.price * product.eligibility.maximumLtvBps / 10_000);
  const wanted = mode === "topup" ? Math.ceil((i.outstanding + i.requestedCash + fixedCosts) / (1 - f.provisionBps / 10_000)) : 0;
  const principal = mode === "primary" ? i.price - i.downPayment : mode === "takeover" ? i.outstanding : Math.min(wanted, maxPrincipal);
  if (principal <= 0) throw new Error("Plafon produk tidak mencukupi.");
  const fees = [
    { label: "Provisi", amount: money(principal * f.provisionBps / 10_000) },
    { label: "Administrasi bank baru", amount: f.admin },
    ...([['appraisal', 'Appraisal'], ['notary', 'Notaris'], ['insurance', 'Asuransi']] as const).filter(([key]) => f[key] !== undefined).map(([key, label]) => ({ label, amount: f[key]! })),
    ...(mode !== "primary" ? [{ label: "Penalti pelunasan bank lama", amount: money(i.outstanding * i.penaltyRate / 100) }, { label: "Administrasi bank lama", amount: i.exitAdmin }] : []),
    { label: "Biaya tambahan estimasi", amount: i.additionalCosts },
  ];
  const missingFees = ([['appraisal', 'appraisal'], ['notary', 'notaris'], ['insurance', 'asuransi']] as const).filter(([key]) => f[key] === undefined).map(([, label]) => label);
  const feesTotal = fees.reduce((s, f) => s + f.amount, 0);
  const rows = schedule(principal, i.months, product.ratePeriods);
  const totalPayment = rows.reduce((s, r) => s + r.payment, 0);
  const cash = mode === "topup" ? principal - i.outstanding - feesTotal : 0;
  const reasons: string[] = [];
  if (principal > maxPrincipal) reasons.push("Plafon melebihi batas LTV produk. Tambah DP atau sesuaikan nilai properti.");
  if (i.months > product.eligibility.maximumTenorMonths) reasons.push(`Tenor produk maksimal ${product.eligibility.maximumTenorMonths / 12} tahun.`);
  if (mode === "topup" && cash < i.requestedCash) reasons.push("Batas plafon produk belum mencukupi dana bersih yang kamu butuhkan.");
  if (mode === "topup" && !product.eligibility.purposes?.includes(i.purpose)) reasons.push("Tujuan penggunaan dana belum didukung produk ini.");
  const dti = i.income > 0 ? (rows[0].payment + i.otherDebt) / i.income : null;
  if (dti !== null && dti > product.eligibility.maximumDtiBps / 10_000) reasons.push("Rasio cicilan terhadap penghasilan melewati batas produk.");
  if (i.income > 0 && i.income < (product.eligibility.minimumIncome ?? 0)) reasons.push("Penghasilan di bawah minimum produk.");
  let saving: number | null = null;
  let monthlySaving: number | null = null;
  let breakEven: number | null = null;
  if (mode === "takeover") {
    const old = baseline(i);
    let cumulative = -feesTotal;
    let lastNegative = cumulative < 0 ? 0 : -1;
    let firstPositive: number | null = null;
    for (let m = 0; m < Math.max(old.length, rows.length); m++) {
      cumulative += (old[m] ?? 0) - (rows[m]?.payment ?? 0);
      if (cumulative >= 0 && firstPositive === null) firstPositive = m + 1;
      if (cumulative < 0) lastNegative = m + 1;
    }
    saving = cumulative;
    monthlySaving = old[0] - rows[0].payment;
    breakEven = cumulative > 0 && firstPositive !== null ? Math.max(firstPositive, lastNegative + 1) : null;
  }
  return { product, principal, maxPrincipal, fees, feesTotal, missingFees, rows, payment: rows[0].payment, floatingPayment: rows.find(r => r.floating)?.payment ?? null, totalPayment, totalInterest: totalPayment - principal, totalCost: totalPayment + (mode === "topup" ? 0 : feesTotal), cash, cashGap: Math.max(0, i.requestedCash - cash), saving, monthlySaving, breakEven, reasons, dti };
}
