'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
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
	TypeLoginAccountSchema,
	loginSchema
} from '@/schemas/auth/login.schema';

import { authService } from '@/services/auth.service';

import { AuthWrapper } from '../AuthWrapper';

import { useAuthStore } from '@/stores/authStore';

function extractErrorMessage(error: unknown, fallbackMessage: string): string {
	if (error instanceof Error) {
		return error.message || fallbackMessage;
	}
	if (typeof error === 'string') {
		return error;
	}
	return fallbackMessage;
}

export const LoginForm = () => {
	const t = useTranslations('signInPage');
	const tToaster = useTranslations('toaster');
	const tCommon = useTranslations('common');

	const router = useRouter();

	const { login } = useAuthStore();

	const form = useForm<TypeLoginAccountSchema>({
		resolver: zodResolver(loginSchema),
		mode: 'onChange',
		defaultValues: {
			username: '',
			password: ''
		}
	});

	const { isValid } = form.formState;

	const { mutate: loginMutation } = useMutation({
		mutationFn: (data: TypeLoginAccountSchema) =>
			authService.login(data.username, data.password),
		onSuccess: () => {
			login(form.getValues().username, form.getValues().password);
			toast.success(tToaster('loginSuccess'));
			router.push('/profile');
		},
		onError: (error: unknown) => {
			toast.error(extractErrorMessage(error, 'error'));
		}
	});

	const onSubmit = (data: TypeLoginAccountSchema) => {
		loginMutation(data);
	};

	return (
		<AuthWrapper
			heading={t('title')}
			backButtonLabel={t('linkToRegister')}
			backButtonHref="/register"
			className="max-w-md"
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="grid grid-cols-1 gap-y-4"
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
					<Button className="mx-auto mt-2" disabled={!isValid}>
						{tCommon('actions.login')}
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	);
};
