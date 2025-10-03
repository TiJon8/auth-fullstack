import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	const session = request.cookies.get('session')
	console.log('Запрос')
	console.log(session)
	// console.log(request.url)
	console.log(request.cookies)
	console.log(request.headers)

	// if (request.url.includes('/auth/register/finish')) {
	// 	return NextResponse.redirect(new URL('/auth/register', request.url))
	// }

	if (request.url.includes('/auth')) {
		if (session?.value) {
			return NextResponse.redirect(new URL('/me', request.url))
		}
		return NextResponse.next()
	}

	if (!session?.value) {
		return NextResponse.redirect(new URL('/auth/login', request.url))
	}
}



export const config = {
	matcher: ['/', '/auth/login', '/auth/register', '/me', '/auth/register/:path*']
}