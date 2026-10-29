import { SiteHeader } from "@/components/home/site-header";
import { HeroSection } from "@/components/home/hero-section";
import { OverviewSection } from "@/components/home/overview-section";
import { ProductFeaturesSection } from "@/components/home/product-features-section";
import { TestimonialsSection } from "@/components/home/reminders-section";
import { OptionsSection } from "@/components/home/options-section";
import { BanksSection } from "@/components/home/banks-section";
import { BenefitsSection } from "@/components/home/benefits-section";
import { FaqSection } from "@/components/home/faq-section";
import { CtaSection } from "@/components/home/cta-section";
import { SiteFooter } from "@/components/home/site-footer";
import { CalculatorSection } from "@/components/home/calculator-section";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <OverviewSection />
        <ProductFeaturesSection />
        <BenefitsSection />
        <TestimonialsSection />
        <CalculatorSection />
        <OptionsSection />
        <BanksSection />
        <CtaSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  );
}
