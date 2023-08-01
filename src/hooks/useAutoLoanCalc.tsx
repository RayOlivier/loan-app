import { autoLoanForm, autoLoanCalculationsType } from '../types';

const getPrincipal = (loan: autoLoanForm) => {
  if (loan.otherFeesIncluded) {
    return loan.carPrice + loan.otherFees + loan.carPrice * (loan.salesTax / 100) - loan.downPayment;
  }

  return loan.carPrice - loan.downPayment;
};

const getTotalLoan = (loan: autoLoanForm) => {
  return getMonthlyPayment(loan) * loan.termMonths;
};

const getTotalInterest = (loan: autoLoanForm) => {
  return getTotalLoan(loan) - getPrincipal(loan);
};

const getSalesTax = (loan: autoLoanForm) => {
  return loan.carPrice * (loan.salesTax / 100);
};

const getUpfrontCost = (loan: autoLoanForm) => {
  if (loan.otherFeesIncluded) {
    return loan.downPayment;
  }

  return loan.downPayment + loan.otherFees + getSalesTax(loan);
};

const getMonthlyPayment = (loan: autoLoanForm) => {
  const principal = getPrincipal(loan);
  const interestRate = loan.interestRate / 100 / 12;

  return Math.round(principal * ((interestRate * Math.pow(1 + interestRate, loan.termMonths)) / (Math.pow(1 + interestRate, loan.termMonths) - 1)) * 100) / 100;
};

const getTotalCost = (loan: autoLoanForm): number => {
  // car price + tax + fees + interest
  return loan.carPrice + getSalesTax(loan) + loan.otherFees + getTotalInterest(loan);
};

const calculateLoan = (loan: autoLoanForm): autoLoanCalculationsType => {
  const loanCalculations = { principal: 0, totalLoan: 0, totalInterest: 0, salesTax: 0, upfrontCost: 0, monthlyPayment: 0, totalCost: 0 };

  loanCalculations.principal = getPrincipal(loan);
  loanCalculations.totalLoan = getTotalLoan(loan);
  loanCalculations.totalInterest = getTotalInterest(loan);
  loanCalculations.salesTax = getSalesTax(loan);
  loanCalculations.upfrontCost = getUpfrontCost(loan);
  loanCalculations.monthlyPayment = getMonthlyPayment(loan);
  loanCalculations.totalCost = getTotalCost(loan);

  return loanCalculations;
};

const useAutoLoanCalc = (loanData: autoLoanForm) => {
  return calculateLoan(loanData);
};

export default useAutoLoanCalc;
