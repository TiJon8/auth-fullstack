'use client';
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { confirmService } from "../services";

export function useConfirmMutation() {
	const router = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['confirmation'],
		mutationFn: (token: string) => {
			return confirmService.confirmEmail(token)
		},
		onSuccess: () => {
			return router.push('/me')
		},
		onError: () => {
			router.push('/auth/login')
		}
	})
	return { mutate }
}