import { Suspense } from 'react';

import { ProfileContent } from '@/components/features/profile';
import { Spinner } from '@/components/ui/primitives';

export default function ProfilePage() {
	return (
		<div className="container mx-auto py-8">
			<Suspense fallback={<Spinner />}>
				<ProfileContent />
			</Suspense>
		</div>
	);
}
