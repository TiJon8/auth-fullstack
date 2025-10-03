import { useMutation } from "@tanstack/react-query";
import { TUserSettings } from "../shemas";
import { userService } from "../services";

export function useUpdate() {
	const { mutate, isPending } = useMutation({
		mutationKey: ['update profile'],
		mutationFn: (values: TUserSettings) => userService.patchProfile(values),
		onSuccess: () => {
			console.log('Данные изменены')
		},
		onError(err) {
			console.log(err)
		}
	})

	return { mutate, isPending }
}