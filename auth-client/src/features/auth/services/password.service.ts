import { api } from "@/shared/api"
import { TPasswordResetSchema } from "../schemas"
import { TNewPasswordSchema } from "../schemas"

export class PasswordService {
	public async reset(body: TPasswordResetSchema) {
		const response = await api.post('auth/password/reset', body)
		return response
	}

	public async newPassword(body: TNewPasswordSchema, token: string) {
		return await api.post(`auth/password/new?token=${token}`, body)
	}
}

export const passwordService = new PasswordService()