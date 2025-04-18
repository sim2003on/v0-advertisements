'use client';

import React from 'react';

import { Input, Slider } from '@/components/ui/primitives';

import { cn } from '@/utils/tw-merge';

interface PriceSliderProps {
	min: number;
	max: number;
	step?: number;
	onChange?: (values: [number, number]) => void;
	className?: string;
}

export function PriceSlider({
	min,
	max,
	step = 1,
	onChange,
	className
}: PriceSliderProps) {
	const [values, setValues] = React.useState<[number, number]>([min, max]);

	const clamp = React.useCallback(
		(value: number, minVal: number, maxVal: number) => {
			return Math.max(minVal, Math.min(maxVal, value));
		},
		[]
	);

	const updateValues = React.useCallback(
		(newValues: [number, number]) => {
			const [newMin, newMax] = newValues;
			const validatedValues: [number, number] = [
				clamp(newMin, min, newMax),
				clamp(newMax, newMin, max)
			];
			setValues(validatedValues);
			onChange?.(validatedValues);
		},
		[min, max, onChange, clamp]
	);

	const handleSliderChange = React.useCallback(
		(newValues: number[]) => {
			updateValues(newValues as [number, number]);
		},
		[updateValues]
	);

	const handleInputChange = React.useCallback(
		(index: 0 | 1) => (e: React.ChangeEvent<HTMLInputElement>) => {
			const rawValue = e.target.value;
			const numericValue =
				rawValue === '' ? (index === 0 ? min : max) : Number(rawValue);
			if (isNaN(numericValue)) return;

			const newValues = [...values] as [number, number];
			newValues[index] = numericValue;
			updateValues(newValues);
		},
		[min, max, values, updateValues]
	);

	return (
		<div className={cn('space-y-4', className)}>
			<label className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
				Price Range
			</label>
			<Slider
				min={min}
				max={max}
				step={step}
				minStepsBetweenThumbs={1}
				value={values}
				onValueChange={handleSliderChange}
				className="my-2"
			/>
			<div className="flex justify-between gap-2">
				<div className="flex-1">
					<label htmlFor="min-price" className="sr-only">
						Minimum Price
					</label>
					<Input
						id="min-price"
						type="number"
						value={values[0]}
						onChange={handleInputChange(0)}
						min={min}
						max={values[1]}
						className="text-md w-full"
						placeholder={min.toString()}
					/>
				</div>
				<span className="self-center text-muted-foreground">—</span>
				<div className="flex-1">
					<label htmlFor="max-price" className="sr-only">
						Maximum Price
					</label>
					<Input
						id="max-price"
						type="number"
						value={values[1]}
						onChange={handleInputChange(1)}
						min={values[0]}
						max={max}
						className="text-md w-full"
						placeholder={max.toString()}
					/>
				</div>
			</div>
		</div>
	);
}
