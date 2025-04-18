'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import ReactStories from 'react-insta-stories';

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from '@/components/ui/primitives';

interface IStory {
	id: number;
	user: string;
	avatar: string;
	preview: string;
	items: { sourceUrl: string; description: string; type?: 'image' | 'video' }[];
}

const mockStories: IStory[] = [
	{
		id: 1,
		user: 'Алексей',
		avatar: '/images/categories/animals.png',
		preview:
			'https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg',
		items: [
			{
				sourceUrl:
					'https://gratisography.com/wp-content/uploads/2025/01/gratisography-dog-vacation-800x525.jpg',
				description: 'Купите мою машину! Отличное состояние, как новая!',
				type: 'image'
			}
		]
	},
	{
		id: 2,
		user: 'Алексей',
		avatar: '/images/categories/animals.png',
		preview:
			'https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg',
		items: [
			{
				sourceUrl:
					'https://gratisography.com/wp-content/uploads/2025/01/gratisography-dog-vacation-800x525.jpg',
				description: 'Купите мою машину! Отличное состояние, как новая!',
				type: 'image'
			}
		]
	},
	{
		id: 3,
		user: 'Алексей',
		avatar: '/images/categories/animals.png',
		preview:
			'https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg',
		items: [
			{
				sourceUrl:
					'https://gratisography.com/wp-content/uploads/2025/01/gratisography-dog-vacation-800x525.jpg',
				description: 'Купите мою машину! Отличное состояние, как новая!',
				type: 'image'
			}
		]
	},
	{
		id: 4,
		user: 'Алексей',
		avatar: '/images/categories/animals.png',
		preview:
			'https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg',
		items: [
			{
				sourceUrl:
					'https://gratisography.com/wp-content/uploads/2025/01/gratisography-dog-vacation-800x525.jpg',
				description: 'Купите мою машину! Отличное состояние, как новая!',
				type: 'image'
			}
		]
	},
	{
		id: 5,
		user: 'Алексей',
		avatar: '/images/categories/animals.png',
		preview:
			'https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg',
		items: [
			{
				sourceUrl:
					'https://gratisography.com/wp-content/uploads/2025/01/gratisography-dog-vacation-800x525.jpg',
				description: 'Купите мою машину! Отличное состояние, как новая!',
				type: 'image'
			}
		]
	},
	{
		id: 6,
		user: 'Алексей',
		avatar: '/images/categories/animals.png',
		preview:
			'https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg',
		items: [
			{
				sourceUrl:
					'https://gratisography.com/wp-content/uploads/2025/01/gratisography-dog-vacation-800x525.jpg',
				description: 'Купите мою машину! Отличное состояние, как новая!',
				type: 'image'
			}
		]
	},
	{
		id: 7,
		user: 'Алексей',
		avatar: '/images/categories/animals.png',
		preview:
			'https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg',
		items: [
			{
				sourceUrl:
					'https://gratisography.com/wp-content/uploads/2025/01/gratisography-dog-vacation-800x525.jpg',
				description: 'Купите мою машину! Отличное состояние, как новая!',
				type: 'image'
			}
		]
	},
	{
		id: 8,
		user: 'Алексей',
		avatar: '/images/categories/animals.png',
		preview:
			'https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg',
		items: [
			{
				sourceUrl:
					'https://gratisography.com/wp-content/uploads/2025/01/gratisography-dog-vacation-800x525.jpg',
				description: 'Купите мою машину! Отличное состояние, как новая!',
				type: 'image'
			}
		]
	},
	{
		id: 9,
		user: 'Алексей',
		avatar: '/images/categories/animals.png',
		preview:
			'https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg',
		items: [
			{
				sourceUrl:
					'https://gratisography.com/wp-content/uploads/2025/01/gratisography-dog-vacation-800x525.jpg',
				description: 'Купите мою машину! Отличное состояние, как новая!',
				type: 'image'
			}
		]
	},
	{
		id: 10,
		user: 'Алексей',
		avatar: '/images/categories/animals.png',
		preview:
			'https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg',
		items: [
			{
				sourceUrl:
					'https://gratisography.com/wp-content/uploads/2025/01/gratisography-dog-vacation-800x525.jpg',
				description: 'Купите мою машину! Отличное состояние, как новая!',
				type: 'image'
			}
		]
	}
];

export const Stories = () => {
	const [stories, setStories] = React.useState<IStory[]>(mockStories);
	const [open, setOpen] = React.useState<boolean>(false);
	const [currentIndex, setCurrentIndex] = React.useState<number>(0);

	const onClickStory = (story: IStory) => {
		const index = stories.findIndex(s => s.id === story.id);
		setCurrentIndex(index);
		setOpen(true);
	};

	const allStories = stories.map(story => ({
		url: story.items[0].sourceUrl,
		type: story.items[0].type,
		duration: story.items[0].type === 'video' ? 5000 : 3000,
		header: {
			heading: story.user,
			subheading: story.items[0].description,
			profileImage: story.avatar
		}
	}));

	return (
		<div className="mx-auto w-full max-w-5xl rounded-lg px-4 sm:px-6">
			<div className="relative">
				<Carousel
					className="w-full"
					opts={{
						align: 'start',
						slidesToScroll: 1,
						containScroll: 'trimSnaps',
						dragFree: true
					}}
				>
					{/* Кнопки навигации */}
					<div className="absolute -left-4 -right-4 top-1/2 z-30 hidden -translate-y-1/2 transform justify-between sm:flex">
						<CarouselPrevious
							className="rounded-full bg-white/80 p-2 shadow-md backdrop-blur-sm hover:bg-white"
							size="icon"
						/>
						<CarouselNext
							className="rounded-full bg-white/80 p-2 shadow-md backdrop-blur-sm hover:bg-white"
							size="icon"
						/>
					</div>

					<CarouselContent className="-ml-2 flex h-[280px] items-center gap-2 px-4">
						{stories.length === 0
							? [...Array(5)].map((_, index) => (
									<CarouselItem key={index} className="basis-auto">
										<div className="h-[180px] w-[150px] animate-pulse rounded-xl bg-gray-200 sm:h-[220px] sm:w-[150px]" />
									</CarouselItem>
								))
							: stories.map(story => (
									<CarouselItem key={story.id} className="basis-auto">
										<div
											onClick={() => onClickStory(story)}
											className="relative h-[180px] w-[150px] cursor-pointer overflow-hidden rounded-xl border border-gray-300 shadow-md transition-transform duration-300 ease-in-out hover:scale-105 sm:h-[220px] sm:w-[150px]"
											style={{
												transformOrigin: 'center center',
												willChange: 'transform'
											}}
										>
											<Image
												src={story.preview}
												alt={`${story.user}'s story`}
												fill
												sizes="(max-width: 640px) 120px, 150px"
												className="select-none object-cover"
												style={{ transform: 'translateZ(0)' }}
											/>
										</div>
									</CarouselItem>
								))}
					</CarouselContent>
				</Carousel>
			</div>

			{open && (
				<div className="fixed left-0 top-0 z-40 flex h-full w-full items-center justify-center bg-black/80">
					<div className="relative w-full max-w-[520px] px-4 sm:w-[520px]">
						<button
							className="absolute -right-4 -top-10 z-50 sm:-right-10 sm:-top-5"
							onClick={() => setOpen(false)}
						>
							<X className="h-8 w-8 text-white/50" />
						</button>
						<ReactStories
							stories={allStories}
							width="100%"
							height={600}
							currentIndex={currentIndex}
							onAllStoriesEnd={() => setOpen(false)}
							keyboardNavigation
						/>
					</div>
				</div>
			)}
		</div>
	);
};
