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
