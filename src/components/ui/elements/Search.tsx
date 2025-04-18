'use client';

import { SearchIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type ChangeEvent, type FormEvent, useState } from 'react';

import { Button, Input } from '@/components/ui/primitives';

export const Search = () => {
	const [searchTerm, setSearchTerm] = useState<string>('');

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	const t = useTranslations('search');

	return (
		<div className="ml-auto md:ml-0">
			<form className="relative flex items-center" onSubmit={onSubmit}>
				<Input
					placeholder={t('placeholder')}
					type="text"
					value={searchTerm}
					onChange={handleInputChange}
					className="w-full pl-10 pr-4 lg:w-[400px]"
				/>
				<Button className="absolute left-0 bg-transparent" type="submit">
					<SearchIcon size={18} className="absolute text-primary" />
				</Button>
			</form>
		</div>
	);
};
