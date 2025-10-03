import { ProviderService } from "@/features/auth/provider/provider.service";
import { CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { Request } from "express";
import { FastifyRequest } from "fastify";

@Injectable()
export class ProviderGuard implements CanActivate {
	constructor(private providerService: ProviderService) { }

	canActivate(context: ExecutionContext): boolean {
		const req = context.switchToHttp().getRequest() as Request

		const provider = req.params.provider
		console.log('GUARD ')
		console.log(this.providerService)

		const isInstance = this.providerService.findByService(provider)
		console.log(isInstance)

		if (!isInstance) {
			throw new NotFoundException({ message: `Провадер ${provider} не найден, убедитесь, что вы используете корректного провайдера` })
		}

		return true
	}
}