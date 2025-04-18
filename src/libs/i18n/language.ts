'use server';

import { cookies } from 'next/headers';

import { COOKIE_NAME, type Language, defaultLanguage } from './config';

export const getCurrentLanguage = async () => {
	const cookiesStore = await cookies();

	const language = cookiesStore.get(COOKIE_NAME)?.value ?? defaultLanguage;

	return language;
};

export const setLanguage = async (language: Language) => {
	const cookiesStore = await cookies();

	cookiesStore.set(COOKIE_NAME, language);

	return { success: true };
};
