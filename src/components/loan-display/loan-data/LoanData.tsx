import React, { useEffect } from 'react';
import { useState } from 'react';
import './LoanData.scss';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import useAutoLoanCalc from '../../../hooks/useAutoLoanCalc';
import { autoLoanForm } from '../../../types';

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

	// const [loanCalculations, setLoanCalculations] = useState<loanCalculationsType | null>(null);
	const [chartData, setChartData] = useState<ChartData<'pie'> | null>(null);

	const loanCalculations = useAutoLoanCalc(loanData);

	useEffect(() => {
		console.log('use effect');
		console.log('test', loanCalculations);
		// const loanCalcs = calculateLoan(loanData);
		const data = {
			labels: ['principle', 'interest'],
			datasets: [
				{
					label: '$',
					data: [loanCalculations.principal, loanCalculations.totalInterest],
					backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)'],
					borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
					borderWidth: 1
				}
			]
		};
		// setLoanCalculations(loanCalcs);
		setChartData(data);
	}, [loanData]);

	const getUSD = (num: number): string => {
		return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
