import React from 'react';
import { useState } from 'react';
import './LoanData.scss';
import { autoLoanForm } from '../loan-form/LoanForm';

type LoanDataProps = {
	loanData: autoLoanForm | null;
};

const LoanData = ({ loanData }: LoanDataProps) => {
	const getLoanBeforeInterest = (loan: autoLoanForm) => {
		// console.log(loan.carPrice + loan.otherFees - loan.downPayment);

		return loan.carPrice + loan.otherFees - loan.downPayment;
	};

	const getTotalLoan = (loan: autoLoanForm) => {
		// console.log(loan.carPrice + loan.otherFees - loan.downPayment);
		const loanPrice = getLoanBeforeInterest(loan);

		return;
	};

	const getMonthlyPayment = (loan: autoLoanForm) => {
		console.log('loan', loan);
		const principal = getLoanBeforeInterest(loan);
		const interestRate = loan.interestRate / 100 / 12;
		console.log(principal);
		console.log(interestRate);
		console.log(loan.termMonths);

		return (
			Math.round(principal * ((interestRate * Math.pow(1 + interestRate, loan.termMonths)) / (Math.pow(1 + interestRate, loan.termMonths) - 1)) * 100) / 100
		);
	};

	return (
		<div>
			<h2>Loan Data</h2>
			{loanData && (
				<div>
					<div>Monthly Payment: ${getMonthlyPayment(loanData)} </div>
					<div>Total Loan (before interest): ${getLoanBeforeInterest(loanData)}</div>
					<div>sales Tax total: ${loanData.carPrice * (loanData.salesTax / 100)}</div>
					<div>total interest: @TODO</div>
					<div>total cost: @TODO</div>
					<div>@TODO pie chart</div>
				</div>
			)}
		</div>
	);
};

export default LoanData;
