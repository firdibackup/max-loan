export type Mode = "primary" | "takeover" | "topup";

export type RatePeriod = {
  type: "fixed" | "floating";
  rateBps: number;
  durationMonths: number | null;
};

export type Product = {
  id: string;
  name: string;
  version: number;
  bank: { id: string; name: string; mark: string };
  productTypes: Mode[];
  scheme: "conventional";
  effectiveFrom: string;
  effectiveUntil: string;
  lastVerifiedAt: string;
  ratePeriods: RatePeriod[];
  fees: {
    provisionBps: number;
    admin: number;
    appraisal?: number;
    notary?: number;
    insurance?: number;
  };
  eligibility: {
    maximumLtvBps: number;
    maximumTenorMonths: number;
    maximumDtiBps: number;
    minimumIncome?: number;
    purposes?: string[];
  };
};

export type Inputs = {
  price: number;
  downPayment: number;
  months: number;
  outstanding: number;
  remainingMonths: number;
  currentRate: number;
  currentPayment: number;
  fixedMonthsLeft: number;
  currentFloatingRate: number;
  penaltyRate: number;
  exitAdmin: number;
  requestedCash: number;
  purpose: string;
  additionalCosts: number;
  income: number;
  otherDebt: number;
};

export type ScheduleRow = {
  month: number;
  rateBps: number;
  floating: boolean;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
};

export type Simulation = {
  product: Product;
  principal: number;
  maxPrincipal: number;
  fees: { label: string; amount: number }[];
  feesTotal: number;
  missingFees: string[];
  rows: ScheduleRow[];
  payment: number;
  floatingPayment: number | null;
  totalPayment: number;
  totalInterest: number;
  totalCost: number;
  cash: number;
  cashGap: number;
  saving: number | null;
  monthlySaving: number | null;
  breakEven: number | null;
  reasons: string[];
  dti: number | null;
};
