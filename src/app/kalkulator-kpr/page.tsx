import type { Metadata } from "next";
import { SiteHeader } from "@/components/home/site-header";
import { SiteFooter } from "@/components/home/site-footer";
import { KprCalculator } from "@/components/kpr/calculator";

export const metadata: Metadata = {
  title: "Kalkulator KPR, Take Over & Refinancing | REMAX",
  description: "Simulasikan cicilan KPR baru, bandingkan take over, dan hitung dana bersih refinancing + top-up dengan produk bank. Gratis, tanpa login.",
};

export default function CalculatorPage() {
  const configuredUrl = process.env.NEXT_PUBLIC_KPR_APPLICATION_URL ?? "";
  let applicationUrl = "";
  try { if (new URL(configuredUrl).protocol === "https:") applicationUrl = configuredUrl; } catch { /* Not configured yet. */ }
  return <><SiteHeader /><main><KprCalculator applicationUrl={applicationUrl} /></main><SiteFooter /></>;
}
