import { test } from 'node:test';
import assert from 'node:assert/strict';
import { LEGAL_DOCS, LEGAL_ENTITY } from '../src/lib/legal.ts';

const text = (doc) => JSON.stringify(doc);

test('the four public legal documents exist under unique slugs', () => {
  assert.deepEqual(LEGAL_DOCS.map((doc) => doc.slug).sort(), ['kebijakan-keamanan-informasi', 'kebijakan-privasi', 'legalitas', 'syarat-dan-ketentuan']);
});

test('Maxloan names its legal entity in the identity documents', () => {
  assert.equal(LEGAL_ENTITY, 'PT Signature Properties');
  for (const slug of ['legalitas', 'kebijakan-privasi', 'syarat-dan-ketentuan']) assert.match(text(LEGAL_DOCS.find((doc) => doc.slug === slug)), /PT Signature Properties/);
});

test('no unproven licence, absolute safety or deemed-consent wording', () => {
  for (const doc of LEGAL_DOCS) assert.doesNotMatch(text(doc), /OJK|Komdigi|Kominfo|ISO|PSE|terdaftar di|berizin|100%|dijamin|tidak akan bocor|dianggap menyetujui|tidak dijual|lalu dihapus|dimusnahkan setelah/i, doc.slug);
});

test('retention stays honest: archived after akad, period left for company data', () => {
  const privacy = text(LEGAL_DOCS.find((doc) => doc.slug === 'kebijakan-privasi'));
  assert.match(privacy, /hingga akad atau proses pengajuan selesai/);
  assert.match(privacy, /tetap disimpan sebagai arsip dengan akses terbatas/);
  assert.match(privacy, /\["Masa simpan arsip",null\]/);
});

test('section anchors stay unique inside each document', () => {
  for (const doc of LEGAL_DOCS) assert.equal(new Set(doc.sections.map((s) => s.id)).size, doc.sections.length, doc.slug);
});
