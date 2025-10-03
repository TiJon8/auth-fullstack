export type TBaseProviderOpts = {
	provider: 'google' | 'github'
	authorize_url: string
	access_url: string
	profile_url: string
	scopes: string[]
	client_id: string
	client_secret: string
}

export type TProviderOpts = {
	scopes: string[]
	client_id: string
	client_secret: string
}

export type TUserInfo = {
	id: string
	avatar: string
	name: string
	email: string
	access_token?: string | null
	refresh_token?: string
	expires_at?: number
	provider: 'GOOGLE' | 'GITHUB'
}