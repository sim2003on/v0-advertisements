'use client';

import { LatLngExpression, LeafletMouseEvent } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Check, ChevronRight, ImagePlus, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import {
	Button,
	Input,
	Label,
	Progress,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Spinner
} from '@/components/ui/primitives';
import { Badge } from '@/components/ui/primitives/Badge';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator
} from '@/components/ui/primitives/BreadCrumb';
import { Textarea } from '@/components/ui/primitives/TextArea';

import { imageService } from '@/services/image.service';
import { itemService } from '@/services/item.service';
import { locationService } from '@/services/location.service';

import { cn } from '@/utils/tw-merge';

import { mainCategories, subcategories } from '@/constants/categories';
import { IAdvertisementForm, IFormData } from '@/types/item.types';

// Динамический импорт карты
const Map = dynamic(
	() => import('@/components/features/advertisement/Map').then(mod => mod.Map),
	{
		ssr: false,
		loading: () => (
			<div className="h-[400px] w-full animate-pulse bg-gray-200" />
		)
	}
);

// Types
type Step = {
	id: number;
	name: {
		en: string;
		ru: string;
		hy: string;
	};
};

// Define the steps for the ad creation process
const steps: Step[] = [
	{
		id: 1,
		name: {
			en: 'Category',
			ru: 'Категория',
			hy: 'Կատեգորիա'
		}
	},
	{
		id: 2,
		name: {
			en: 'Compose',
			ru: 'Составление',
			hy: 'Կազմում'
		}
	},
	{
		id: 3,
		name: {
			en: 'Preview',
			ru: 'Предпросмотр',
			hy: 'Նախադիտում'
		}
	},
	{
		id: 4,
		name: {
			en: 'Publish',
			ru: 'Публикация',
			hy: 'Հրապարակում'
		}
	}
];

interface IMark {
	id: number;
	mark: string;
}

interface IModel {
	id: number;
	model: string;
}

type LocalizedString = {
	en: string;
	ru: string;
	hy: string;
};

interface ILocation {
	id: number;
	name_eng: string;
	name_ru: string;
	name_hy: string;
	countryId?: number;
	regionId?: number;
	[key: string]: any; // Добавляем индексную сигнатуру для динамических свойств
}

const translations: Record<string, LocalizedString> = {
	images: {
		en: 'Images',
		ru: 'Изображения',
		hy: 'Պատկերներ'
	},
	addImages: {
		en: 'Add images',
		ru: 'Добавить изображения',
		hy: 'Ավելացնել պատկերներ'
	},
	left: {
		en: 'left',
		ru: 'осталось',
		hy: 'մնաց'
	},
	location: {
		en: 'Location',
		ru: 'Местоположение',
		hy: 'Տեղակայություն'
	},
	country: {
		en: 'Country',
		ru: 'Страна',
		hy: 'Երկիր'
	},
	region: {
		en: 'Region',
		ru: 'Регион',
		hy: 'Մարզ'
	},
	cityVillage: {
		en: 'City/Village',
		ru: 'Город/Село',
		hy: 'Քաղաք/Գյուղ'
	},
	selectCountry: {
		en: 'Select country',
		ru: 'Выберите страну',
		hy: 'Ընտրեք երկիր'
	},
	selectRegion: {
		en: 'Select region',
		ru: 'Выберите регион',
		hy: 'Ընտրեք մարզ'
	},
	selectCity: {
		en: 'Select city/village',
		ru: 'Выберите город/село',
		hy: 'Ընտրեք քաղաք/գյուղ'
	},
	selectMark: {
		en: 'Select mark',
		ru: 'Выберите марку',
		hy: 'Ընտրեք մակնիշը'
	},
	basicInfo: {
		en: 'Basic Information',
		ru: 'Основная информация',
		hy: 'Հիմնական տեղեկատվություն'
	},
	title: {
		en: 'Title',
		ru: 'Заголовок',
		hy: 'Վերնագիր'
	},
	description: {
		en: 'Description',
		ru: 'Описание',
		hy: 'Նկարագրություն'
	},
	price: {
		en: 'Price',
		ru: 'Цена',
		hy: 'Գին'
	},
	currency: {
		en: 'Currency',
		ru: 'Валюта',
		hy: 'Արժույթ'
	},
	address: {
		en: 'Address',
		ru: 'Адрес',
		hy: 'Հասցե'
	},
	phoneNumbers: {
		en: 'Phone Numbers',
		ru: 'Номера телефонов',
		hy: 'Հեռախոսահամարներ'
	},
	phoneNumbersHint: {
		en: 'Enter numbers separated by commas',
		ru: 'Введите номера через запятую',
		hy: 'Մուտքագրեք համարները ստորակետերով'
	},
	example: {
		en: 'Example',
		ru: 'Пример',
		hy: 'Օրինակ'
	},
	locationHint: {
		en: 'Click on the map or search for an address to select a location',
		ru: 'Нажмите на карту или найдите адрес для выбора местоположения',
		hy: 'Սեղմեք քարտեզի վրա կամ գտեք հասցեն տեղակայության ընտրելու համար'
	},
	searchAddress: {
		en: 'Search address...',
		ru: 'Поиск адреса...',
		hy: 'Որոնել հասցեն...'
	}
};

