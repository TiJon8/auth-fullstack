import { BaseOAuthService } from "./oauth.service";
import { TProviderOpts, TUserInfo } from "./types/provider-options.type";

export class GoogleProvider extends BaseOAuthService {
	constructor(options: TProviderOpts) {
		super({
			provider: 'google',
			authorize_url: 'https://accounts.google.com/o/oauth2/v2/auth',
			access_url: 'https://oauth2.googleapis.com/token',
			profile_url: 'https://www.googleapis.com/oauth2/v3/userinfo',
			client_id: options.client_id,
			client_secret: options.client_secret,
			scopes: options.scopes
		})
	}

	public async extractUserData(data: GoogleProfile): Promise<TUserInfo> {
		return super.extractUserInfo({
			email: data.email ?? data.id,
			name: data.name,
			avatar: data.picture
		})
	}
}

interface GoogleProfile extends Record<string, any> {
	aud: string
	azp: string
	email: string
	email_verified: boolean
	exp: number
	family_name?: string
	given_name: string
	hd?: string
	iat: number
	iss: string
	jti?: string
	locale?: string
	name: string
	nbf?: number
	picture: string
	sub: string
	access_token: string
	refresh_token?: string
}
