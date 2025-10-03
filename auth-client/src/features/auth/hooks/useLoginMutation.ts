'use client';

import { useMutation } from "@tanstack/react-query"
import { TLoginSchema } from "../schemas"
import { authService } from "../services"
import { redirect, RedirectType, useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";


export const useLogin = (setShow2Factor: Dispatch<SetStateAction<boolean>>) => {
	const router = useRouter()

	const { mutate: login, isPending } = useMutation({
		mutationKey: ['login'],
		mutationFn: ({ values }: { values: TLoginSchema }) => (
			authService.login(values)
		),
		onSuccess: (data: any) => {
			console.log(data)
			if (data.protected) {
				setShow2Factor(true)
			} else if (data.status?.issue) {
				console.log('from issueees')
				router.push('/auth/register/finish')
			} else {
				router.push('/me')
			}
		},
		onError: (error) => console.error(error)
	})

	return { login, isPending }
}