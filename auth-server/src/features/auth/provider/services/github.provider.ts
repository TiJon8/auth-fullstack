import { BaseOAuthService } from "./oauth.service"
import { TProviderOpts, TUserInfo } from "./types/provider-options.type"

export class GitHubProvider extends BaseOAuthService {
	constructor(options: TProviderOpts) {
		super({
			provider: 'github',
			authorize_url: 'https://github.com/login/oauth/authorize',
			access_url: 'https://github.com/login/oauth/access_token',
			profile_url: 'https://api.github.com/user',
			client_id: options.client_id,
			client_secret: options.client_secret,
			scopes: options.scopes
		})
	}

	public async extractUserData(data: any): Promise<TUserInfo> {
		return super.extractUserInfo({
			email: data.email ?? data.id,
			name: data.name,
			avatar: data.avatar_url
		})
	}
}