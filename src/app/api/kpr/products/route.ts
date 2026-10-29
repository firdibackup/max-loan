import { publicCatalog } from "@/lib/kpr/catalog";

export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.SUPABASE_URL;
  const secret = process.env.SUPABASE_SECRET_KEY;
  if (!url || !secret) return Response.json({ error: "Katalog bank belum dikonfigurasi." }, { status: 503 });
  try {
    const read = async (table: "banks" | "bank_products") => {
      const rows: unknown[] = [];
      // Paginate instead of silently dropping products at PostgREST's row limit.
      for (let offset = 0; ; offset += 500) {
        const response = await fetch(`${url.replace(/\/$/, "")}/rest/v1/${table}?select=id,doc&order=id&limit=500&offset=${offset}`, {
          headers: { apikey: secret }, cache: "no-store", signal: AbortSignal.timeout(15_000),
        });
        if (!response.ok) throw new Error(`Catalog read failed (${response.status})`);
        const data: unknown = await response.json();
        if (!Array.isArray(data)) throw new Error("Invalid catalog response");
        rows.push(...data);
        if (data.length < 500) break;
      }
      return rows;
    };
    const [banks, products] = await Promise.all([read("banks"), read("bank_products")]);
    const asOf = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jakarta", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
    return Response.json({ products: publicCatalog(banks, products, asOf), asOf, fetchedAt: new Date().toISOString() }, {
      headers: { "Cache-Control": "public, max-age=0, s-maxage=60" },
    });
  } catch {
    // Upstream payloads may contain internal details; only send a public error.
    return Response.json({ error: "Katalog bank belum dapat dimuat. Silakan coba lagi." }, { status: 502 });
  }
}
