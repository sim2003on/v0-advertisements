'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SelectValue } from '@radix-ui/react-select';
import { Globe } from 'lucide-react';
import { useLocale } from 'next-intl';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { setLanguage } from '@/libs/i18n/language';

import {
	TypeChangeLanguageSchema,
	changeLanguageSchema
} from '@/schemas/user/change-language.schema';

import {
	Form,
	FormField,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger
} from '../primitives';

const languages = {
	hy: 'Հայերեն',
	en: 'English',
	ru: 'Русский'
};

export const LanguageSelector = () => {
	const [isPending, startTransition] = React.useTransition();
	const locale = useLocale();

	const form = useForm({
		resolver: zodResolver(changeLanguageSchema),
		values: {
			language: locale as TypeChangeLanguageSchema['language']
		}
	});

	const onSubmit = (data: TypeChangeLanguageSchema) => {
		startTransition(async () => {
			try {
				await setLanguage(data.language);
				toast.success('Language changed successfully!');
			} catch {
				toast.error('Error during language change');
			}
		});
	};
	return (
		<div className="hidden md:block">
			<Form {...form}>
				<FormField
					control={form.control}
					name="language"
					render={({ field }) => (
						<Select
							onValueChange={value => {
								field.onChange(value);
								form.handleSubmit(onSubmit)();
							}}
							value={field.value}
						>
							<SelectTrigger className="flex items-center gap-2">
								<Globe className="h-4 w-4 text-primary" />
								<SelectValue placeholder="Language" />
								<SelectContent>
									{Object.entries(languages).map(([code, value]) => (
										<SelectItem key={code} value={code}>
											{value}
										</SelectItem>
									))}
								</SelectContent>
							</SelectTrigger>
						</Select>
					)}
				/>
			</Form>
		</div>
	);
};
