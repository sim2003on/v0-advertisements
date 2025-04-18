import { getTranslations } from 'next-intl/server';

export const FooterCopyright = async () => {
	const t = await getTranslations('footer');
	return (
		<div className="text-center">
			<p className="text-sm tracking-wide text-slate-600 sm:text-[12px] md:text-sm">
				{t('copyright')}
			</p>
		</div>
	);
};
