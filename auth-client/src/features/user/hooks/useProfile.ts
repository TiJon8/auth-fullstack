import { useMutation, useQuery } from "@tanstack/react-query";
import { userService } from "../services";
import { IUser } from "@/features/auth/types";
import { useRouter } from "next/navigation";


export function useProfile() {
	const router = useRouter()

	const { data, isLoading, isError, error, isFetched } = useQuery({
		queryKey: ['profile'],
		queryFn: async () => {
			const res = await userService.getProfile()
			console.log(res)
			// throw new Error('oh no')
			// return res

			if ('status' in res) {
				// res.status === 401 && router.push('/auth/login')
				return Promise.reject(res)
			} else {
				return res as IUser
			}
		},
		retry: false
	})

	return { data, isLoading, isError, error, isFetched }
}