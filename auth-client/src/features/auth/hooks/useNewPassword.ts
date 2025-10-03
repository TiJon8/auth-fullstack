import { useMutation } from "@tanstack/react-query";
import { passwordService } from "../services";
import { useRouter, useSearchParams } from "next/navigation";
import { TNewPasswordSchema } from "../schemas";

export function useNewPassword() {
	const searchParams = useSearchParams()
	const router = useRouter()
	const tk = searchParams.get('token')

	const { mutate, isPending, } = useMutation({
		mutationKey: ['new password'],
		mutationFn: ({ values }: { values: TNewPasswordSchema }) => (
			passwordService.newPassword(values, tk!)
		),
		onSuccess(data: any) {
			if (data.status === 'OK') {
				router.push('/auth/login')
			} else if (data.code === 'F_PR') {
				router.push('/auth/password-reset')
			}
		},
		onError(err) {
			router.push('/auth/password-reset')
			console.log(err)
		}
	})

	return { mutate, isPending }
}