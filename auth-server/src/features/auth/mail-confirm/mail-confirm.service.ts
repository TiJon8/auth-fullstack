import { PrismaService } from '@/infra/prisma/prisma.service';
import { MailService } from '@/libs/mail/mail.service';
import { TokenType } from '@/prisma/__generated__';
import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import { AuthService } from '../auth.service';
import { ConfirmationRequest } from './dto/confirm.dto';
import { UserService } from '@/features/user/user.service';
import { FastifyRequest } from 'fastify';

@Injectable()
export class MailConfirmService {
	public constructor(
		private readonly prisma: PrismaService,
		private readonly mail: MailService,
		private readonly user: UserService,
		@Inject(forwardRef(() => AuthService))
		private readonly auth: AuthService
	) { }

	public async newVerifiction(req: FastifyRequest, dto: ConfirmationRequest) {
		const isTokenExist = await this.prisma.token.findUnique({
			where: {
				token: dto.token,
				type: TokenType.VERIFICATION
			}
		})

		if (!isTokenExist) {
			throw new NotFoundException({ message: 'Токен не найден' })
		}

		const isTokenExpired = new Date(isTokenExist.expiresIn) < new Date()
		if (isTokenExpired) {
			throw new BadRequestException({ message: 'Срок действия токена истек, запросите новый токен' })
		}

		const user = await this.user.findByEmail(isTokenExist.email)

		await this.prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				isVerified: true
			}
		})

		await this.prisma.token.delete({
			where: {
				id: isTokenExist.id,
				type: TokenType.VERIFICATION
			}
		})

		return await this.auth.saveSession(req, user)
	}

	public async sendVerification(email: string) {
		const { email: emailFromToken, token } = await this.generateVerifiedToken(email)

		await this.mail.sendConfirmMail(emailFromToken, token)
		console.log('Отправка почты')

		return { msg: 'OK' }
	}

	private async generateVerifiedToken(email: string) {
		const tokenId = v4()
		const expiresIn = new Date(new Date().getTime() + 900 * 1000)

		const isTokenExist = await this.prisma.token.findFirst({
			where: {
				email,
				type: TokenType.VERIFICATION
			}
		})

		if (isTokenExist) {
			await this.prisma.token.delete({
				where: {
					id: isTokenExist.id,
					type: TokenType.VERIFICATION
				}
			})
		}

		const verificationToken = await this.prisma.token.create({
			data: {
				email,
				expiresIn,
				token: tokenId,
				type: TokenType.VERIFICATION
			}
		})

		return verificationToken
	}
}
