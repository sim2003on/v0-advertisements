'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ThanksPage() {
	const router = useRouter();
	const [seconds, setSeconds] = useState(5);

	useEffect(() => {
		// Устанавливаем таймер на редирект
		const redirectTimer = setTimeout(() => {
			router.push('/'); // Замените '/' на нужный URL для редиректа
		}, 5000);

		// Обновляем счетчик каждую секунду
		const countdownTimer = setInterval(() => {
			setSeconds(prev => prev - 1);
		}, 1000);

		// Очищаем таймеры при размонтировании
		return () => {
			clearTimeout(redirectTimer);
			clearInterval(countdownTimer);
		};
	}, [router]);

	return (
		<div className="flex min-h-screen flex-col items-center justify-center">
			<div className="flex flex-col gap-10 text-center">
				<h1 className="text-6xl font-bold">🎉 Спасибо за покупку!</h1>
				<p className="text-2xl text-muted-foreground">
					Ваш платеж был успешно обработан.
				</p>
				<p className="text-xl text-muted-foreground">
					Перенаправление на главную страницу через {seconds} секунд...
				</p>
			</div>
		</div>
	);
}
