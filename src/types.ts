export interface autoLoanForm {
  carPrice: number;
  termMonths: number;
  interestRate: number;
  downPayment: number;
  salesTax: number;
  otherFees: number;
  otherFeesIncluded: boolean;
}

export interface loanType {
  name: string;
  id: number;
  data?: autoLoanForm;
}

export interface autoLoanCalculationsType {
  principal: number;
  totalLoan: number;
  totalInterest: number;
  salesTax: number;
  upfrontCost: number;
  monthlyPayment: number;
  totalCost: number;
}