const currencies = [
	{ value: 'AMD', label: { en: '֏', ru: '֏', hy: '֏' } },
	{ value: 'USD', label: { en: '$', ru: '$', hy: '$' } },
	{ value: 'RUB', label: { en: '₽', ru: '₽', hy: '₽' } },
	{ value: 'EUR', label: { en: '€', ru: '€', hy: '€' } }
];

// Компонент для поиска адреса
const SearchAddress = ({
	onSelect,
	locale,
	onLocationChange,
	defaultAddress
}: {
	onSelect: (lat: number, lng: number, address: string) => void;
	locale: string;
	onLocationChange: (lat: number, lng: number) => void;
	defaultAddress?: string;
}) => {
	const [searchQuery, setSearchQuery] = useState(defaultAddress || '');
	const [suggestions, setSuggestions] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const t = useTranslations('common');

	const searchAddress = useCallback(
		async (query: string) => {
			if (!query) {
				setSuggestions([]);
				return;
			}

			setIsLoading(true);
			try {
				const response = await fetch(
					`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
						query
					)}&accept-language=${locale}`
				);
				const data = await response.json();
				setSuggestions(data);
			} catch (error) {
				console.error('Error searching address:', error);
			} finally {
				setIsLoading(false);
			}
		},
		[locale]
	);

	useEffect(() => {
		const debounceTimer = setTimeout(() => {
			if (searchQuery) {
				searchAddress(searchQuery);
			}
		}, 500);

		return () => clearTimeout(debounceTimer);
	}, [searchQuery, searchAddress]);

	return (
		<div className="relative w-full max-w-[400px]">
			<input
				type="text"
				value={searchQuery}
				onChange={e => setSearchQuery(e.target.value)}
				placeholder={t('fields.searchAddress')}
				className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm focus:border-primary focus:outline-none"
			/>
			{isLoading && <Spinner />}
			{suggestions.length > 0 && (
				<ul className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
					{suggestions.map(suggestion => (
						<li
							key={suggestion.place_id}
							className="cursor-pointer px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
							onClick={() => {
								const lat = parseFloat(suggestion.lat);
								const lng = parseFloat(suggestion.lon);
								onSelect(lat, lng, suggestion.display_name);
								onLocationChange(lat, lng);
								setSearchQuery(suggestion.display_name);
								setSuggestions([]);
							}}
						>
							{suggestion.display_name}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export const AdCreationWizard = () => {
	const locale = useLocale();
	const t = useTranslations('common');
	const [formFields, setFormFields] = useState<any[]>([]);
	const [carMarks, setCarMarks] = useState<IMark[]>([]);
	const [carModels, setCarModels] = useState<IModel[]>([]);
	const [selectedMark, setSelectedMark] = useState<number | null>(null);
	const [currentStep, setCurrentStep] = useState(1);
	const [previewImages, setPreviewImages] = useState<string[]>([]);
	const [isUploading, setIsUploading] = useState(false);
	const [imageKeys, setImageKeys] = useState<string[]>([]);
	const [tempPhoneNumber, setTempPhoneNumber] = useState('');
	const [userAddress, setUserAddress] = useState<string>('');
	const [locations, setLocations] = useState<{
		countries: ILocation[];
		regions: ILocation[];
		cities: ILocation[];
	}>({
		countries: [],
		regions: [],
		cities: []
	});
	const [selectedLocation, setSelectedLocation] = useState<{
		countryId: number | null;
		regionId: number | null;
		cityId: number | null;
	}>({
		countryId: null,
		regionId: null,
		cityId: null
	});

	const form = useForm<IFormData>({
		defaultValues: {
			category: '',
			item: '',
			status: '',
			location: '',
			mark: '',
			model: '',
			images: [],
			title: '',
			description: '',
			price: 0,
			currency: 'AMD',
			address: '',
			phoneNumbers: [],
			lat: 40.140026,
			lon: 44.53084,
			'Body Type': '',
			'Engine Type': '',
			'Engine Size': '',
			Transmission: '',
			'Drive Type': '',
			Year: '',
			'Cleared Customs': '',
			Mileage: '',
			'Steering Wheel': '',
			Color: '',
			Headlights: '',
			'Wheel Size': '',
			'Interior Color': '',
			'Interior Material': '',
			Sunroof: ''
		}
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch
	} = form;

	// Загрузка данных формы
	useEffect(() => {
		const fetchFormData = async () => {
			try {
				const data = await itemService.getFormData(1);
				setFormFields(data.descriptions);
			} catch (error) {
				console.error('Error fetching form data:', error);
			}
		};

		fetchFormData();
	}, []);

	// Загрузка марок автомобилей
	useEffect(() => {
		const fetchCarMarks = async () => {
			try {
				const marks = await itemService.getCarMarks();
				setCarMarks(marks);
			} catch (error) {
				console.error('Error fetching car marks:', error);
			}
		};

		fetchCarMarks();
	}, []);

	// Загрузка моделей автомобилей при выборе марки
	useEffect(() => {
		const fetchCarModels = async () => {
			if (selectedMark) {
				try {
					const models = await itemService.getCarModels(selectedMark);
					setCarModels(models);
				} catch (error) {
					console.error('Error fetching car models:', error);
				}
			} else {
				setCarModels([]);
			}
		};

		fetchCarModels();
	}, [selectedMark]);

	// Загрузка стран
	useEffect(() => {
		const fetchCountries = async () => {
			try {
				const countries = await locationService.getCountries();
				setLocations(prev => ({ ...prev, countries }));
			} catch (error) {
				console.error('Error fetching countries:', error);
			}
		};

		fetchCountries();
	}, []);

	// Загрузка регионов при выборе страны
	useEffect(() => {
		const fetchRegions = async () => {
			if (selectedLocation.countryId) {
				try {
					const regions = await locationService.getRegions(
						selectedLocation.countryId
					);
					setLocations(prev => ({ ...prev, regions, cities: [] }));
				} catch (error) {
					console.error('Error fetching regions:', error);
				}
			} else {
				setLocations(prev => ({ ...prev, regions: [], cities: [] }));
			}
		};

		fetchRegions();
	}, [selectedLocation.countryId]);

	// Загрузка городов при выборе региона
	useEffect(() => {
		const fetchCities = async () => {
			if (selectedLocation.regionId) {
				try {
					const cities = await locationService.getCities(
						selectedLocation.regionId
					);
					setLocations(prev => ({ ...prev, cities }));
				} catch (error) {
					console.error('Error fetching cities:', error);
				}
			} else {
				setLocations(prev => ({ ...prev, cities: [] }));
			}
		};

		fetchCities();
	}, [selectedLocation.regionId]);

	const getLocalizedName = (item: ILocation) => {
		const nameKey = `name_${locale}` as keyof ILocation;
		return item[nameKey] || item.name_eng;
	};

	const handleLocationSelect = (
		type: 'country' | 'region' | 'city',
		id: number
	) => {
		if (type === 'country') {
			if (id === 1000) {
				// "Другая страна"
				setSelectedLocation({
					countryId: id,
					regionId: null,
					cityId: null
				});
				setLocations(prev => ({
					...prev,
					regions: [],
					cities: []
				}));
			} else {
				setSelectedLocation({
					countryId: id,
					regionId: null,
					cityId: null
				});
			}
		} else if (type === 'region') {
			setSelectedLocation(prev => ({
				...prev,
				regionId: id,
				cityId: null
			}));
		} else {
			setSelectedLocation(prev => ({
				...prev,
				cityId: id
			}));
		}
	};

	const [mapCenter, setMapCenter] = useState<LatLngExpression>([
		watch('lat'),
		watch('lon')
	]);

	// Функция для обратного геокодирования
	const reverseGeocode = useCallback(
		async (lat: number, lng: number) => {
			try {
				const response = await fetch(
					`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=${locale}`
				);
				const data = await response.json();
				if (data.display_name) {
					setUserAddress(data.display_name);
					setValue('address', data.display_name);
					return data.display_name;
				}
				return '';
			} catch (error) {
				console.error('Error reverse geocoding:', error);
				return '';
			}
		},
		[locale, setValue]
	);

	// Обработчик изменения локации
	const handleLocationChange = useCallback(
		(lat: number, lng: number) => {
			setValue('lat', lat);
			setValue('lon', lng);
			setValue('location', { coordinates: [lng, lat] });
			setMapCenter([lat, lng]);
			setMarkerPosition([lat, lng]);
			reverseGeocode(lat, lng);
		},
		[setValue, reverseGeocode]
	);

	// Функция для получения местоположения пользователя
	const getUserLocation = useCallback(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				position => {
					const { latitude, longitude } = position.coords;
					handleLocationChange(latitude, longitude);
				},
				error => {
					console.error('Error getting location:', error);
					toast.error('Не удалось получить местоположение');
					handleLocationChange(40.140026, 44.53084);
				}
			);
		} else {
			console.error('Geolocation is not supported by this browser');
			toast.error('Геолокация не поддерживается вашим браузером');
			handleLocationChange(40.140026, 44.53084);
		}
	}, [handleLocationChange]);

	// Получаем местоположение при монтировании компонента
	useEffect(() => {
		getUserLocation();
	}, [getUserLocation]);

	// Проверка заполненности полей
	const isStepValid = useCallback(() => {
		if (currentStep === 1) {
			return !!watch('item');
		}
		if (currentStep === 2) {
			const isLocationValid = !!watch('location');
			const isMarkValid = !!watch('mark');
			const isModelValid = !!watch('model');
			const isCityValid =
				selectedLocation.countryId === 1000 || !!selectedLocation.cityId;
			return isLocationValid && isMarkValid && isModelValid && isCityValid;
		}
		return true;
	}, [currentStep, watch, selectedLocation]);

	// Calculate progress percentage
	const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

	// Handle category selection
	const handleCategorySelect = (categoryId: string) => {
		setValue('category', categoryId);
	};

	// Handle subcategory selection
	const handleSubcategorySelect = (section: string, item: string) => {
		setValue('item', item);
		setCurrentStep(2);
	};

	// Обработчик изменения значения поля
	const handleFormChange = useCallback(
		(field: keyof IFormData, value: string) => {
			setValue(field as string, value);
		},
		[setValue]
	);

	// Обработчик загрузки изображений
	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);

		if (files.length + watch('images').length > 10) {
			toast.error('Максимальное количество изображений - 10');
			return;
		}

		try {
			setIsUploading(true);

			const uploadPromises = files.map(async file => {
				const { uploadUrl, downloadUrl, keyName } =
					await imageService.getPresignedUrl(file);
				return {
					file,
					uploadUrl,
					downloadUrl,
					keyName
				};
			});

			const newImages = await Promise.all(uploadPromises);
			setValue('images', [...watch('images'), ...newImages]);
			setImageKeys([...imageKeys, ...newImages.map(image => image.keyName)]);

			const newPreviews = files.map(file => URL.createObjectURL(file));
			setPreviewImages(prev => [...prev, ...newPreviews]);

			toast.success('Изображения успешно добавлены');
		} catch (error) {
			console.error('Ошибка при добавлении изображений:', error);
			toast.error('Произошла ошибка при добавлении изображений');
		} finally {
			setIsUploading(false);
		}
	};

	// Удаление изображения
	const handleRemoveImage = (index: number) => {
		const newImages = watch('images').filter((_, i) => i !== index);
		setValue('images', newImages);
		URL.revokeObjectURL(previewImages[index]);
		const newPreviews = previewImages.filter((_, i) => i !== index);
		setPreviewImages(newPreviews);
	};

	// Обработчик добавления номера телефона
	const handleAddPhoneNumber = () => {
		const value = tempPhoneNumber.trim();
		if (
			value &&
			!watch('phoneNumbers').includes(value) &&
			watch('phoneNumbers').length < 3
		) {
			setValue('phoneNumbers', [...watch('phoneNumbers'), value]);
			setTempPhoneNumber('');
		}
	};

	// Обработчик удаления номера телефона
	const handleRemovePhoneNumber = (index: number) => {
		setValue(
			'phoneNumbers',
			watch('phoneNumbers').filter((_, i) => i !== index)
		);
	};

	// Navigate to previous step
	const handlePrevStep = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	};

	// Обновляем handleSubmit
	const onSubmit = async (data: IFormData) => {
		try {
			setIsUploading(true);

			const uploadPromises = data.images.map(async image => {
				await imageService.uploadToS3(image.uploadUrl, image.file);
				return image.keyName;
			});

			const uploadedImageKeys = await Promise.all(uploadPromises);

			const fieldIdMapping: Record<string, number> = {
				'Body Type': 4,
				'Engine Type': 5,
				'Engine Size': 6,
				Transmission: 7,
				'Drive Type': 8,
				Mileage: 9,
				'Steering Wheel': 10,
				'Cleared Customs': 11,
				Color: 12,
				'Wheel Size': 13,
				Headlights: 14,
				'Interior Color': 15,
				'Interior Material': 16,
				Sunroof: 17
			};

			const localeToFieldMap: Record<string, string> = {
				en: 'eng',
				ru: 'ru',
				hy: 'hy'
			};

			const fieldLocale = localeToFieldMap[locale] || 'eng';
			const localeField = `fieldValue_${fieldLocale}` as
				| 'fieldValue_eng'
				| 'fieldValue_ru'
				| 'fieldValue_hy';

			const submitData: IAdvertisementForm = {
				title: data.title || `${data.mark} ${data.model}`,
				description: data.description || '',
				price: Number(data.price) || 0,
				currency: data.currency || 'AMD',
				address: data.address || '',
				lat: data.lat,
				lon: data.lon,
				cityId: selectedLocation.cityId || 0,
				imgKeys: uploadedImageKeys,
				phoneNumbers: data.phoneNumbers,
				fieldsValue: [
					{
						fieldId: 1,
						fieldValues: {
							fieldValue_eng: '',
							fieldValue_ru: '',
							fieldValue_hy: '',
							[localeField]: data.mark
						}
					},
					{
						fieldId: 2,
						fieldValues: {
							fieldValue_eng: '',
							fieldValue_ru: '',
							fieldValue_hy: '',
							[localeField]: data.model
						}
					},
					{
						fieldId: 3,
						fieldValues: {
							fieldValue_eng: '',
							fieldValue_ru: '',
							fieldValue_hy: '',
							[localeField]: data['Year'] || ''
						}
					},
					...Object.entries(data)
						.filter(([key]) => fieldIdMapping[key] !== undefined)
						.map(([key, value]) => ({
							fieldId: fieldIdMapping[key],
							fieldValues: {
								fieldValue_eng: '',
								fieldValue_ru: '',
								fieldValue_hy: '',
								[localeField]: String(value)
							}
						}))
				]
			};

			console.log('Submitting data:', JSON.stringify(submitData, null, 2));

			await itemService.createItem(submitData, Number(data.category), locale);
			toast.success('Объявление успешно создано!');
			resetForm();
		} catch (error) {
			console.error('Ошибка при создании объявления:', error);
			toast.error('Произошла ошибка при создании объявления');
		} finally {
			setIsUploading(false);
		}
	};

	// Обновляем handleNextStep
	const handleNextStep = async () => {
		if (currentStep === 1 && !watch('item')) {
			toast.error('Пожалуйста, выберите категорию');
			return;
		}

		if (currentStep === 2) {
			const validationResult = await form.trigger([
				'location',
				'mark',
				'model'
			]);
			if (!validationResult) {
				return;
			}
			if (selectedLocation.countryId !== 1000 && !selectedLocation.cityId) {
				toast.error('Пожалуйста, выберите город');
				return;
			}
		}

		if (currentStep === steps.length - 1) {
			handleSubmit(onSubmit)();
			return;
		}

		if (currentStep < steps.length) {
			setCurrentStep(currentStep + 1);
		}
	};

	// Get breadcrumb path
	const getBreadcrumbPath = () => {
		const parts = [
			{
				en: 'Post an Ad',
				ru: 'Разместить объявление',
				hy: 'Հրապարակել հայտարարություն'
			}
		];

		if (watch('item')) {
			const category = mainCategories.find(c => c.id === watch('category'));
			if (category) {
				parts.push(category.name);
			}
		}

		if (watch('item')) {
			const section = subcategories[watch('category')]?.sections.find(
				s => s.title[locale as keyof typeof s.title] === watch('item')
			);
			if (section) {
				const item = section.items.find(
					i => i[locale as keyof typeof i] === watch('item')
				);
				if (item) {
					parts.push(item);
				}
			}
		}

		return parts;
	};

	const [markerPosition, setMarkerPosition] = useState<LatLngExpression>([
		watch('lat'),
		watch('lon')
	]);

	// При сбросе формы
	const resetForm = () => {
		form.reset();
		setCurrentStep(1);
		setMarkerPosition([40.140026, 44.53084]);
		setMapCenter([40.140026, 44.53084]);
		setUserAddress('');
		setSelectedLocation({ countryId: null, regionId: null, cityId: null });
		setLocations({ countries: locations.countries, regions: [], cities: [] });
	};

	const handleMapClick = useCallback(
		(e: LeafletMouseEvent) => {
			const { lat, lng } = e.latlng;
			setMarkerPosition([lat, lng]);
			setValue('lat', lat);
			setValue('lon', lng);
			setValue('location', { coordinates: [lng, lat] });
			reverseGeocode(lat, lng);
		},
		[setValue, reverseGeocode]
	);

	return (
		<FormProvider {...form}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mx-auto max-w-6xl bg-white p-6">
					{/* Progress bar */}
					<div className="mb-6">
						<Progress value={progressPercentage} className="h-1" />
					</div>

					{/* Step indicator */}
					<div className="mb-8 flex items-center justify-between">
						{steps.map(step => {
							const isCompleted = step.id < currentStep;
							const isCurrent = step.id === currentStep;

							return (
								<div key={step.id} className="flex flex-col items-center">
									<div
										className={cn(
											'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium',
											isCompleted
												? 'bg-green-500 text-white'
												: isCurrent
													? 'bg-primary text-white'
													: 'bg-gray-200 text-gray-500'
										)}
									>
										{isCompleted ? <Check className="h-5 w-5" /> : step.id}
									</div>
									<span
										className={cn(
											'mt-1 text-sm font-medium',
											isCompleted
												? 'text-green-500'
												: isCurrent
													? 'text-primary'
													: 'text-gray-500'
										)}
									>
										{step.name[locale as keyof typeof step.name]}
									</span>
								</div>
							);
						})}
					</div>

					{/* Breadcrumb navigation */}
					{watch('item') && (
						<Breadcrumb className="mb-8">
							<BreadcrumbList>
								{getBreadcrumbPath().map((part, index) => (
									<React.Fragment key={index}>
										<BreadcrumbItem>
											<BreadcrumbLink>
												{part[locale as keyof typeof part]}
											</BreadcrumbLink>
										</BreadcrumbItem>
										{index < getBreadcrumbPath().length - 1 && (
											<BreadcrumbSeparator />
										)}
									</React.Fragment>
								))}
							</BreadcrumbList>
						</Breadcrumb>
					)}

					{/* Step 1: Category Selection */}
					{currentStep === 1 && (
						<>
							<div className="grid grid-cols-1 gap-6 md:grid-cols-[350px_1fr]">
								<div className="space-y-2">
									{mainCategories.map(category => {
										const Icon = category.icon;
										return (
											<button
												type="button"
												key={category.id}
												className={cn(
													'flex w-full items-center justify-between rounded-md p-4 transition-colors',
													watch('category') === category.id
														? 'bg-primary/10 text-primary'
														: 'bg-gray-50 text-gray-700 hover:bg-gray-100'
												)}
												onClick={() => handleCategorySelect(category.id)}
											>
												<div className="flex items-center">
													<Icon className="mr-3 h-5 w-5" />
													<span>
														{
															category.name[
																locale as keyof typeof category.name
															]
														}
													</span>
												</div>
												<ChevronRight className="h-5 w-5" />
											</button>
										);
									})}
								</div>

								<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
									{subcategories[watch('category')]?.sections.map(section => (
										<div
											key={section.title[locale as keyof typeof section.title]}
											className="space-y-3"
										>
											<h3 className="text-lg font-semibold text-gray-800">
												{section.title[locale as keyof typeof section.title]}
											</h3>
											<ul className="space-y-2">
												{section.items.map(item => (
													<li key={item[locale as keyof typeof item]}>
														<button
															type="button"
															className={cn(
																'text-left transition-colors',
																watch('item') ===
																	item[locale as keyof typeof item]
																	? 'font-medium text-primary'
																	: 'text-gray-600 hover:text-primary'
															)}
															onClick={() =>
																handleSubcategorySelect(
																	section.title[
																		locale as keyof typeof section.title
																	],
																	item[locale as keyof typeof item]
																)
															}
														>
															{item[locale as keyof typeof item]}
														</button>
													</li>
												))}
											</ul>
										</div>
									))}
								</div>
							</div>
						</>
					)}

					{/* Step 2: Compose Ad Details */}
					{currentStep === 2 && (
						<div className="space-y-8">
							<div className="space-y-4">
								<h3 className="text-lg font-semibold">
									{
										translations.basicInfo[
											locale as keyof typeof translations.basicInfo
										]
									}
								</h3>
								<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
									<div className="space-y-2">
										<Label>
											{
												translations.title[
													locale as keyof typeof translations.title
												]
											}
										</Label>
										<Input
											type="text"
											{...register('title')}
											placeholder={
												translations.title[
													locale as keyof typeof translations.title
												]
											}
										/>
									</div>
									<div className="space-y-2">
										<Label>
											{
												translations.description[
													locale as keyof typeof translations.description
												]
											}
										</Label>
										<Textarea
											{...register('description')}
											placeholder={
												translations.description[
													locale as keyof typeof translations.description
												]
											}
											className="max-h-[300px] min-h-[100px]"
										/>
									</div>
									<div className="space-y-2">
										<Label>
											{
												translations.price[
													locale as keyof typeof translations.price
												]
											}
										</Label>
										<div className="flex gap-2">
											<Input
												type="number"
												{...register('price')}
												placeholder={
													translations.price[
														locale as keyof typeof translations.price
													]
												}
											/>
											<Select {...register('currency')}>
												<SelectTrigger className="w-[120px]">
													<SelectValue
														placeholder={
															translations.currency[
																locale as keyof typeof translations.currency
															]
														}
													/>
												</SelectTrigger>
												<SelectContent>
													{currencies.map(currency => (
														<SelectItem
															key={currency.value}
															value={currency.value}
														>
															{
																currency.label[
																	locale as keyof typeof currency.label
																]
															}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</div>
									</div>
									<div className="space-y-2">
										<Label>
											{
												translations.phoneNumbers[
													locale as keyof typeof translations.phoneNumbers
												]
											}
										</Label>
										<div className="flex gap-2">
											<Input
												type="text"
												value={tempPhoneNumber}
												onChange={e => setTempPhoneNumber(e.target.value)}
												placeholder={
													translations.phoneNumbersHint[
														locale as keyof typeof translations.phoneNumbersHint
													]
												}
												className="flex-1"
											/>
											<Button
												type="button"
												onClick={handleAddPhoneNumber}
												disabled={
													!tempPhoneNumber.trim() ||
													watch('phoneNumbers').length >= 3
												}
											>
												<Check className="h-4 w-4" />
											</Button>
										</div>
										<div className="mt-2 flex flex-wrap gap-2">
											{watch('phoneNumbers').map((phone, index) => (
												<Badge
													key={index}
													variant="secondary"
													className="flex items-center gap-1"
												>
													<span>{phone}</span>
													<Button
														type="button"
														variant="ghost"
														onClick={() => handleRemovePhoneNumber(index)}
														className="ml-1 h-auto p-0"
													>
														<X className="h-3 w-3" />
														<span className="sr-only">Remove {phone}</span>
													</Button>
												</Badge>
											))}
										</div>
										<p className="text-sm text-gray-500">
											{
												translations.example[
													locale as keyof typeof translations.example
												]
											}
											: +37496123456, +712345678901
										</p>
									</div>
								</div>
							</div>

							<div className="space-y-4">
								<h3 className="text-lg font-semibold">
									{translations.location[locale as keyof LocalizedString]}
								</h3>
								<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
									<div className="space-y-2">
										<Label>
											{translations.country[locale as keyof LocalizedString]}
										</Label>
										<Select
											value={selectedLocation.countryId?.toString()}
											onValueChange={value =>
												handleLocationSelect('country', parseInt(value))
											}
										>
											<SelectTrigger>
												<SelectValue
													placeholder={
														translations.selectCountry[
															locale as keyof LocalizedString
														]
													}
												/>
											</SelectTrigger>
											<SelectContent>
												{locations.countries.map(country => (
													<SelectItem
														key={country.id}
														value={country.id.toString()}
													>
														{getLocalizedName(country)}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>

									{selectedLocation.countryId &&
										selectedLocation.countryId !== 1000 &&
										locations.regions.length > 0 && (
											<div className="space-y-2">
												<Label>
													{translations.region[locale as keyof LocalizedString]}
												</Label>
												<Select
													value={selectedLocation.regionId?.toString()}
													onValueChange={value =>
														handleLocationSelect('region', parseInt(value))
													}
												>
													<SelectTrigger>
														<SelectValue
															placeholder={
																translations.selectRegion[
																	locale as keyof LocalizedString
																]
															}
														/>
													</SelectTrigger>
													<SelectContent>
														{locations.regions.map(region => (
															<SelectItem
																key={region.id}
																value={region.id.toString()}
															>
																{getLocalizedName(region)}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</div>
										)}

									{selectedLocation.regionId && locations.cities.length > 0 && (
										<div className="space-y-2">
											<Label>
												{
													translations.cityVillage[
														locale as keyof LocalizedString
													]
												}
											</Label>
											<Select
												value={selectedLocation.cityId?.toString()}
												onValueChange={value =>
													handleLocationSelect('city', parseInt(value))
												}
											>
												<SelectTrigger>
													<SelectValue
														placeholder={
															translations.selectCity[
																locale as keyof LocalizedString
															]
														}
													/>
												</SelectTrigger>
												<SelectContent>
													{locations.cities.map(city => (
														<SelectItem
															key={city.id}
															value={city.id.toString()}
														>
															{getLocalizedName(city)}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</div>
									)}
								</div>

								<div className="flex items-center justify-between">
									<SearchAddress
										onSelect={(lat, lng, address) => {
											setValue('address', address);
											setUserAddress(address);
										}}
										onLocationChange={handleLocationChange}
										locale={locale}
									/>
									<Button
										type="button"
										variant="outline"
										onClick={getUserLocation}
										className="whitespace-nowrap"
									>
										{t('actions.useMyLocation')}
									</Button>
								</div>
								<div className="h-[400px] w-full overflow-hidden rounded-lg">
									{typeof window !== 'undefined' && (
										<Map
											center={mapCenter}
											markerPosition={markerPosition}
											onMapClick={handleMapClick}
										/>
									)}
								</div>
								<div className="mt-4 text-sm text-gray-500">
									{translations.locationHint[locale as keyof LocalizedString]}
								</div>
							</div>

							{formFields.map((section, sectionIndex) => (
								<div key={`section-${sectionIndex}`} className="space-y-4">
									<h3 className="text-lg font-semibold">
										{section[`header_${locale}`] || section.header_eng}
									</h3>
									<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
										{[...section.fields]
											.sort((a, b) => {
												if (a.fieldName_eng.toLowerCase() === 'mark') return -1;
												if (b.fieldName_eng.toLowerCase() === 'mark') return 1;
												if (a.fieldName_eng.toLowerCase() === 'model')
													return -1;
												if (b.fieldName_eng.toLowerCase() === 'model') return 1;
												return a.fieldName_eng.localeCompare(b.fieldName_eng);
											})
											.map((field: any, fieldIndex: number) => (
												<div key={`field-${fieldIndex}`} className="space-y-2">
													<Label>
														{field[`fieldName_${locale}`] ||
															field.fieldName_eng}
														{field.measurement_eng && (
															<span className="ml-1 text-gray-500">
																(
																{field[`measurement_${locale}`] ||
																	field.measurement_eng}
																)
															</span>
														)}
													</Label>
													{field.fieldName_eng.toLowerCase() === 'mark' ? (
														<Select
															value={watch('mark')}
															onValueChange={value => {
																setValue('mark', value);
																setSelectedMark(
																	carMarks.find(mark => mark.mark === value)
																		?.id || null
																);
															}}
														>
															<SelectTrigger>
																<SelectValue placeholder="Выберите марку" />
															</SelectTrigger>
															<SelectContent>
																{carMarks.map(mark => (
																	<SelectItem key={mark.id} value={mark.mark}>
																		{mark.mark}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
													) : field.fieldName_eng.toLowerCase() === 'model' ? (
														<Select
															value={watch('model')}
															onValueChange={value => setValue('model', value)}
															disabled={!watch('mark')}
														>
															<SelectTrigger>
																<SelectValue placeholder="Выберите модель" />
															</SelectTrigger>
															<SelectContent>
																{carModels.map(model => (
																	<SelectItem
																		key={model.id}
																		value={model.model}
																	>
																		{model.model}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
													) : field.value && field.value.length > 0 ? (
														<Select
															onValueChange={value =>
																handleFormChange(
																	field.fieldName_eng as keyof IFormData,
																	value
																)
															}
														>
															<SelectTrigger className="flex items-center justify-between">
																<div className="flex items-center gap-2">
																	<SelectValue
																		placeholder={t('select.placeholder')}
																	/>
																	{watch(field.fieldName_eng) && (
																		<Check className="h-4 w-4 shrink-0 text-green-500" />
																	)}
																</div>
															</SelectTrigger>
															<SelectContent>
																{field.value.map(
																	(option: any, optionIndex: number) => (
																		<SelectItem
																			key={`option-${optionIndex}`}
																			value={
																				option[`fieldValue_${locale}`] ||
																				option.fieldValue_eng
																			}
																		>
																			{option[`fieldValue_${locale}`] ||
																				option.fieldValue_eng}
																		</SelectItem>
																	)
																)}
															</SelectContent>
														</Select>
													) : (
														<Input
															type="text"
															onChange={(
																e: React.ChangeEvent<HTMLInputElement>
															) =>
																handleFormChange(
																	field.fieldName_eng as keyof IFormData,
																	e.target.value
																)
															}
															placeholder={
																field[`fieldName_${locale}`] ||
																field.fieldName_eng
															}
														/>
													)}
												</div>
											))}
									</div>
								</div>
							))}

							<div className="space-y-4">
								<h3 className="text-lg font-semibold">
									{translations.images[locale as keyof LocalizedString]}
								</h3>
								<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
									{previewImages.map((preview, index) => (
										<div key={index} className="relative">
											<Image
												src={preview}
												alt={`Preview ${index + 1}`}
												width={200}
												height={200}
												className="h-32 w-full rounded-lg object-cover"
											/>
											<button
												type="button"
												onClick={() => handleRemoveImage(index)}
												className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
											>
												<X className="h-4 w-4" />
											</button>
										</div>
									))}
									{previewImages.length < 8 && (
										<label className="flex h-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-primary">
											<input
												type="file"
												accept="image/*"
												multiple
												onChange={handleImageUpload}
												className="hidden"
											/>
											<div className="flex flex-col items-center">
												<ImagePlus className="h-8 w-8 text-gray-400" />
												<span className="mt-2 text-sm text-gray-500">
													{
														translations.addImages[
															locale as keyof LocalizedString
														]
													}{' '}
													({8 - previewImages.length}{' '}
													{translations.left[locale as keyof LocalizedString]})
												</span>
											</div>
										</label>
									)}
								</div>
							</div>

							<div className="flex justify-between pt-4">
								<Button
									type="button"
									variant="outline"
									onClick={handlePrevStep}
								>
									Back
								</Button>
								<Button
									type="button"
									onClick={handleNextStep}
									disabled={!isStepValid()}
								>
									Continue
								</Button>
							</div>
						</div>
					)}

					{/* Step 3: Preview */}
					{currentStep === 3 && (
						<div className="space-y-8">
							<h2 className="mb-4 text-2xl font-bold text-gray-800">
								Preview Your Ad
							</h2>

							<div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
								<h3 className="mb-4 text-xl font-bold">
									{watch('item') as string}
								</h3>

								<div className="grid gap-4">
									<div className="grid grid-cols-[120px_1fr]">
										<span className="font-medium">Category:</span>
										<span>{watch('item') as string}</span>
									</div>

									<div className="grid grid-cols-[120px_1fr]">
										<span className="font-medium">Location:</span>
										<span>
											{(() => {
												const parts = [];
												if (selectedLocation.countryId) {
													const country = locations.countries.find(
														c => c.id === selectedLocation.countryId
													);
													if (country) parts.push(getLocalizedName(country));
												}
												if (selectedLocation.regionId) {
													const region = locations.regions.find(
														r => r.id === selectedLocation.regionId
													);
													if (region) parts.push(getLocalizedName(region));
												}
												if (selectedLocation.cityId) {
													const city = locations.cities.find(
														c => c.id === selectedLocation.cityId
													);
													if (city) parts.push(getLocalizedName(city));
												}
												return (
													parts.join(', ') ||
													watch('address') ||
													'Not specified'
												);
											})()}
										</span>
									</div>

									<div className="grid grid-cols-[120px_1fr]">
										<span className="font-medium">Vehicle:</span>
										<span>
											{watch('mark')} {watch('model')}
										</span>
									</div>
								</div>
							</div>

							<div className="flex justify-between pt-4">
								<Button
									type="button"
									variant="outline"
									onClick={handlePrevStep}
								>
									Back
								</Button>
								<Button type="button" onClick={handleNextStep}>
									Publish
								</Button>
							</div>
						</div>
					)}

					{/* Step 4: Publish */}
					{currentStep === 4 && (
						<div className="space-y-8">
							<div className="py-8 text-center">
								<div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
									<Check className="h-8 w-8 text-green-600" />
								</div>
								<h2 className="mb-2 text-2xl font-bold text-gray-800">
									Your Ad Has Been Published!
								</h2>
								<p className="mx-auto max-w-md text-gray-600">
									Your advertisement for {watch('mark')} {watch('model')} has
									been successfully published and is now visible to potential
									buyers.
								</p>
							</div>

							<div className="flex justify-center">
								<Button type="button" onClick={resetForm}>
									Create Another Ad
								</Button>
							</div>
						</div>
					)}
				</div>
			</form>
		</FormProvider>
	);
};
