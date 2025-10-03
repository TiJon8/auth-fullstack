import { api } from "@/shared/api";
import { TLoginSchema, TRegisterSchema } from "../schemas";
import { IUser } from "../types";

export class AuthService {
	public async register(body: TRegisterSchema) {
		const response = await api.post<IUser>('auth/register', body)
		return response
	}

	public async login(body: TLoginSchema) {
		const response = await api.post<IUser>('auth/login', body)
		return response
	}

	public async providerConnect(provider: string) {
		const response = await api.get<{ url: string }>(`auth/oauth/connect/${provider}`)
		return response
	}

	public async logout() {
		return await api.get('auth/logout')
	}
}

export const authService = new AuthService()