import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export const FooterSocials = () => {
	return (
		<div className="flex items-center justify-center gap-6 md:justify-start md:gap-4">
			<Link href="/" aria-label="Facebook">
				<FaFacebook className="text-primary" size={24} />
			</Link>
			<Link href="/" aria-label="Twitter">
				<FaTwitter className="text-primary" size={24} />
			</Link>
			<Link href="/" aria-label="Instagram">
				<FaInstagram className="text-primary" size={24} />
			</Link>
		</div>
	);
};
