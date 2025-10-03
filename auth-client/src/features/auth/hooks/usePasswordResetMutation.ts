import { useMutation } from "@tanstack/react-query"
import { TPasswordResetSchema } from "../schemas"
import { passwordService } from "../services"

export function usePasswordReset() {
	const { mutate, isPending } = useMutation({
		mutationKey: ['password reset'],
		mutationFn: ({ values }: { values: TPasswordResetSchema }) => (
			passwordService.reset(values)
		),
		onSuccess: (data: any) => {
			// console.log(data)
			if (data.message) {
				console.log(data)
			}
		},
		onError: (error) => console.error(error)
	})

	return { mutate, isPending }
}