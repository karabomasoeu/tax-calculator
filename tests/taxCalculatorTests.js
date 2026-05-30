'use strict';

const { calculateTax, getEffectiveRate, getMarginalRate, getTaxSummary } = require('../taxCalculator');

describe('Tax Calculator', () => {

  it('should return 0 tax for income below the tax-free threshold', () => {
    expect(calculateTax(18200)).toBe(0);
  });

  it('should correctly calculate tax in the 19% bracket', () => {
    expect(calculateTax(30000)).toBe(2242);
  });

  it('should correctly calculate tax in the 32.5% bracket', () => {
    expect(calculateTax(80000)).toBe(16467);
  });

  it('should correctly calculate tax in the 37% bracket', () => {
    expect(calculateTax(150000)).toBe(40567);
  });

  it('should correctly calculate tax in the 45% bracket', () => {
    expect(calculateTax(200000)).toBe(60667);
  });

  it('should throw an error for negative income', () => {
    expect(() => calculateTax(-1)).toThrowError('Income cannot be negative');
  });

  it('should return a complete summary object with correct fields', () => {
    const summary = getTaxSummary(80000);
    expect(summary.grossIncome).toBe(80000);
    expect(summary.taxPayable).toBe(16467);
    expect(summary.netIncome).toBe(63533);
    expect(summary.marginalRate).toBe(32.5);
  });

});
