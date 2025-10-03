import { authService } from "@/features/auth/services";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useLogout() {
	const router = useRouter()

	const { mutate, isPending } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess() {
			router.push('/auth/login')
		},
		onError: (err) => console.log(err)
	})

	return { mutate, isPending }
}