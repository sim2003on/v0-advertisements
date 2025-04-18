import { Metadata } from 'next';

import { LoginForm } from '@/components/features/auth/forms';

export const metadata: Metadata = {
	title: 'Sign In'
};

export default function LoginPage() {
	return <LoginForm />;
}
