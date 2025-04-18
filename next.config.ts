import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/libs/i18n/request.ts');

const nextConfig: NextConfig = {
	/* config options here */
	poweredByHeader: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'www.bigfootdigital.co.uk',
			},
			{
				protocol: 'https',
				hostname: 'gratisography.com',
			},
			{
				protocol: 'https',
				hostname: 'buyandsellimages.s3.eu-north-1.amazonaws.com'
			}
		]
	}
};

export default withNextIntl(nextConfig);
