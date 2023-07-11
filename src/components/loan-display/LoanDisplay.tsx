import React from 'react';
import { useState } from 'react';
import './LoanDisplay.scss';
import LoanForm, { autoLoanForm } from './loan-form/LoanForm';
import LoanData from './loan-data/LoanData';

const LoanDisplay = ({ cardInfo, deleteLoanCard }: any) => {
	const [loanData, setLoanData] = useState<autoLoanForm | null>(null);
	return (
		<div className="loan-card">
			<kor-card>
				<div className="loan-card__controls">
					<kor-button onClick={() => deleteLoanCard(cardInfo.id)} icon="delete"></kor-button>
				</div>
				<h2>{cardInfo?.name}</h2>

				<LoanForm handleFormSubmit={(data: autoLoanForm) => setLoanData(data)}></LoanForm>
				<LoanData loanData={loanData}></LoanData>
			</kor-card>
		</div>
	);
};

export default LoanDisplay;
