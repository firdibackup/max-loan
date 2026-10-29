import type { Inputs, Mode, Product } from "./types";

// Versioned contract consumed by the application's /from-calculator route.
export function applicationLink(destination: string, mode: Mode, input: Inputs, product: Product): string {
  if (!destination) return "";
  const url = new URL(destination);
  if (url.protocol !== "https:") return "";
  url.pathname = `${url.pathname.replace(/\/$/, "").replace(/\/from-calculator$/, "")}/from-calculator`;
  url.hash = "";
  const fields: Record<string, string | number> = {
    source: "maxi-calculator", v: 1, mode, bankId: product.bank.id, productId: product.id,
    productVersion: product.version, price: input.price, months: input.months,
    income: input.income, otherDebt: input.otherDebt, additionalCosts: input.additionalCosts,
  };
  if (mode === "primary") fields.downPayment = input.downPayment;
  else Object.assign(fields, {
    outstanding: input.outstanding, remainingMonths: input.remainingMonths,
    currentRate: input.currentRate,
    currentPayment: input.currentPayment,
    fixedMonthsLeft: input.fixedMonthsLeft, currentFloatingRate: input.currentFloatingRate,
    penaltyRate: input.penaltyRate, exitAdmin: input.exitAdmin,
  });
  if (mode === "topup") Object.assign(fields, { requestedCash: input.requestedCash, purpose: input.purpose });
  for (const [key, value] of Object.entries(fields)) url.searchParams.set(key, String(value));
  return url.toString();
}
