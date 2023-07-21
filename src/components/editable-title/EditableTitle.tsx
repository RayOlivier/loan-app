import React from 'react';
import { useState } from 'react';
import './EditableTitle.scss';

type LoanDataProps = {
	title: string;
};

const LoanData = ({ title }: LoanDataProps) => {
	const resetTitle = () => {};

	return (
		<div>
			<h2>{title}</h2>
		</div>
	);
};

export default LoanData;
