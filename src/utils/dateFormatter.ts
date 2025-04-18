import { format, Locale } from 'date-fns';
import { enUS, hy, ru } from 'date-fns/locale';

interface FormatDateOptions {
	locale?: string;
	format?: string;
}

export const formatDate = (
	date: string | Date,
	options: FormatDateOptions = {}
) => {
	const { locale = 'en', format: dateFormat = 'dd MMMM yyyy' } = options;

	const dateObj = typeof date === 'string' ? new Date(date) : date;

	const localeMap: Record<string, Locale> = {
		ru,
		en: enUS,
		hy
	};

	return format(dateObj, dateFormat, {
		locale: localeMap[locale] || enUS
	});
};
