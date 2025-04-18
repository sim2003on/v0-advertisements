import { Container } from '../Container';

import { FooterCopyright } from './FooterCopyright';
import { FooterNav } from './FooterNav';
import { FooterSocials } from './FooterSocials';

export const Footer = () => {
	return (
		<footer className="bg-secondary-bg border-t">
			<Container>
				<div className="flex flex-col gap-6 py-8 md:grid md:grid-cols-3 md:items-center md:gap-4 md:py-5">
					<FooterSocials />
					<FooterCopyright />
					<FooterNav />
				</div>
			</Container>
		</footer>
	);
};
