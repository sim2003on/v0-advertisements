import { NotFoundContent } from '@/components/features/404';

export default function NotFound() {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="flex flex-col items-center gap-10 px-4 md:flex-row">
				<video
					width={250}
					height={250}
					autoPlay
					loop
					muted
					playsInline
					preload="metadata"
					className="max-w-full object-cover"
				>
					<source src="/videos/not-found.webm" type="video/webm" />
				</video>
				<NotFoundContent />
			</div>
		</div>
	);
}
