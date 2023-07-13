import { useState } from 'react';
import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import './LoanForm.scss';

export interface autoLoanForm {
	carPrice: number;
	termMonths: number;
	interestRate: number;
	downPayment: number;
	salesTax: number;
	otherFees: number;
	otherFeesIncluded: boolean;
}

type LoanFormProps = {
	handleFormSubmit: CallableFunction;
};

const LoanForm = ({ handleFormSubmit }: LoanFormProps) => {
	const {
		control,
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<autoLoanForm>({
		defaultValues: {
			carPrice: 10000,
			termMonths: 60,
			interestRate: 5,
			downPayment: 1000,
			salesTax: 6.25,
			otherFees: 2200,
			otherFeesIncluded: false
		}
	});
	const onSubmit: SubmitHandler<autoLoanForm> = data => handleFormSubmit(data);
	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="loan-form__field">
					<div className="loan-form__labelled-input">
						<span className="loan-form__input-label">Car Price:</span>

						<kor-input
							class="loan-form__input"
							type="number"
							step={1000}
							min={0}
							max={999000}
							{...register('carPrice', { required: true, valueAsNumber: true })}
							no-clear
						/>
					</div>
					{errors.carPrice && <span className="loan-form__error-message">This field is required</span>}
				</div>

				<div className="loan-form__field">
					<div className="loan-form__labelled-input">
						<span className="loan-form__input-label">Term (Months):</span>

						<kor-input
							class="loan-form__input"
							type="number"
							step={12}
							min={12}
							max={120}
							{...register('termMonths', { required: true, valueAsNumber: true })}
							no-clear
						/>
					</div>
					{errors.termMonths && <span className="loan-form__error-message">This field is required</span>}
				</div>

				<div className="loan-form__field">
					<div className="loan-form__labelled-input">
						<span className="loan-form__input-label">Interest Rate:</span>

						<kor-input
							class="loan-form__input"
							type="number"
							min={0}
							max={100}
							{...register('interestRate', { required: true, valueAsNumber: true })}
							no-clear
						/>
					</div>
					{errors.interestRate && <span className="loan-form__error-message">This field is required</span>}
				</div>

				<div className="loan-form__field">
					<div className="loan-form__labelled-input">
						<span className="loan-form__input-label">Down Payment:</span>

						<kor-input
							class="loan-form__input"
							type="number"
							step={1000}
							min={0}
							max={999000}
							{...register('downPayment', { required: true, valueAsNumber: true })}
							no-clear
						/>
					</div>
					{errors.downPayment && <span className="loan-form__error-message">This field is required</span>}
				</div>

				<div className="loan-form__field">
					<div className="loan-form__labelled-input">
						<span className="loan-form__input-label">Sales Tax:</span>

						<kor-input class="loan-form__input" type="number" min={0} max={100} {...register('salesTax', { required: true, valueAsNumber: true })} no-clear />
					</div>
					{errors.salesTax && <span className="loan-form__error-message">This field is required</span>}
				</div>

				<div className="loan-form__field">
					<div className="loan-form__labelled-input">
						<span className="loan-form__input-label">
							Tile, Registration, <br /> and Other Fees:
						</span>

						<kor-input class="loan-form__input" type="number" step="100" min={0} max={999000} {...register('otherFees', { valueAsNumber: true })} no-clear />
					</div>
				</div>

				<div className="loan-form__field">
					<div className="loan-form__checkbox">
						<Controller
							name="otherFeesIncluded"
							control={control}
							render={({ field: props }) => (
								<kor-checkbox
									label="Include All Fees in Loan"
									{...props}
									onChange={e => console.log(' change', e)}
									onClick={e => props.onChange(e.target.active)}
								></kor-checkbox>
							)}
						/>
					</div>
				</div>

				<div className="loan-form__submit">
					<kor-button onClick={handleSubmit(data => handleFormSubmit(data))} class="loan-form__submit-button">
						Submit
					</kor-button>
				</div>
			</form>
		</div>
	);
};

export default LoanForm;
