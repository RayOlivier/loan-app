import React, { useEffect } from 'react';
import { useState } from 'react';
import './LoanData.scss';
import { autoLoanForm } from '../loan-form/LoanForm';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

type LoanDataProps = {
	loanData: autoLoanForm;
};

export interface loanCalculationsType {
	principal: number;
	totalLoan: number;
	totalInterest: number;
	salesTax: number;
	upfrontCost: number;
	monthlyPayment: number;
	totalCost: number;
}

const LoanData = ({ loanData }: LoanDataProps) => {
	ChartJS.register(ArcElement, Tooltip, Legend);

	const pieOptions: ChartOptions = {
		color: '#fff',
		plugins: {
			datalabels: {
				formatter: (value, ctx) => {
					let sum = 0;
					let dataArr = ctx.chart.data.datasets[0].data;
					dataArr.map(data => {
						sum += data;
					});
					let percentage = ((value * 100) / sum).toFixed(2) + '%';
					return percentage;
				},
				color: '#fff'
			}
		}
	};

	const [loanCalculations, setLoanCalculations] = useState<loanCalculationsType | null>(null);
	const [chartData, setChartData] = useState<ChartData<'pie'> | null>(null);

	useEffect(() => {
		console.log('USEEFFECT');
		const loanCalcs = calculateLoan(loanData);
		const data = {
			labels: ['principle', 'interest'],
			datasets: [
				{
					label: '$',
					data: [loanCalcs.principal, loanCalcs.totalInterest],
					backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)'],
					borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
					borderWidth: 1
				}
			]
		};
		setLoanCalculations(loanCalcs);
		setChartData(data);
	}, []);

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

		return (
			Math.round(principal * ((interestRate * Math.pow(1 + interestRate, loan.termMonths)) / (Math.pow(1 + interestRate, loan.termMonths) - 1)) * 100) / 100
		);
	};

	const getTotalCost = (loan: autoLoanForm): number => {
		// car price + tax + fees + interest
		return loan.carPrice + getSalesTax(loan) + loan.otherFees + getTotalInterest(loan);
	};

	const getUSD = (num: number): string => {
		return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
	};

	const calculateLoan = (loan: autoLoanForm): loanCalculationsType => {
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

	return (
		<div className="loan-data">
			<div className="loan-data__numbers">
				<div>Monthly Payment: ${loanCalculations && getUSD(loanCalculations?.monthlyPayment)} </div>
				<br />
				<div>Loan Principal: ${loanCalculations && getUSD(loanCalculations?.principal)}</div>
				<div>Sales Tax: ${loanCalculations && getUSD(loanCalculations?.salesTax)}</div>
				<div>Upfront Cost: ${loanCalculations && getUSD(loanCalculations?.upfrontCost)}</div>
				<br />
				<div>Total Interest: ${loanCalculations && getUSD(loanCalculations?.totalInterest)}</div>
				<div>
					Total of {loanData ? loanData.termMonths : 'Loan'} Payments: ${loanCalculations && getUSD(loanCalculations?.totalLoan)}
				</div>
				<div>Total Cost: ${loanCalculations && getUSD(loanCalculations?.totalCost)}</div>
			</div>
			{loanCalculations && <div className="loan-data__chart">{chartData && <Pie data={chartData} options={pieOptions} plugins={[ChartDataLabels]} />}</div>}
		</div>
	);
};

export default LoanData;
