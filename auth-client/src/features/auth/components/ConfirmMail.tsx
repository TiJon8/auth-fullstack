'use client';

import { useEffect } from "react"
import { useConfirmMutation } from "../hooks"
import { useSearchParams } from "next/navigation"
import { AuthWrapper } from "./AuthWrapper"
import { Loading } from "@/shared/components/ui"

// function isString(token: string | null): token is string {
// 	if (token) {
// 		return typeof token === 'string'
// 	}
// }

export function ConfirmMail() {
	const searchParams = useSearchParams()
	const token = searchParams.get('token')

	const { mutate } = useConfirmMutation()

	useEffect(() => {
		mutate(token!)
	}, [token])
	return (
		<AuthWrapper header="Подтверждение почты">
			<div>
				<Loading />
			</div>
		</AuthWrapper>
	)
}