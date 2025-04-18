import { Container } from '@/components/layout';
import { Stories } from '@/components/ui/elements';
import { AdCardGroupWrapper } from '@/components/ui/elements/AdCardGroupWrapper';

export default function Home() {
	return (
		<Container className="flex flex-col gap-5">
			<section>
				<Stories />
			</section>
			<section>
				<AdCardGroupWrapper categoryId={1} />
			</section>
			<section>
				<AdCardGroupWrapper categoryId={2} />
			</section>
			<section>
				<AdCardGroupWrapper categoryId={4} />
			</section>
			<section>
				<AdCardGroupWrapper categoryId={5} />
			</section>
		</Container>
	);
}
