import { useState } from 'react';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './LoanForm.scss';

export interface autoLoanForm {
	carPrice: number;
	termMonths: number;
	interestRate: number;
	downPayment: number;
	salesTax: number;
	otherFees: number;
	// includeOtherFees: boolean;
}

type LoanFormProps = {
	handleFormSubmit: CallableFunction;
};

const LoanForm = ({ handleFormSubmit }: LoanFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<autoLoanForm>();
	const onSubmit: SubmitHandler<autoLoanForm> = data => handleFormSubmit(data);
	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="loan-form__field">
					<span>Car Price:</span>
					<input type="number" defaultValue="10000" step={1000} min={0} {...register('carPrice', { required: true, valueAsNumber: true })} />
					{errors.carPrice && <span>This field is required</span>}
				</div>

				<div className="loan-form__field">
					<span>Term (Months):</span>
					<input type="number" defaultValue="60" step={12} min={12} max={120} {...register('termMonths', { required: true, valueAsNumber: true })} />
					{errors.termMonths && <span>This field is required</span>}
				</div>

				<div className="loan-form__field">
					<span>Interest Rate:</span>
					<input type="number" defaultValue="10" step={0.25} min={0} {...register('interestRate', { required: true, valueAsNumber: true })} />
					{errors.interestRate && <span>This field is required</span>}
				</div>

				<div className="loan-form__field">
					<span>Down Payment:</span>
					<input type="number" defaultValue="0" step={1000} min={0} {...register('downPayment', { required: true, valueAsNumber: true })} />
					{errors.downPayment && <span>This field is required</span>}
				</div>

				<div className="loan-form__field">
					<span>Sales Tax:</span>
					<input type="number" step={0.25} min={0} defaultValue="6.25" {...register('salesTax', { required: true, valueAsNumber: true })} />
					{errors.salesTax && <span>This field is required</span>}
				</div>

				<div className="loan-form__field">
					<span>Tile, registration, and other fees:</span>
					<input type="number" defaultValue="2200" min={0} {...register('otherFees', { valueAsNumber: true })} />
				</div>

				<input type="submit" />
			</form>
		</div>
	);
};

export default LoanForm;
