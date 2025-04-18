'use client';

import { useState } from 'react';

import { CurrencySelector } from './CurrencySelector';
import { LocationSelector } from './LocationSelector';
import { PriceSlider } from './PriceSlider';
import { Title } from './Title';

const priceRanges = {
	USD: { min: 0, max: 10000, step: 10 },
	EUR: { min: 0, max: 9000, step: 10 },
	RUB: { min: 0, max: 900000, step: 1000 },
	AMD: { min: 0, max: 400000000, step: 10000 }
};

export const Filters = () => {
	const [selectedCurrency, setSelectedCurrency] = useState('USD');
	const currentRange =
		priceRanges[selectedCurrency as keyof typeof priceRanges];

	return (
		<div className="scrollbar-hidden flex min-h-[800px] w-full max-w-[200px] flex-shrink-0 flex-col gap-10">
			<Title className="select-none" size="sm" text="Filters" />
			<LocationSelector />
			<CurrencySelector onChange={setSelectedCurrency} />
			<PriceSlider
				min={currentRange.min}
				max={currentRange.max}
				step={currentRange.step}
			/>
		</div>
	);
};
