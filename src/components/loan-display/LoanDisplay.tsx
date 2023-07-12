import React from 'react';
import { useState } from 'react';
import './LoanDisplay.scss';
import LoanForm, { autoLoanForm } from './loan-form/LoanForm';
import LoanData from './loan-data/LoanData';

const LoanDisplay = ({ cardInfo, deleteLoanCard }: any) => {
	const [loanData, setLoanData] = useState<autoLoanForm | null>(null);
	return (
		// <div className="loan-card">
		<kor-card class="loan-card">
			<div className="loan-card__controls">
				<kor-button class="loan-card__delete-button" onClick={() => deleteLoanCard(cardInfo.id)}>
					<kor-icon class="delete-icon" icon="delete" size="s"></kor-icon>
				</kor-button>
			</div>
			<h2 className="loan-card__title">{cardInfo?.name}</h2>

			<LoanForm handleFormSubmit={(data: autoLoanForm) => setLoanData(data)}></LoanForm>
			{loanData && <LoanData loanData={loanData}></LoanData>}
		</kor-card>
		// </div>
	);
};

export default LoanDisplay;
