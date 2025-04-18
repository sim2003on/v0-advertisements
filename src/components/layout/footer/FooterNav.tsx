import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export const FooterNav = async () => {
	const t = await getTranslations('footer');
	return (
		<nav>
			<ul className="flex flex-wrap items-center justify-center gap-4 md:justify-end">
				<li>
					<Link
						className="text-sm tracking-wide text-primary sm:text-[12px] md:text-sm"
						href="/"
					>
						{t('links.help')}
					</Link>
				</li>
				<li>
					<Link
						className="text-sm tracking-wide text-primary sm:text-[12px] md:text-sm"
						href="/"
					>
						{t('links.contact')}
					</Link>
				</li>
				<li>
					<Link
						className="text-sm tracking-wide text-primary sm:text-[12px] md:text-sm"
						href="/"
					>
						{t('links.term')}
					</Link>
				</li>
			</ul>
		</nav>
	);
};
