export interface EmiInput {
  principal: number;
  annualRatePercent: number;
  tenureYears: number;
}

export interface EmiResult {
  emi: number;
  totalPayment: number;
  totalInterest: number;
  months: number;
}

/** Standard reducing-balance EMI formula: EMI = P × r × (1+r)^n / ((1+r)^n − 1). */
export function calculateEmi(input: EmiInput): EmiResult {
  const principal = Math.max(0, input.principal);
  const months = Math.max(1, Math.round(input.tenureYears * 12));
  const monthlyRate = Math.max(0, input.annualRatePercent) / 12 / 100;

  let emi: number;
  if (monthlyRate === 0) {
    emi = principal / months;
  } else {
    const factor = Math.pow(1 + monthlyRate, months);
    emi = (principal * monthlyRate * factor) / (factor - 1);
  }

  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;

  return { emi, totalPayment, totalInterest, months };
}
