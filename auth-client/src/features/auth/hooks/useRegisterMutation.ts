'use client';

import { useMutation } from "@tanstack/react-query"
import { TRegisterSchema } from "../schemas"
import { authService } from "../services"
import { useRouter } from "next/navigation";

export const useRegister = () => {
	const router = useRouter()

	const { mutate, isPending } = useMutation({
		mutationKey: ['register'],
		mutationFn: ({ values }: { values: TRegisterSchema }) => (
			authService.register(values)
		),
		onSuccess: (data: any) => {
			if (data.message) {
				router.push('/auth/register/finish')
			}
		},
		onError: (error) => console.error(error)
	})

	return { mutate, isPending }
}