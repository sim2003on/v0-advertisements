'use client';

import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
	return (
		<Link href="/" className="transition-opacity hover:opacity-75">
			<Image
				src="/images/nextjs.svg"
				alt="AdSpot Logo"
				width={50}
				height={50}
				priority={true}
			/>
		</Link>
	);
};
