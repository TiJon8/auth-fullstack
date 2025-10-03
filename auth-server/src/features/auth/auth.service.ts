import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterRequest } from './dto/register.dto';
import { PrismaService } from '@/infra/prisma/prisma.service';
import { UserService } from '../user/user.service';
import { AuthMethod, User } from '@/prisma/__generated__';
import { FastifyRequest } from 'fastify';
import { LoginRequest } from './dto/login.dto';
import { verify } from 'argon2';
import { FastifyReply } from 'fastify';
import { ConfigService } from '@nestjs/config';
import { MailConfirmService } from './mail-confirm/mail-confirm.service';
import { TwoFactorService } from './two-factor/two-factor.service';
import { ProviderService } from './provider/provider.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly user: UserService,
		private readonly config: ConfigService,
		private readonly mailConfirm: MailConfirmService,
		private readonly twoFactor: TwoFactorService,
		private readonly prisma: PrismaService,
		private readonly provider: ProviderService
	) { }

	public async register(dto: RegisterRequest) {
		const { email, password, name } = dto
		const isExist = await this.user.findByEmail(email)

		// console.log(isExist)

		if (isExist) throw new BadRequestException({ status: 400, message: 'Bad request' })

		const user = await this.user.create(email, password, name, AuthMethod.CREDENTIALS, false)

		await this.mailConfirm.sendVerification(user.email)
		console.log('После отправки почты')
		return {
			message: "Регистрация прошла успешно, код подтверждения был отправлен на почту",
			context: {
				email: user.email
			}
		}
		// return await this.saveSession(req, user)
	}

	public async login(req: FastifyRequest, dto: LoginRequest) {
		const user = await this.user.findByEmail(dto.email)

		if (!user || !user.password) throw new NotFoundException()

		const isPasswordCorrect = await verify(user.password, dto.password)

		if (!isPasswordCorrect) throw new UnauthorizedException({ message: 'Пароль не верный' })

		if (!user.isVerified) {
			return {
				message: 'Ваша почта не подстверждена',
				context: {
					email: user.email
				},
				status: {
					issue: 'Not Confirm'
				}
			}
		}

		if (user.isTwoFactorEnabled) {
			if (!dto.code) {
				await this.twoFactor.send2FactorToken(user.email)

				return {
					message: 'У вас включена двухфакторная аутентификация, на вашу почту был отправлен код подтверждения',
					protected: {
						reason: 'Two-Factor',
						method: 'email',
					},
					context: {
						email: user.email
					}
				}
			}

			await this.twoFactor.validate2FactorToken(user.email, dto.code)
		}

		return this.saveSession(req, user)
	}

	public async extractAccountFromCode(req: FastifyRequest, provider: string, code: string) {
		const providerInstance = this.provider.findByService(provider)
		const profile = await providerInstance.findUserByCode(code)
		console.log(profile)

		const account = await this.prisma.account.findFirst({
			where: {
				id: typeof profile.id === 'string' ? profile.id : String(profile.id),
				provider: profile.provider
			}
		})

		console.log(account)
		console.log(profile.id)

		let user = account?.userId ? await this.user.findById(account.userId) : null

		if (user) {
			return this.saveSession(req, user)
		}

		user = await this.user.create(
			profile.email ?? String(profile.id),
			'',
			profile.name,
			profile.provider,
			true,
			profile.avatar)

		if (!account) {
			await this.prisma.account.create({
				data: {
					userId: user.id,
					type: 'OAuth',
					provider: profile.provider,
					expiresAt: profile.expires_at,
					accessToken: profile.access_token,
					refreshToken: profile.refresh_token,
				}
			})
		}

		return this.saveSession(req, user)

	}

	public async logout(req: FastifyRequest, res: FastifyReply): Promise<void> {
		return new Promise((resolve, reject) => {
			req.session.destroy(err => {
				if (err) {
					return reject(new InternalServerErrorException({ message: 'Сессия уже не действительна' }))
				}

				res.clearCookie(this.config.getOrThrow<string>('SESSION_NAME'))
				resolve()
			})
		})
	}

	public saveSession(req: FastifyRequest, user: User) {
		return new Promise((resolve, reject) => {
			// console.log(req.session)
			req.session.userId = user.id

			req.session.save(err => {
				if (err) {
					return reject(
						new InternalServerErrorException({ message: 'Session exception' })
					)
				}

				resolve(user)
			})
		})
	}
}
