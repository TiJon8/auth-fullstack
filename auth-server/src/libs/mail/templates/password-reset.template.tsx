import { Body, Heading, Html, Tailwind, Text, Link } from '@react-email/components'
import * as React from 'react'

export function PasswordResetTemplate({ domain, token }) {
	const resetLink = `${domain}/auth/password-reset/new?token=${token}`

	return (
		<Tailwind>
			<Html>
				<Body>
					<Heading>Сброс пароля</Heading>
					<Text>Вы запросили сброс пароля, перейдите по ссылке ниже и придумайте новый пароль!</Text>
					<Link target="_blank" href={resetLink} className="px-[20px] py-[10px] bg-black rounded-lg text-white">Тык</Link>
					<Text>Ссылка действительна 15 минут! Если вы не запрашивали сброс пароля, проигнорируйте данное сообщение.</Text>
				</Body>
			</Html>
		</Tailwind>
	)
}