import { UserService } from '@/features/user/user.service';
import { PrismaService } from '@/infra/prisma/prisma.service';
import { TokenType } from '@/prisma/__generated__';
import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { PasswordResetDTO } from './dto/password-reset.dto';
import { MailService } from '@/libs/mail/mail.service';
import { NewPasswordDTO } from './dto/new-password.dto';
import { hash } from 'argon2';

@Injectable()
export class PasswordRecoveryService {
	public constructor(
		private readonly prisma: PrismaService,
		private readonly user: UserService,
		private readonly mail: MailService,
	) { }

	public async reset(dto: PasswordResetDTO) {
		const isUserExist = await this.user.findByEmail(dto.email)

		if (!isUserExist) {
			return {
				message: 'Пользователь не найден',
				status: 'Fail',
				code: 404
			}
		}

		const passResetToken = await this.generatePassResetToken(isUserExist.email)

		await this.mail.sendPasswordResetMail(isUserExist.email, passResetToken.token)

		return {
			message: 'Сообщение для сброса пароля было отправлено на почту'
		}
	}

	public async setNewPassword(dto: NewPasswordDTO, token: string) {
		const isTokenExist = await this.prisma.token.findFirst({
			where: {
				token,
				type: TokenType.PASSWORD_RESET
			}
		})

		if (!isTokenExist) {
			return {
				message: 'Токен не найден',
				code: 'F_PR'
			}
		}

		const isTokenExpired = new Date(isTokenExist.expiresIn) < new Date()

		if (isTokenExpired) {
			throw new BadRequestException({ message: 'Срок действия токена истек, запросите новый токен', code: 'F_PR' })
		}

		const user = await this.user.findByEmail(isTokenExist.email)

		await this.prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				password: await hash(dto.password)
			}
		})

		await this.prisma.token.delete({
			where: {
				token,
				type: TokenType.PASSWORD_RESET
			}
		})

		return {
			message: 'Пароль сменен',
			status: 'OK',
			resolver: 'PasswordRecovery'
		}

	}

	private async generatePassResetToken(email: string) {
		const tokenId = v4()
		const expiresIn = new Date(new Date().getTime() + 900 * 1000)

		const isTokenExist = await this.prisma.token.findFirst({
			where: {
				email,
				type: TokenType.PASSWORD_RESET
			}
		})

		if (isTokenExist) {
			await this.prisma.token.delete({
				where: {
					id: isTokenExist.id,
					type: TokenType.PASSWORD_RESET
				}
			})
		}

		const passResetToken = await this.prisma.token.create({
			data: {
				email,
				expiresIn,
				token: tokenId,
				type: TokenType.PASSWORD_RESET
			}
		})

		return passResetToken
	}

}
