import { Body, Heading, Link, Tailwind, Text } from "@react-email/components"
import { Html } from "@react-email/html"
import * as React from 'react'

interface IConfirmationTempalte {
	domain: string
	token: string
}

export function ConfirmationTemplate({
	domain,
	token
}: IConfirmationTempalte) {
	const confirmLink = `${domain}/auth/confirm?token=${token}`

	return (
		<Tailwind>
			<Html>
				<Body>
					<Heading>Подтверждение почты</Heading>
					<Text>Привет! Ты прошел регистрацию, осталось только клинкуть кнопку ниже :)</Text>
					<Link target="_blank" href={confirmLink} className="px-[20px] py-[10px] bg-black rounded-lg text-white">Тык</Link>
					<Text>Ссылка действительна 15 минут! Если вы не запрашивали подтверждение, проигнорируйте данное сообщение.</Text>
				</Body>
			</Html>
		</Tailwind>
	)
}