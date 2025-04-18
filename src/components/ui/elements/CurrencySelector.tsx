'use client';

import { useState } from 'react';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/primitives';

const currencies = [
	{ code: 'USD', symbol: '$' },
	{ code: 'EUR', symbol: '€' },
	{ code: 'RUB', symbol: '₽' },
	{ code: 'AMD', symbol: '֏' }
];

interface CurrencySelectorProps {
	onChange?: (currency: string) => void;
	className?: string;
}

export const CurrencySelector = ({
	onChange,
	className
}: CurrencySelectorProps) => {
	const [selectedCurrency, setSelectedCurrency] = useState(currencies[0].code);

	const handleCurrencyChange = (value: string) => {
		setSelectedCurrency(value);
		onChange?.(value);
	};

	return (
		<div className={className}>
			<label className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
				Currency
			</label>
			<Select value={selectedCurrency} onValueChange={handleCurrencyChange}>
				<SelectTrigger className="mt-2">
					<SelectValue placeholder="Select currency" />
				</SelectTrigger>
				<SelectContent>
					{currencies.map(currency => (
						<SelectItem key={currency.code} value={currency.code}>
							{currency.code} ({currency.symbol})
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};
