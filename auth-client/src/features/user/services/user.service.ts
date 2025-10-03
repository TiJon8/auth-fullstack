import { IUser } from "@/features/auth/types";
import { api } from "@/shared/api";
import { TUserSettings } from "../shemas";

class UserService {
	public async getProfile() {
		const res = await api.get<IUser>('user/me')
		// console.log(res)
		return res
	}

	public async patchProfile(body: TUserSettings) {
		return await api.patch<IUser>('user/profile', body)
	}
}

export const userService = new UserService()