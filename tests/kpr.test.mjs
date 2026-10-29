import { test } from 'node:test';
import assert from 'node:assert/strict';
import { payment, schedule, simulate, validateInputs } from '../src/lib/kpr/finance.ts';
import { publicCatalog } from '../src/lib/kpr/catalog.ts';

const product = {
  id: 'test', name: 'Test product', version: 1, bank: { id: 'bank', name: 'Test bank', mark: 'T' },
  scheme: 'conventional', status: 'published', productTypes: ['primary', 'takeover', 'topup'],
  effectiveFrom: '2026-01-01', effectiveUntil: '2027-01-01', lastVerifiedAt: '2026-10-01',
  ratePeriods: [{ type: 'fixed', rateBps: 600, durationMonths: 24 }, { type: 'fixed', rateBps: 800, durationMonths: 24 }, { type: 'floating', rateBps: 1100, durationMonths: null }],
  fees: { provisionBps: 100, admin: 1_000_000, appraisal: 1_000_000, notary: 3_000_000, insurance: 2_000_000 },
  eligibility: { maximumLtvBps: 8000, maximumTenorMonths: 360, maximumDtiBps: 4000, purposes: ['renovation'] },
};
const input = { price: 1_000_000_000, downPayment: 200_000_000, months: 180, outstanding: 500_000_000, remainingMonths: 180, currentRate: 11, currentPayment: 0, fixedMonthsLeft: 0, currentFloatingRate: 11, penaltyRate: 2, exitAdmin: 0, requestedCash: 150_000_000, purpose: 'renovation', additionalCosts: 0, income: 0, otherDebt: 0 };

test('annuity agrees with known payment and handles zero rate', () => {
  assert.ok(Math.abs(payment(100_000_000, 1200, 12) - 8_884_878.8678) < 0.01);
  assert.equal(payment(120_000_000, 0, 12), 10_000_000);
});

test('stepped rates preserve exact integer-Rupiah accounting and repay fully', () => {
  const rows = schedule(800_000_000, 180, product.ratePeriods);
  assert.equal(rows.length, 180);
  assert.equal(rows.at(-1).balance, 0);
  assert.equal(rows.reduce((s, r) => s + r.principal, 0), 800_000_000);
  assert.equal(rows[24].rateBps, 800);
  assert.equal(rows[48].rateBps, 1100);
  for (const [i, row] of rows.entries()) {
    assert.equal(row.payment, row.principal + row.interest);
    assert.equal(row.balance + row.principal, i ? rows[i - 1].balance : 800_000_000);
  }
  assert.throws(() => schedule(100_000_000, 180, [product.ratePeriods[0]]));
});

test('topup targets NET cash, respects collateral, and does not double-count financed fees', () => {
  const result = simulate(product, 'topup', input);
  assert.ok(Math.abs(result.cash - input.requestedCash) <= 1);
  assert.equal(result.cash, result.principal - input.outstanding - result.feesTotal);
  assert.equal(result.totalCost, result.totalPayment);
  const capped = simulate(product, 'topup', { ...input, requestedCash: 500_000_000 });
  assert.equal(capped.principal, 800_000_000);
  assert.ok(capped.cashGap > 0);
  assert.ok(capped.reasons.length > 0);
});

test('same-rate takeover loses the transfer costs; longer loan is not automatically saving', () => {
  const same = { ...product, ratePeriods: [{ type: 'floating', rateBps: 1100, durationMonths: null }] };
  const result = simulate(same, 'takeover', input);
  assert.ok(Math.abs(result.saving + result.feesTotal) < 200);
  assert.equal(result.breakEven, null);
  const extended = simulate(same, 'takeover', { ...input, months: 300 });
  assert.ok(extended.monthlySaving > 0);
  assert.ok(extended.saving < 0);
  assert.equal(extended.breakEven, null);
});

test('invalid loan input rejected; absent costs remain unknown', () => {
  assert.ok(validateInputs('primary', { ...input, downPayment: input.price }).length);
  assert.ok(validateInputs('takeover', { ...input, currentPayment: 1 }).length);
  assert.ok(validateInputs('topup', { ...input, requestedCash: 0 }).length);
  const result = simulate({ ...product, fees: { admin: 0, provisionBps: 0 } }, 'primary', input);
  assert.deepEqual(result.missingFees, ['appraisal', 'notaris', 'asuransi']);
});

test('a cheap teaser rate cannot imply lasting break-even after an expensive floating period', () => {
  const teaser = { ...product, ratePeriods: [{ type: 'fixed', rateBps: 100, durationMonths: 12 }, { type: 'floating', rateBps: 2000, durationMonths: null }] };
  const result = simulate(teaser, 'takeover', input);
  assert.ok(result.monthlySaving > 0);
  assert.ok(result.saving < 0);
  assert.equal(result.breakEven, null);
});

test('old fixed-to-floating transition affects total baseline comparison', () => {
  const floating = simulate(product, 'takeover', input);
  const fixed = simulate(product, 'takeover', { ...input, currentRate: 5, fixedMonthsLeft: 24, currentFloatingRate: 11 });
  assert.ok(fixed.saving < floating.saving);
});

test('public catalog projects only active conventional published products and explicit fields', () => {
  const bank = { doc: { ...product.bank, active: true, internalSecret: 'never expose' } };
  const rows = [
    { doc: { ...product, internalNotes: 'never expose' } },
    { doc: { ...product, id: 'draft', status: 'draft' } },
    { doc: { ...product, id: 'sharia', scheme: 'sharia' } },
    { doc: { ...product, id: 'expired', effectiveUntil: '2026-01-02' } },
    { doc: { ...product, id: 'future', effectiveFrom: '2027-01-01' } },
    { doc: { ...product, id: 'invalid', eligibility: { ...product.eligibility, maximumDtiBps: 800000000 } } },
  ];
  const result = publicCatalog([bank], rows, '2026-10-23');
  assert.equal(result.length, 1);
  assert.ok(!JSON.stringify(result).includes('never expose'));
  assert.equal(result[0].status, undefined);
  assert.equal(publicCatalog([{ doc: { ...bank.doc, active: false } }], rows, '2026-10-23').length, 0);
});
