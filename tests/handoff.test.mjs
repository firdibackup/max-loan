import { test } from 'node:test';
import assert from 'node:assert/strict';
import { applicationLink } from '../src/lib/kpr/handoff.ts';

const input = { price: 1e9, downPayment: 2e8, months: 180, income: 2e7, otherDebt: 0, additionalCosts: 1e6, outstanding: 5e8, remainingMonths: 120, currentRate: 8.5, currentPayment: 0, fixedMonthsLeft: 12, currentFloatingRate: 11, penaltyRate: 2, exitAdmin: 500000, requestedCash: 1e8, purpose: 'renovation' };
const product = { id: 'product-1', bank: { id: 'bank-1' }, version: 2 };
for (const mode of ['primary', 'takeover', 'topup']) test(`handoff ${mode} carries only relevant loan fields`, () => {
  const url = new URL(applicationLink('https://example.com?campaign=maxi', mode, input, product));
  assert.equal(url.pathname, '/from-calculator');
  assert.equal(url.searchParams.get('mode'), mode);
  assert.equal(url.searchParams.get('productId'), product.id);
  assert.equal(url.searchParams.get('bankId'), product.bank.id);
  assert.equal(url.searchParams.has('downPayment'), mode === 'primary');
  assert.equal(url.searchParams.has('outstanding'), mode !== 'primary');
  assert.equal(url.searchParams.has('requestedCash'), mode === 'topup');
  assert.equal(url.searchParams.get('campaign'), 'maxi');
});
