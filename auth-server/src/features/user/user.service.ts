import { PrismaService } from '@/infra/prisma/prisma.service';
import { AuthMethod } from '@/prisma/__generated__';
import { Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'argon2'
import { UpdateUser } from './dto/update-user.dto';

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) { }


	public async findById(id: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				id
			},
			include: {
				accounts: true
			}
		})

		if (!user) throw new NotFoundException({ status: 404, message: 'Пользователь не найден' })

		return user

	}

	public async findByEmail(email: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				email
			},
			include: {
				accounts: true
			}
		})

		return user
	}

	public async create(email: string, password: string, name: string, method: AuthMethod, isVerified: boolean, avatar?: string) {
		console.log(email)
		return await this.prisma.user.create({
			data: {
				email,
				password: password ? await hash(password) : '',
				name,
				method,
				isVerified,
				avatar
			},
			include: {
				accounts: true
			}
		})
	}

	public async update(id: string, dto: UpdateUser) {
		const user = await this.findById(id)

		return await this.prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				...dto
			}
		})

	}
}
