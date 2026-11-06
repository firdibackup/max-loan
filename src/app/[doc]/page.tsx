import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/legal/legal-page";
import { LEGAL_DOCS } from "@/lib/legal";

// Only the legal slugs exist at this level; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return LEGAL_DOCS.map(({ slug }) => ({ doc: slug }));
}

const findDoc = (slug: string) => LEGAL_DOCS.find((doc) => doc.slug === slug);

export async function generateMetadata({ params }: PageProps<"/[doc]">): Promise<Metadata> {
  const doc = findDoc((await params).doc);
  return doc ? { title: `${doc.title} | REMAX`, description: doc.description } : {};
}

export default async function Page({ params }: PageProps<"/[doc]">) {
  const doc = findDoc((await params).doc);
  if (!doc) notFound();
  return <LegalPage doc={doc} />;
}
