export const COOKIE_NAME = 'language';
export const languages = ['en', 'hy', 'ru'] as const;
export const defaultLanguage: Language = 'hy';

export type Language = (typeof languages)[number];
