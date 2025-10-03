import { PrismaService } from '@/infra/prisma/prisma.service';
import { MailService } from '@/libs/mail/mail.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class TwoFactorService {
	public constructor(
		private readonly prisma: PrismaService,
		private readonly mail: MailService
	) { }

	public async validate2FactorToken(email: string, code: string) {
		const isTokenExist = await this.prisma.token.findFirst({
			where: {
				email,
				type: 'TWO_FACTOR'
			}
		})

		if (!isTokenExist) {
			throw new NotFoundException({ message: 'Токен не найден' })
		}

		if (isTokenExist.token !== code) {
			throw new BadRequestException({ message: 'Атентификация не прошла, убедитесь, что вы ввели корректный код' })
		}

		const isTokenExpired = new Date(isTokenExist.expiresIn) < new Date()

		if (isTokenExpired) {
			throw new BadRequestException({ message: 'Код больше не действителен, на почту был отправлен новый' })
		}


		await this.prisma.token.delete({
			where: {
				id: isTokenExist.id,
				type: 'TWO_FACTOR'
			}
		})

		return { status: 'OK' }
	}

	public async send2FactorToken(email: string) {
		const { email: emailFromToken, token } = await this.generate2FactorToken(email)

		await this.mail.send2FactorMail(emailFromToken, token)

		return { msg: 'OK' }
	}

	private async generate2FactorToken(email: string) {
		const code = (Math.floor(Math.random() * 1000000 - 100000) + 100000).toString()

		const expiresIn = new Date(new Date().getTime() + 15 * 60 * 1000)

		const isTokenExist = await this.prisma.token.findFirst({
			where: {
				email,
				type: 'TWO_FACTOR'
			}
		})

		if (isTokenExist) {
			await this.prisma.token.delete({
				where: {
					id: isTokenExist.id,
					type: 'TWO_FACTOR'
				}
			})
		}

		return await this.prisma.token.create({
			data: {
				email,
				expiresIn,
				token: code,
				type: 'TWO_FACTOR'
			}
		})
	}
}
