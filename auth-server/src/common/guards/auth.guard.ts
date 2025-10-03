import { UserService } from "@/features/user/user.service";
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { FastifyRequest } from "fastify";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly user: UserService) { }

	async canActivate(context: ExecutionContext): Promise<boolean> {

		const request = context.switchToHttp().getRequest() as FastifyRequest
		console.log(request.session)
		if (!request.session.userId) {
			throw new UnauthorizedException({ message: 'Invalid request' })
		}

		const user = await this.user.findById(request.session.userId)

		request.user = user

		return true
	}
}