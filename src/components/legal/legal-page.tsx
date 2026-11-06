import Link from "next/link";
import { Check, ShieldCheck } from "lucide-react";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { wrap } from "@/components/home/styles";
import {
  LEGAL_DOCS,
  LEGAL_EFFECTIVE_DATE,
  LEGAL_VERSION,
  type LegalBlock,
  type LegalDoc,
} from "@/lib/legal";
import { cn } from "@/lib/utils";

function Pending() {
  return (
    <span className="inline-block rounded-md border border-dashed border-amber/50 bg-amber-wash px-2 py-0.5 text-xs font-semibold text-amber">
      Menunggu data resmi
    </span>
  );
}

function Contents({ doc }: { doc: LegalDoc }) {
  return (
    <ol className="flex flex-col text-sm">
      {doc.sections.map((section, index) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            className="flex min-h-11 items-center gap-2.5 py-1.5 text-slate transition-colors hover:text-ink lg:min-h-9"
          >
            <span className="w-5 shrink-0 tabular-nums">{index + 1}</span>
            {section.title}
          </a>
        </li>
      ))}
    </ol>
  );
}

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === "string") {
    return <p className="text-base leading-[1.65] text-ink/85">{block}</p>;
  }
  if ("list" in block) {
    return (
      <ul className="flex list-disc flex-col gap-2 pl-5 text-base leading-[1.6] text-ink/85">
        {block.list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  const { head, rows } = block.table;
  return (
    <table className="w-full border-collapse text-[15px] leading-[1.5]">
      <thead>
        <tr className="border-b border-ink text-left text-xs text-slate">
          <th scope="col" className="w-2/5 py-2 pr-4 font-semibold">{head[0]}</th>
          <th scope="col" className="py-2 font-semibold">{head[1]}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([label, value]) => (
          <tr key={label} className="border-b border-line align-top">
            <th scope="row" className="py-3 pr-4 text-left font-medium">{label}</th>
            <td className="py-3 text-ink/85">{value ?? <Pending />}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <SiteHeader />
      <main className={cn(wrap, "pt-6 pb-20 lg:pt-10 lg:pb-28")}>
        <nav aria-label="Dokumen legal">
          <ul className="grid grid-cols-2 gap-1.5 lg:flex">
            {LEGAL_DOCS.map(({ slug, tab }) => (
              <li key={slug}>
                <Link
                  href={`/${slug}`}
                  aria-current={slug === doc.slug ? "page" : undefined}
                  className={cn(
                    "flex min-h-11 items-center justify-center rounded-full px-4 text-center text-[13px] leading-tight font-semibold transition-colors",
                    slug === doc.slug ? "bg-ink text-paper" : "bg-sage text-slate hover:text-ink",
                  )}
                >
                  {tab}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <h1 className="mt-10 max-w-[1000px] font-display text-[clamp(3rem,2.2rem+3.4vw,5.25rem)] leading-none font-medium tracking-[-0.03em] lg:mt-14">
          {doc.title}
        </h1>
        <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate">
          <span>Versi {LEGAL_VERSION}</span>
          <span aria-hidden="true">·</span>
          <span>Berlaku sejak</span> {LEGAL_EFFECTIVE_DATE ?? <Pending />}
        </p>

        <div className="mt-8 grid gap-6 lg:mt-14 lg:grid-cols-[230px_minmax(0,680px)] lg:gap-[72px] lg:border-t lg:border-ink lg:pt-8">
          <details className="rounded-2xl border border-line px-4 py-1 lg:hidden">
            <summary className="flex min-h-11 cursor-pointer items-center text-sm font-semibold">
              Daftar isi
            </summary>
            <Contents doc={doc} />
          </details>
          <nav aria-label="Daftar isi" className="sticky top-6 hidden self-start lg:block">
            <p className="mb-2 text-sm font-semibold">Daftar isi</p>
            <Contents doc={doc} />
          </nav>

          <article className="min-w-0">
            <section aria-labelledby="intinya" className="rounded-[18px] bg-mist p-6">
              <h2 id="intinya" className="flex items-center gap-2 text-[15px] font-semibold">
                <ShieldCheck size={18} className="text-teal" aria-hidden="true" />
                Intinya
              </h2>
              <ul className="mt-3 flex flex-col gap-2 text-[15px] leading-[1.5]">
                {doc.summary.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check size={15} className="mt-1 shrink-0 text-teal" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {doc.sections.map((section, index) => (
              <section key={section.id} id={section.id} className="mt-10 flex scroll-mt-6 flex-col gap-3">
                <h2 className="font-display text-[clamp(1.5rem,1.35rem+0.6vw,1.75rem)] leading-[1.2] font-medium tracking-[-0.01em]">
                  <span className="mr-2.5 text-slate">{index + 1}</span>
                  {section.title}
                </h2>
                {section.body.map((block, blockIndex) => (
                  <Block key={blockIndex} block={block} />
                ))}
              </section>
            ))}
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
