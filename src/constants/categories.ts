import { Building2, Car, Cpu } from 'lucide-react';

export type Category = {
	id: string;
	name: {
		en: string;
		ru: string;
		hy: string;
	};
	icon: React.ElementType;
};

export type SubcategorySection = {
	id: number;
	title: {
		en: string;
		ru: string;
		hy: string;
	};
	items: {
		en: string;
		ru: string;
		hy: string;
	}[];
};

export type Subcategories = {
	[key: string]: {
		sections: SubcategorySection[];
	};
};

export const mainCategories: Category[] = [
	{
		id: 'vehicles',
		name: {
			en: 'Vehicles',
			ru: 'Транспорт',
			hy: 'Տրանսպորտ'
		},
		icon: Car
	},
	{
		id: 'real-estate',
		name: {
			en: 'Real Estate',
			ru: 'Недвижимость',
			hy: 'Անշարժ գույք'
		},
		icon: Building2
	},
	{
		id: 'electronics',
		name: {
			en: 'Electronics',
			ru: 'Электроника',
			hy: 'Էլեկտրոնիկա'
		},
		icon: Cpu
	}
];

export const subcategories: Subcategories = {
	vehicles: {
		sections: [
			{
				id: 1,
				title: {
					en: 'Passenger Cars',
					ru: 'Легковые автомобили',
					hy: 'Մարդատար ավտոմեքենաներ'
				},
				items: [
					{
						en: 'Passenger Cars',
						ru: 'Легковые автомобили',
						hy: 'Մարդատար ավտոմեքենաներ'
					},
					{
						en: 'Cars from Auctions',
						ru: 'Автомобили с аукционов',
						hy: 'Ավտոմեքենաներ աճուրդից'
					}
				]
			},
			{
				id: 2,
				title: {
					en: 'Commercial Vehicles',
					ru: 'Коммерческий транспорт',
					hy: 'Առևտրային տրանսպորտ'
				},
				items: [
					{
						en: 'Trucks',
						ru: 'Грузовики',
						hy: 'Բեռնատարներ'
					},
					{
						en: 'Buses',
						ru: 'Автобусы',
						hy: 'Ավտոբուսներ'
					}
				]
			},
			{
				id: 102,
				title: {
					en: 'Motorcycles',
					ru: 'Мотоциклы',
					hy: 'Հեծանիվներ'
				},
				items: [
					{
						en: 'Motorcycles',
						ru: 'Мотоциклы',
						hy: 'Հեծանիվներ'
					}
				]
			}
		]
	},
	'real-estate': {
		sections: [
			{
				id: 4,
				title: {
					en: 'Apartments for Sale',
					ru: 'Квартиры на продажу',
					hy: 'Բնակարաններ վաճառքի համար'
				},
				items: [
					{
						en: 'Apartments for Sale',
						ru: 'Квартиры на продажу',
						hy: 'Բնակարաններ վաճառքի համար'
					}
				]
			},
			{
				id: 5,
				title: {
					en: 'Apartments for Rent',
					ru: 'Квартиры в аренду',
					hy: 'Բնակարաններ վարձակալության համար'
				},
				items: [
					{
						en: 'Apartments for Rent',
						ru: 'Квартиры в аренду',
						hy: 'Բնակարաններ վարձակալության համար'
					}
				]
			},
			{
				id: 6,
				title: {
					en: 'Houses for Sale',
					ru: 'Дома на продажу',
					hy: 'Տներ վաճառքի համար'
				},
				items: [
					{
						en: 'Houses for Sale',
						ru: 'Дома на продажу',
						hy: 'Տներ վաճառքի համար'
					}
				]
			},
			{
				id: 7,
				title: {
					en: 'Houses for Rent',
					ru: 'Дома в аренду',
					hy: 'Տներ վարձակալության համար'
				},
				items: [
					{
						en: 'Houses for Rent',
						ru: 'Дома в аренду',
						hy: 'Տներ վարձակալության համար'
					}
				]
			},
			{
				id: 8,
				title: {
					en: 'Commercial for Sale',
					ru: 'Коммерческая недвижимость на продажу',
					hy: 'Առևտրային անշարժ գույք վաճառքի համար'
				},
				items: [
					{
						en: 'Offices for Sale',
						ru: 'Офисы на продажу',
						hy: 'Գրասենյակներ վաճառքի համար'
					},
					{
						en: 'Retail for Sale',
						ru: 'Торговые помещения на продажу',
						hy: 'Առևտրային տարածքներ վաճառքի համար'
					}
				]
			},
			{
				id: 9,
				title: {
					en: 'Commercial for Rent',
					ru: 'Коммерческая недвижимость в аренду',
					hy: 'Առևտրային անշարժ գույք վարձակալության համար'
				},
				items: [
					{
						en: 'Offices for Rent',
						ru: 'Офисы в аренду',
						hy: 'Գրասենյակներ վարձակալության համար'
					},
					{
						en: 'Retail for Rent',
						ru: 'Торговые помещения в аренду',
						hy: 'Առևտրային տարածքներ վարձակալության համար'
					}
				]
			}
		]
	},
	electronics: {
		sections: [
			{
				id: 18,
				title: {
					en: 'Mobile Devices',
					ru: 'Мобильные устройства',
					hy: 'Բջջային սարքեր'
				},
				items: [
					{
						en: 'Smartphones',
						ru: 'Смартфоны',
						hy: 'Սմարթֆոններ'
					},
					{
						en: 'Tablets',
						ru: 'Планшеты',
						hy: 'Պլանշետներ'
					}
				]
			},
			{
				id: 19,
				title: {
					en: 'Computers',
					ru: 'Компьютеры',
					hy: 'Համակարգիչներ'
				},
				items: [
					{
						en: 'Laptops',
						ru: 'Ноутбуки',
						hy: 'Նոութբուքեր'
					},
					{
						en: 'Desktops',
						ru: 'Настольные компьютеры',
						hy: 'Աշխատասեղանի համակարգիչներ'
					}
				]
			},
			{
				id: 30,
				title: {
					en: 'Home Electronics',
					ru: 'Бытовая техника',
					hy: 'Տնային տեխնիկա'
				},
				items: [
					{
						en: 'TVs',
						ru: 'Телевизоры',
						hy: 'Հեռուստացույցներ'
					},
					{
						en: 'Audio Systems',
						ru: 'Аудиосистемы',
						hy: 'Աուդիո համակարգեր'
					}
				]
			}
		]
	}
}; 
