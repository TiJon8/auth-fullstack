import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import { TBaseProviderOpts, TUserInfo } from "./types/provider-options.type";

export class BaseOAuthService {
	private BASE_URL: string

	constructor(private readonly options: TBaseProviderOpts) { }

	public redirectUrl() {
		return `${this.BASE_URL}/auth/oauth/callback/${this.options.provider}`
	}

	protected async extractUserInfo(data: any): Promise<TUserInfo> {
		return {
			...data,
			avatar: data.avatar_url,
			provider: this.options.provider
		}
	}

	public getOAuthUrl() {
		const params = new URLSearchParams({
			response_type: 'code',
			client_id: this.options.client_id,
			redirect_uri: this.redirectUrl(),
			scope: (this.options.scopes ?? []).join(' '),
			access_type: 'offline',
			prompt: 'select_account'
		})

		return `${this.options.authorize_url}?${params}`
	}

	public async findUserByCode(code: string): Promise<TUserInfo> {
		const client_id = this.options.client_id
		const client_secret = this.options.client_secret

		const tokenQuery = new URLSearchParams({
			client_id,
			client_secret,
			code,
			redirect_uri: this.redirectUrl(),
			grant_type: 'authorization_code'
		})

		// console.log(tokenQuery)

		const tokensRequest = await fetch(this.options.access_url, {
			method: 'POST',
			body: tokenQuery,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Accept: 'application/json'
			}
		})

		if (!tokensRequest.ok) {
			throw new BadRequestException(
				`Не удалось получить пользователя с ${this.options.profile_url}. Проверьте правильность токена доступа.`
			)
		}

		const tokens = await tokensRequest.json()
		console.log(tokens)

		if (!tokens.access_token) {
			throw new BadRequestException(
				`Нет токенов с ${this.options.access_url}. Убедитесь, что код авторизации действителен.`
			)
		}

		const userRequest = await fetch(this.options.profile_url, {
			headers: {
				Authorization: `Bearer ${tokens.access_token}`
			}
		})

		if (!userRequest.ok) {
			throw new UnauthorizedException(
				`Не удалось получить пользователя с ${this.options.profile_url}. Проверьте правильность токена доступа.`
			)
		}

		const user = await userRequest.json()
		const userData = await this.extractUserInfo(user)

		return {
			...userData,
			access_token: tokens.access_token,
			refresh_token: tokens.refresh_token,
			expires_at: tokens.expires_at || tokens.expires_in,
			provider: this.options.provider.toUpperCase() as 'GOOGLE' | 'GITHUB'
		}
	}

	get baseUrl() {
		return this.BASE_URL
	}

	set baseUrl(url: string) {
		this.BASE_URL = url
	}

	get providerName() {
		return this.options.provider
	}

	get accessUrl() {
		return this.options.access_url
	}

	get profileUrl() {
		return this.options.profile_url
	}

	get scopes() {
		return this.options.scopes
	}
}