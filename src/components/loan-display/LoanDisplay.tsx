import React, { useEffect } from 'react';
import { useState } from 'react';
import './LoanDisplay.scss';
import LoanForm from './loan-form/LoanForm';
import LoanData from './loan-data/LoanData';
import { autoLoanForm, loanType } from '../../types';

type LoanDisplayProps = {
	cardInfo: loanType;
	deleteLoanCard: CallableFunction;
	updateLoanCard: CallableFunction;
};

const LoanDisplay = ({ cardInfo, deleteLoanCard, updateLoanCard }: LoanDisplayProps) => {
	const [loanData, setLoanData] = useState<autoLoanForm | null>(null);

	useEffect(() => {
		if (cardInfo.data) {
			setLoanData(cardInfo.data);
		}
	}, []);

	const handleFormChanges = (data: autoLoanForm) => {
		console.log('handling form', data);
		setLoanData(data);
		updateLoanCard(cardInfo.id, data);
	};

	return (
		<kor-card class="loan-card">
			<div className="loan-card__controls">
				<kor-button class="loan-card__delete-button" onClick={() => deleteLoanCard(cardInfo.id)}>
					<kor-icon class="delete-icon" icon="delete" size="s"></kor-icon>
				</kor-button>
			</div>
			<h2 className="loan-card__title">{cardInfo?.name}</h2>

			<LoanForm handleFormSubmit={(data: autoLoanForm) => handleFormChanges(data)} loanData={loanData}></LoanForm>
			{loanData && <LoanData loanData={loanData}></LoanData>}
		</kor-card>
	);
};

export default LoanDisplay;
