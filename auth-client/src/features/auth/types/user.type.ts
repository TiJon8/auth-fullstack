export enum UserRole {
	ADMIN,
	COMMON
}

export enum AuthMethod {
	CREDENTIALS,
	GOOGLE,
	GITHUB,
}

export interface IUser {
	id: string
	email: string
	password: string
	name: string
	role: UserRole
	avatar: string | undefined
	isVerified: boolean
	isTwoFactorEnabled: boolean
	method: AuthMethod
	createdAt: Date
	updatedAt: Date
	accounts: IUserAccounts[]
}

export interface IUserAccounts {
	id: string
	type: string
	provider: string
	refreshToken: string | null
	accessToken: string | null
	expiresAt: number
	createdAt: Date
	updatedAt: Date
	userId: string | null
}