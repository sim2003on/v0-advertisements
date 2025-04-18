import { Container, Header } from '@/components/layout';

export default function AddLayout({
	children
}: {
	children: React.PropsWithChildren<React.ReactNode>;
}) {
	return (
		<>
			<Header isProfilePage />
			<Container>{children}</Container>
		</>
	);
}
