'use client';

import {
	ChevronLeft,
	ChevronRight,
	Heart,
	Home,
	Phone,
	Plus
} from 'lucide-react';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

import {
	Avatar,
	AvatarFallback,
	Button,
	Card,
	CardContent,
	Separator,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from '@/components/ui/primitives';

import { cn } from '@/utils/tw-merge';

// Car images array for the slider
const carImages = [
	'/images/test/1.jpg',
	'/images/test/2.jpg',
	'/images/test/3.jpg',
	'/images/test/4.jpg'
];

// Car details data
const carDetails = {
	make: 'Toyota',
	model: 'Cruizer',
	bodyType: 'Jeep',
	year: '2011',
	engineType: 'Gasoline',
	engineSize: '4.0 L',
	transmission: 'Automatic',
	driveType: '4WD'
};

const additionalInfo = {
	mileage: '103,000 km',
	condition: 'Car is not damaged',
	steeringWheel: 'Left',
	clearedCustoms: 'Yes'
};

const exteriorDetails = {
	color: 'Black',
	wheelSize: 'R20',
	headlights: 'LED Headlights'
};

const interiorDetails = {
	interiorColor: 'Black',
	interiorMaterial: 'Leather',
	sunroof: 'Panoramic Sunroof',
	comfort:
		'Air conditioner, heated seats, heated steering wheel, ventilated seats, cruise control, tinted windows'
};

const priceHistory = [
	{ date: 'March 24, 2025', price: '$38,500', change: '-$1,000' },
	{ date: 'February 28, 2025', price: '$39,500', change: '' }
];

export default function AdvertisementPage() {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isHovering, setIsHovering] = useState(false);
	const [startX, setStartX] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const sliderRef = useRef<HTMLDivElement>(null);

	// Function to go to the next image
	const nextImage = () => {
		setCurrentImageIndex(prevIndex => (prevIndex + 1) % carImages.length);
	};

	// Function to go to the previous image
	const prevImage = () => {
		setCurrentImageIndex(
			prevIndex => (prevIndex - 1 + carImages.length) % carImages.length
		);
	};

	// Function to handle mouse down event for dragging
	const handleMouseDown = (e: React.MouseEvent) => {
		setIsDragging(true);
		setStartX(e.clientX);
	};

	// Function to handle mouse move event for dragging
	const handleMouseMove = (e: React.MouseEvent) => {
		if (!isDragging) return;

		const deltaX = e.clientX - startX;
		if (deltaX > 50) {
			prevImage();
			setIsDragging(false);
		} else if (deltaX < -50) {
			nextImage();
			setIsDragging(false);
		}
	};

	// Function to handle mouse up event for dragging
	const handleMouseUp = () => {
		setIsDragging(false);
	};

	// Function to handle mouse leave event for dragging
	const handleMouseLeave = () => {
		setIsDragging(false);
		setIsHovering(false);
	};

	// Function to handle touch start event for dragging
	const handleTouchStart = (e: React.TouchEvent) => {
		setIsDragging(true);
		setStartX(e.touches[0].clientX);
	};

	// Function to handle touch move event for dragging
	const handleTouchMove = (e: React.TouchEvent) => {
		if (!isDragging) return;

		const deltaX = e.touches[0].clientX - startX;
		if (deltaX > 50) {
			prevImage();
			setIsDragging(false);
		} else if (deltaX < -50) {
			nextImage();
			setIsDragging(false);
		}
	};

	// Function to handle touch end event for dragging
	const handleTouchEnd = () => {
		setIsDragging(false);
	};

	return (
		<div className="mx-auto max-w-7xl px-4 py-6">
			{/* Breadcrumb */}
			<div className="mb-4 flex items-center gap-2 overflow-x-auto pb-2 text-sm text-muted-foreground">
				<span>Home</span>
				<span>/</span>
				<span>Vehicles</span>
				<span>/</span>
				<span>Passenger Cars</span>
				<span>/</span>
				<span>Toyota</span>
				<span>/</span>
				<span>Cruizer</span>
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
				{/* Left column - Car images and details */}
				<div className="space-y-6 md:col-span-2">
					{/* Main car image slider */}
					<div
						className="group relative overflow-hidden rounded-lg border"
						onMouseEnter={() => setIsHovering(true)}
						onMouseLeave={handleMouseLeave}
						onMouseDown={handleMouseDown}
						onMouseMove={handleMouseMove}
						onMouseUp={handleMouseUp}
						onTouchStart={handleTouchStart}
						onTouchMove={handleTouchMove}
						onTouchEnd={handleTouchEnd}
						ref={sliderRef}
					>
						<div
							className="flex cursor-grab transition-transform duration-300 ease-in-out active:cursor-grabbing"
							style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
						>
							{carImages.map((image, index) => (
								<div key={index} className="min-w-full">
									<Image
										src={image || '/placeholder.svg'}
										alt={`2011 Toyota Cruizer image ${index + 1}`}
										width={800}
										height={500}
										className="h-[400px] w-full object-cover"
									/>
								</div>
							))}
						</div>

						{/* Navigation arrows - visible on hover */}
						<div
							className={cn(
								'absolute inset-0 flex items-center justify-between px-4 transition-opacity duration-200',
								isHovering ? 'opacity-100' : 'opacity-0'
							)}
						>
							<Button
								variant="secondary"
								size="icon"
								className="rounded-full bg-white/80 shadow-md hover:bg-white"
								onClick={prevImage}
							>
								<ChevronLeft className="h-6 w-6" />
							</Button>
							<Button
								variant="secondary"
								size="icon"
								className="rounded-full bg-white/80 shadow-md hover:bg-white"
								onClick={nextImage}
							>
								<ChevronRight className="h-6 w-6" />
							</Button>
						</div>

						{/* Dots indicator */}
						<div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
							{carImages.map((_, index) => (
								<button
									key={index}
									className={`h-2 w-2 rounded-full transition-all ${
										index === currentImageIndex ? 'w-4 bg-white' : 'bg-white/50'
									}`}
									onClick={() => setCurrentImageIndex(index)}
								/>
							))}
						</div>
					</div>

					{/* Location */}
					<div className="flex items-center gap-2 text-sm">
						<div className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1.5">
							<svg
								className="h-4 w-4 text-primary"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
									fill="currentColor"
								/>
								<path
									d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							<span>Moscow • Severnoe Butovo</span>
						</div>
					</div>

					{/* Car Details Tabs */}
					<div>
						<Tabs defaultValue="details" className="w-full">
							<TabsList className="mb-4 grid grid-cols-5">
								<TabsTrigger value="details">Details</TabsTrigger>
								<TabsTrigger value="additional">Additional</TabsTrigger>
								<TabsTrigger value="exterior">Exterior</TabsTrigger>
								<TabsTrigger value="interior">Interior</TabsTrigger>
								<TabsTrigger value="price">Price History</TabsTrigger>
							</TabsList>

							<TabsContent value="details" className="space-y-4">
								<h2 className="text-lg font-semibold">Car Details</h2>
								<Card>
									<CardContent className="p-4">
										<div className="grid grid-cols-2 gap-y-3">
											{Object.entries(carDetails).map(([key, value]) => (
												<React.Fragment key={key}>
													<div className="capitalize text-muted-foreground">
														{key.replace(/([A-Z])/g, ' $1').trim()}
													</div>
													<div>{value}</div>
												</React.Fragment>
											))}
										</div>
									</CardContent>
								</Card>
							</TabsContent>

							<TabsContent value="additional" className="space-y-4">
								<h2 className="text-lg font-semibold">
									Additional Information
								</h2>
								<Card>
									<CardContent className="p-4">
										<div className="grid grid-cols-2 gap-y-3">
											{Object.entries(additionalInfo).map(([key, value]) => (
												<React.Fragment key={key}>
													<div className="capitalize text-muted-foreground">
														{key.replace(/([A-Z])/g, ' $1').trim()}
													</div>
													<div>{value}</div>
												</React.Fragment>
											))}
										</div>
									</CardContent>
								</Card>
							</TabsContent>

							<TabsContent value="exterior" className="space-y-4">
								<h2 className="text-lg font-semibold">Exterior</h2>
								<Card>
									<CardContent className="p-4">
										<div className="grid grid-cols-2 gap-y-3">
											{Object.entries(exteriorDetails).map(([key, value]) => (
												<React.Fragment key={key}>
													<div className="capitalize text-muted-foreground">
														{key.replace(/([A-Z])/g, ' $1').trim()}
													</div>
													<div>{value}</div>
												</React.Fragment>
											))}
										</div>
									</CardContent>
								</Card>
							</TabsContent>

							<TabsContent value="interior" className="space-y-4">
								<h2 className="text-lg font-semibold">Interior</h2>
								<Card>
									<CardContent className="p-4">
										<div className="grid grid-cols-2 gap-y-3">
											{Object.entries(interiorDetails).map(([key, value]) => (
												<React.Fragment key={key}>
													<div className="capitalize text-muted-foreground">
														{key.replace(/([A-Z])/g, ' $1').trim()}
													</div>
													<div>{value}</div>
												</React.Fragment>
											))}
										</div>
									</CardContent>
								</Card>
							</TabsContent>

							<TabsContent value="price" className="space-y-4">
								<h2 className="text-lg font-semibold">Price History</h2>
								<Card>
									<CardContent className="p-4">
										<div className="grid grid-cols-2 gap-y-3">
											{priceHistory.map((item, index) => (
												<React.Fragment key={index}>
													<div className="text-muted-foreground">
														{item.date}
													</div>
													<div className="flex items-center gap-2">
														{item.price}
														{item.change && (
															<span className="flex items-center text-sm text-green-500">
																{item.change}
																<svg
																	className="h-4 w-4"
																	viewBox="0 0 24 24"
																	fill="none"
																	xmlns="http://www.w3.org/2000/svg"
																>
																	<path
																		d="M12 5L12 19M12 19L19 12M12 19L5 12"
																		stroke="currentColor"
																		strokeWidth="2"
																		strokeLinecap="round"
																		strokeLinejoin="round"
																	/>
																</svg>
															</span>
														)}
													</div>
												</React.Fragment>
											))}
										</div>
									</CardContent>
								</Card>
							</TabsContent>
						</Tabs>
					</div>

					{/* Description */}
					<div>
						<Card>
							<CardContent className="space-y-4 p-4">
								<h2 className="text-lg font-semibold">Description</h2>
								<p className="text-sm">
									The car is in perfect condition, complete with all the
									equipment, vacuum doors, 360 camera, projection, parking,
									etc., has two keys. Will exchange for an apartment
								</p>
								<p className="text-xs text-muted-foreground">
									Translated from Armenian
								</p>
								<Separator className="my-2" />
								<div className="text-xs text-muted-foreground">
									Ad ID 22169046 • Posted 28.02.2025 • Renewed 14.04.2025, 11:28
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Right column - Price, seller info, and recommended ads */}
				<div className="space-y-6">
					{/* Main car info */}
					<div>
						<Card>
							<CardContent className="space-y-4 p-4">
								<div className="flex items-center justify-between">
									<h1 className="text-xl font-semibold">
										2011 Toyota Cruizer, 4.4L
									</h1>
									<Button
										variant="ghost"
										size="icon"
										className="text-gray-400 hover:text-red-500"
									>
										<Heart className="h-6 w-6" />
									</Button>
								</div>

								<div className="flex items-center">
									<span className="text-2xl font-bold">$38,500</span>
									<svg
										className="ml-1 h-5 w-5"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M19 9L12 16L5 9"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</div>

								{/* Seller info */}
								<div className="mt-4 flex items-center gap-3">
									<Avatar className="h-12 w-12 bg-red-500 text-white">
										<AvatarFallback>V</AvatarFallback>
									</Avatar>
									<div>
										<div className="font-medium">Valeriy</div>
										<div className="text-sm text-muted-foreground">
											Գրանցված է 16.04.2025 - ից
										</div>
									</div>
								</div>

								{/* Action buttons */}
								<div className="text-center">
									<Button className="w-full bg-green-500 hover:bg-green-600">
										<Phone className="mr-2 h-4 w-4" />
										Call
									</Button>
								</div>

								{/* Action icons */}
								<div className="mt-4 flex items-center justify-between">
									<div className="flex cursor-pointer flex-col items-center justify-center rounded-md bg-gray-100 p-3 transition-colors hover:bg-gray-200">
										<div className="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-500">
											<Plus className="h-5 w-5" />
										</div>
										<span className="text-xs">Добавить в топ</span>
									</div>
									<div className="flex cursor-pointer flex-col items-center justify-center rounded-md bg-gray-100 p-3 transition-colors hover:bg-gray-200">
										<div className="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-primary">
											<Home className="h-5 w-5" />
										</div>
										<span className="text-xs">На главную</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
