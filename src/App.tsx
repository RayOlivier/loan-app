import React, { useState } from 'react';
import LoanDisplay from './components/loan-display/LoanDisplay';
import '@kor-ui/kor';
import '@kor-ui/kor/kor-styles.css';
import './App.scss';

declare global {
	namespace JSX {
		interface IntrinsicElements {
			'kor-button': any;
			'kor-card': any;
			'kor-checkbox': any;
			'kor-icon': any;
			'kor-input': any;
		}
	}
}

export interface loanType {
	name: string;
	id: number;
}

const App = () => {
	// @TODO: try to pull loans from local storage first
	const [loans, setLoans] = useState<loanType[]>([{ name: 'Loan 1', id: 0 }]);

	const addNewCard = () => {
		let newCards = [...loans];
		newCards.push({ name: `Loan ${loans.length + 1}`, id: Date.now() + Math.random() });

		setLoans(newCards);
	};

	const deleteCard = (id: number) => {
		console.log('loans', [...loans]);
		console.log('id', id);
		const cardPosition = loans.findIndex(card => card.id === id);
		console.log('cardposition', cardPosition);
		let newCards = [...loans];
		newCards.splice(cardPosition, 1);
		console.log(newCards);
		setLoans(newCards);
	};

	return (
		<>
			<div className="main-content">
				<div className="main-content__header">
					<h1>Loan Calculator</h1>
					<div className="controls">
						<kor-button onClick={addNewCard} icon="add" {...(loans.length >= 3 ? { disabled: 'true' } : {})}></kor-button>
					</div>
				</div>
				<div className="main-content__loan-cards">
					{loans &&
						loans.map(loan => {
							return <LoanDisplay cardInfo={loan} deleteLoanCard={deleteCard} key={loan.id}></LoanDisplay>;
						})}
				</div>
			</div>
		</>
	);
};

export default App;
