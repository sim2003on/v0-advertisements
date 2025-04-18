export interface IBaseAdvertisementForm {
	title: string;
	description: string;
	price: number;
	currency: string;
	address: string;
	lat: number;
	lon: number;
	cityId: number;
	imgKeys: string[];
	phoneNumbers: string[];
}

export interface IAdvertisementForm extends IBaseAdvertisementForm {
	[key: string]: any; // Для дополнительных полей, специфичных для каждой категории
}

export interface IImageData {
	file: File;
	uploadUrl: string;
	downloadUrl: string;
	keyName: string;
}

export interface IFormData extends IBaseAdvertisementForm {
	category: string;
	item: string;
	location: string | { coordinates: number[] };
	mark: string;
	model: string;
	images: IImageData[];
	'Body Type': string;
	'Engine Type': string;
	'Engine Size': string;
	'Transmission': string;
	'Drive Type': string;
	'Year': string;
	'Cleared Customs': string;
	'Mileage': string;
	'Steering Wheel': string;
	'Color': string;
	'Headlights': string;
	'Wheel Size': string;
	'Interior Color': string;
	'Interior Material': string;
	'Sunroof': string;
	[key: string]: string | string[] | IImageData[] | number | { coordinates: number[] };
}
