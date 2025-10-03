import { api } from "@/shared/api";

class ConfirmService {
	public async confirmEmail(token: string) {
		return await api.post('auth/confirm', { token })
	}
}

export const confirmService = new ConfirmService()