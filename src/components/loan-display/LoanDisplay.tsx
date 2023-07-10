import React from 'react';
import { useState } from 'react';
// import { EditableTitle } from 'lit-components/dist/lit-components.es';
// import { EditableTitle } from 'lit-components/dist/lit-components.es';
import './LoanDisplay.scss';
import LoanForm, { autoLoanForm } from './loan-form/LoanForm';
import LoanData from './loan-data/LoanData';
// import { EditableTitleComponent } from '../web-components/EditableTitleComponent';

const LoanDisplay = ({ cardInfo, deleteLoanCard }: any) => {
	const [loanData, setLoanData] = useState<autoLoanForm | null>(null);
	return (
		<kor-card className="loan-card">
			<div className="loan-card__controls">
				<kor-button onClick={() => deleteLoanCard(cardInfo.id)} icon="delete"></kor-button>
			</div>
			<h2>{cardInfo?.name}</h2>

			<LoanForm handleFormSubmit={(data: autoLoanForm) => setLoanData(data)}></LoanForm>
			<LoanData loanData={loanData}></LoanData>
		</kor-card>
	);
};

export default LoanDisplay;
