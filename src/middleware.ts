import { NextRequest, NextResponse } from 'next/server';

// Список публичных маршрутов
const publicRoutes = [
	'/login',
	'/register',
	'/',
	'/categories',
	'/categories/*',
	'/items',
	'/items/*',
	'/api/v1/public/*'
];

// Список защищенных маршрутов
const protectedRoutes = [
	'/profile',
	'/profile/*',
	'/advertisement/create',
	'/advertisement/edit/*',
	'/api/v1/private/*'
];

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Проверяем, является ли маршрут публичным
	const isPublicRoute = publicRoutes.some(route => {
		if (route.endsWith('/*')) {
			return pathname.startsWith(route.slice(0, -2));
		}
		return pathname === route;
	});

	// Проверяем, является ли маршрут защищенным
	const isProtectedRoute = protectedRoutes.some(route => {
		if (route.endsWith('/*')) {
			return pathname.startsWith(route.slice(0, -2));
		}
		return pathname === route;
	});

	// Если маршрут не является ни публичным, ни защищенным, пропускаем
	if (!isPublicRoute && !isProtectedRoute) {
		return NextResponse.next();
	}

	// Получаем токены
	const accessToken = request.headers.get('x-access-token');
	const refreshToken = request.cookies.get('refresh_token')?.value;

	// Если пользователь на защищенном маршруте
	if (isProtectedRoute) {
		// Если нет ни одного токена, перенаправляем на логин
		if (!accessToken && !refreshToken) {
			const redirectUrl = new URL('/login', request.url);
			redirectUrl.searchParams.set('redirect', pathname);
			return NextResponse.redirect(redirectUrl);
		}
		return NextResponse.next();
	}

	// Если пользователь на публичном маршруте
	if (isPublicRoute) {
		// Если есть токены и пользователь пытается зайти на страницы логина/регистрации
		if ((accessToken || refreshToken) && (pathname === '/login' || pathname === '/register')) {
			return NextResponse.redirect(new URL('/profile', request.url));
		}
		return NextResponse.next();
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - public folder
		 */
		'/((?!_next/static|_next/image|favicon.ico|public).*)',
	],
};
