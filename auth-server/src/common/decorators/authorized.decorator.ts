import { User } from "@/prisma/__generated__";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { FastifyRequest } from "fastify";

export const Authorized = createParamDecorator(
	(data: keyof User, context: ExecutionContext) => {
		const request = context.switchToHttp().getRequest() as FastifyRequest
		const user = request.user

		return data ? user[data] : user
	}
)
