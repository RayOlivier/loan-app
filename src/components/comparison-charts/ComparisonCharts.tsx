import React, { useEffect } from 'react';
import { useState } from 'react';
import './LoanData.scss';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import useAutoLoanCalc from '../../hooks/useAutoLoanCalc';
import { autoLoanForm } from '../../types';

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

const LoanData = (loans: LoanDataProps[]) => {
	// ChartJS.register(ArcElement, Tooltip, Legend);

	return <div className="comparison-charts">CHARTS GO HERE</div>;
};

export default LoanData;
