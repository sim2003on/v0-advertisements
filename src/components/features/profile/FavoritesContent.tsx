import { useTranslations } from 'next-intl';

export function FavoritesContent() {
	const t = useTranslations('profilePage');
	return (
		<p className="text-muted-foreground">{t('tabs.favoritesPlaceholder')}</p>
	);
}
