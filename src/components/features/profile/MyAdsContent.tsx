import { useTranslations } from 'next-intl';

export function MyAdsContent() {
	const t = useTranslations('profilePage');
	return <p className="text-muted-foreground">{t('tabs.myAdsPlaceholder')}</p>;
}
