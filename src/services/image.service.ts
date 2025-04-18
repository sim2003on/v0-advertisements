import { apiWithToken } from '@/libs/api/axios';
import AWS from 'aws-sdk';

interface ImageUploadResult {
	uploadUrl: string;
	downloadUrl: string;
	keyName: string;
}

class ImageService {
	private readonly bucketName = 'buyandsellimages'; // Имя вашего бакета
	private readonly s3: AWS.S3;

	constructor() {
		// Настраиваем AWS credentials
		AWS.config.update({
			credentials: new AWS.Credentials({
				accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || '',
				secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || ''
			}),
			region: 'eu-north-1'
		});

		// Инициализируем S3 клиент
		this.s3 = new AWS.S3({
			region: 'eu-north-1', // Укажите ваш регион
			signatureVersion: 'v4'
		});
	}

	public async configureBucketCORS(): Promise<void> {
		const corsConfig = {
			CORSRules: [
				{
					AllowedHeaders: ["*"],
					AllowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
					AllowedOrigins: [
						"http://localhost:4444",
						"http://localhost:3000",
						process.env.NEXT_PUBLIC_FRONTEND_URL || ""
					].filter(Boolean),
					ExposeHeaders: ["ETag"],
					MaxAgeSeconds: 3000
				}
			]
		};

		const params = {
			Bucket: this.bucketName,
			CORSConfiguration: corsConfig
		};

		try {
			await this.s3.putBucketCors(params).promise();
			console.log('CORS конфигурация успешно обновлена');
		} catch (error) {
			console.error('Ошибка при обновлении CORS конфигурации:', error);
			if (error instanceof Error) {
				throw new Error(`Ошибка настройки CORS: ${error.message}`);
			}
			throw new Error('Неизвестная ошибка при настройке CORS');
		}
	}

	public async getPresignedUrl(file: File): Promise<ImageUploadResult> {
		// Получаем расширение файла из его имени
		const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'jpg';

		const response = await apiWithToken.get<ImageUploadResult>(
			`/api/v1/presigned-url/image`,
			{
				params: {
					resolution: fileExtension
				}
			}
		);

		return response.data;
	}

	public async uploadToS3(uploadUrl: string, file: File): Promise<void> {
		try {
			// Извлекаем путь и параметры из presigned URL
			const url = new URL(uploadUrl);
			const key = url.pathname.substring(1); // Убираем начальный слеш

			// Создаем параметры для загрузки с учетом CORS
			const params = {
				Bucket: this.bucketName,
				Key: key,
				Body: file,
				ContentType: file.type
			};

			try {
				// Сначала проверяем доступность бакета
				await this.s3.headBucket({ Bucket: this.bucketName }).promise();
			} catch (error) {
				console.error('Ошибка при проверке бакета:', error);
				throw new Error('Бакет недоступен или отсутствуют права доступа');
			}

			// Загружаем файл через SDK с использованием промиса
			await this.s3.putObject(params).promise();

		} catch (error) {
			console.error('Ошибка при загрузке в S3:', error);
			if (error instanceof Error) {
				throw new Error(`Ошибка загрузки: ${error.message}`);
			}
			throw new Error('Неизвестная ошибка при загрузке файла');
		}
	}

	public async uploadImage(file: File): Promise<string> {
		try {
			// Получаем presigned URL и ключ
			const { uploadUrl, keyName } = await this.getPresignedUrl(file);

			// Загружаем файл в S3
			await this.uploadToS3(uploadUrl, file);

			// Возвращаем ключ для дальнейшего использования
			return keyName;
		} catch (error) {
			console.error('Ошибка при загрузке изображения:', error);
			throw error;
		}
	}

	public async uploadImages(files: File[]): Promise<string[]> {
		try {
			const uploadPromises = files.map(file => this.uploadImage(file));
			return await Promise.all(uploadPromises);
		} catch (error) {
			console.error('Ошибка при загрузке изображений:', error);
			throw error;
		}
	}
}

export const imageService = new ImageService(); 
