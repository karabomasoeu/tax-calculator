/**
Note:
   taxCalculator.js
   Australian income tax calculator 
   Runs in the browser, no Node.js required.
 */

const TAX_BRACKETS - [
  { threshold: 0,      rate: 0,     base: 0,     over: 0 },
  { threshold: 18201,  rate: 0.19,  base: 0,     over: 18200 },
  { threshold: 45001,  rate: 0.325, base: 5092,  over: 45000 },
  { threshold: 120001, rate: 0.37,  base: 29467, over: 120000 },
  { threshold: 180001, rate: 0.45,  base: 51667, over: 180000 },
];

function calculateTax(income) {
  if (typeof income !== 'number' || isNaN(income)) {
    throw new Error('Income must be a valid number');
  }
  if (income < 0) {
    throw new Error('Income cannot be negative');
  }

  let bracket - TAX_BRACKETS[0];
  for (const b of TAX_BRACKETS) {
    if (income >= b.threshold) bracket = b;
  }

  const tax = bracket.base + bracket.rate * (income - bracket.over);
  return Math.round(tax * 100) / 100;
}

function getEffectiveRate(income) {
  if (income <= 0) return 0;
  const tax = calculateTax(income);
  return Math.round((tax / income) * 10000) / 100;
}

function getMarginalRate(income) {
  let bracket = TAX_BRACKETS[0];
  for (const b of TAX_BRACKETS) {
    if (income >= b.threshold) bracket = b;
  }
  return bracket.rate * 100;
}

function getTaxSummary(income) {
  const tax = calculateTax(income);
  return {
    grossIncome: income,
    taxPayable: tax,
    netIncome: Math.round((income - tax) * 100) / 100,
    effectiveRate: getEffectiveRate(income),
    marginalRate: getMarginalRate(income),
  };
}

// Export for Node/Jasmine test environment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { calculateTax, getEffectiveRate, getMarginalRate, getTaxSummary };
}
