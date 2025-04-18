'use client';

import { motion } from 'framer-motion';
import {
	Bike,
	Briefcase,
	Building,
	Car,
	Home,
	Shirt,
	ShoppingBag,
	Smartphone,
	Sofa,
	Tv,
	Utensils,
	Wrench
} from 'lucide-react';

import { CategoryCard } from './CategoryCard';

const categories = [
	{
		id: 1,
		name_en: 'Cars',
		name_ru: 'Автомобили',
		name_hy: 'Ավտոմեքենաներ',
		icon: Car,
		count: 1245,
		color: 'bg-green-50 dark:bg-green-950',
		iconColor: 'text-green-500'
	},
	{
		id: 2,
		name_en: 'Electronics',
		name_ru: 'Электроника',
		name_hy: 'Էլեկտրոնիկա',
		icon: Tv,
		count: 873,
		color: 'bg-green-50 dark:bg-green-950',
		iconColor: 'text-green-500'
	},
	{
		id: 3,
		name_en: 'Apartments',
		name_ru: 'Квартиры',
		name_hy: 'Բնակարաններ',
		icon: Building,
		count: 562,
		color: 'bg-green-50 dark:bg-green-950',
		iconColor: 'text-green-500'
	},
	{
		id: 4,
		name_en: 'Rental Apartments',
		name_ru: 'Аренда квартир',
		name_hy: 'Վարձով բնակարաններ',
		icon: Home,
		count: 421,
		color: 'bg-green-50 dark:bg-green-950',
		iconColor: 'text-green-500'
	},
	{
		id: 5,
		name_en: 'Shopping',
		name_ru: 'Покупки',
		name_hy: 'Գնումներ',
		icon: ShoppingBag,
		count: 1893,
		color: 'bg-green-50 dark:bg-green-950',
		iconColor: 'text-green-500'
	},
	{
		id: 6,
		name_en: 'Jobs',
		name_ru: 'Работа',
		name_hy: 'Աշխատանք',
		icon: Briefcase,
		count: 734,
		color: 'bg-green-50 dark:bg-green-950',
		iconColor: 'text-green-500'
	},
	{
		id: 7,
		name_en: 'Mobile Phones',
		name_ru: 'Мобильные телефоны',
		name_hy: 'Բջջային հեռախոսներ',
		icon: Smartphone,
		count: 932,
		color: 'bg-green-50 dark:bg-green-950',
		iconColor: 'text-green-500'
	},
	{
		id: 8,
		name_en: 'Furniture',
		name_ru: 'Мебель',
		name_hy: 'Կահույք',
		icon: Sofa,
		count: 538,
		color: 'bg-green-50 dark:bg-green-950',
		iconColor: 'text-green-500'
	},
	{
		id: 9,
		name_en: 'Bicycles',
		name_ru: 'Велосипеды',
		name_hy: 'Հեծանիվներ',
		icon: Bike,
		count: 284,
		color: 'bg-green-50 dark:bg-green-950',
		iconColor: 'text-green-500'
	},
	{
		id: 10,
		name_en: 'Clothing',
		name_ru: 'Одежда',
		name_hy: 'Հագուստ',
		icon: Shirt,
		count: 1456,
		color: 'bg-green-50 dark:bg-green-950',
		iconColor: 'text-green-500'
	},
	{
		id: 11,
		name_en: 'Restaurants',
		name_ru: 'Рестораны',
		name_hy: 'Ռեստորաններ',
		icon: Utensils,
		count: 327,
		color: 'bg-green-50 dark:bg-green-950',
		iconColor: 'text-green-500'
	},
	{
		id: 12,
		name_en: 'Services',
		name_ru: 'Услуги',
		name_hy: 'Ծառայություններ',
		icon: Wrench,
		count: 892,
		color: 'bg-green-50 dark:bg-green-950',
		iconColor: 'text-green-500'
	}
];

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.05
		}
	}
};

export const CategoryList = () => {
	return (
		<motion.div
			className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			viewport={{ once: true }}
		>
			{categories.map((category, index) => (
				<CategoryCard key={category.id} category={category} index={index} />
			))}
		</motion.div>
	);
};
