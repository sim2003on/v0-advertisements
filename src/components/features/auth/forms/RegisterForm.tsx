'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	Input
} from '@/components/ui/primitives';

import {
	TypeRegisterAccountSchema,
	registerSchema
} from '@/schemas/auth/register.schema';

import { authService } from '@/services/auth.service';

import { AuthWrapper } from '../AuthWrapper';

export const RegisterForm = () => {
	const t = useTranslations('signUpPage');
	const tCommon = useTranslations('common');

	const form = useForm<TypeRegisterAccountSchema>({
		resolver: zodResolver(registerSchema),
		mode: 'onChange',
		defaultValues: {
			username: '',
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			repeatPassword: ''
		}
	});

	const { isValid } = form.formState;

	const router = useRouter();

	const onSubmit = async (data: TypeRegisterAccountSchema) => {
		try {
			await authService.register(data);
			toast.success('Registration completed successfully!');
			router.push('/login');
		} catch (error: any) {
			if (error.response.data.errors?.message) {
				toast.error(error.response.data.errors?.message);
			} else {
				toast.error('Error during registration');
			}
		}
	};

	return (
		<AuthWrapper
			heading={t('title')}
			backButtonLabel={t('linkToLogin')}
			backButtonHref="/login"
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2"
				>
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input placeholder={tCommon('fields.username')} {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input placeholder={tCommon('fields.email')} {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="firstName"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input placeholder={tCommon('fields.firstName')} {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="lastName"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input placeholder={tCommon('fields.lastName')} {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder={tCommon('fields.password')}
										type="password"
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="repeatPassword"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder={tCommon('fields.repeatPassword')}
										type="password"
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<Button
						className="col-span-1 mx-auto mt-3 md:col-span-2"
						disabled={!isValid}
					>
						{tCommon('actions.signUp')}
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	);
};
