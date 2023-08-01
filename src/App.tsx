import React, { useState } from 'react';
import LoanDisplay from './components/loan-display/LoanDisplay';
import '@kor-ui/kor';
import '@kor-ui/kor/kor-styles.css';
import './App.scss';
import { autoLoanForm, loanType } from './types';

// declarations for kor ui lit-element components
declare global {
  /* eslint-disable */
  namespace JSX {
    interface IntrinsicElements {
      'kor-button': any;
      'kor-card': any;
      'kor-checkbox': any;
      'kor-icon': any;
      'kor-input': any;
    }
  }
  /* eslint-enable */
}

const App = () => {
  // @TODO: try to pull loans from local storage first

  // default value below is temporary and for testing
  const [loans, setLoans] = useState<loanType[]>([
    {
      name: 'Loan 1',
      id: 0,
      data: {
        carPrice: 15000,
        termMonths: 60,
        interestRate: 5,
        downPayment: 1000,
        salesTax: 6.25,
        otherFees: 2200,
        otherFeesIncluded: true
      }
    },
    {
      name: 'Loan 2',
      id: 1,
      data: {
        carPrice: 12000,
        termMonths: 60,
        interestRate: 6,
        downPayment: 1000,
        salesTax: 6.25,
        otherFees: 2200,
        otherFeesIncluded: true
      }
    },
    {
      name: 'Loan 3',
      id: 2,
      data: {
        carPrice: 10000,
        termMonths: 60,
        interestRate: 5,
        downPayment: 1000,
        salesTax: 6.25,
        otherFees: 2200,
        otherFeesIncluded: true
      }
    }
  ]);

  const addNewCard = () => {
    const newCards = [...loans];
    newCards.push({ name: `Loan ${loans.length + 1}`, id: Date.now() + Math.random() });

    setLoans(newCards);
  };

  const deleteCard = (id: number) => {
    console.log('DELETE loans', [...loans]);
    console.log('id', id);
    const cardPosition = loans.findIndex(card => card.id === id);
    console.log('cardposition', cardPosition);
    const newCards = [...loans];
    newCards.splice(cardPosition, 1);
    console.log(newCards);
    setLoans(newCards);
  };

  const updateLoanCard = (id: number, data: autoLoanForm) => {
    console.log('UPDATE loans', [...loans]);
    console.log('id', id);
    const cardPosition = loans.findIndex(card => card.id === id);
    const newCard = loans[cardPosition];
    newCard.data = data;
    let newCards = [...loans];
    newCards.splice(cardPosition, 1, newCard);
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
              return <LoanDisplay cardInfo={loan} deleteLoanCard={deleteCard} updateLoanCard={updateLoanCard} key={loan.id}></LoanDisplay>;
            })}
        </div>
      </div>
    </>
  );
};

export default App;
