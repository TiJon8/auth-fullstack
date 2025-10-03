import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '@/prisma/__generated__';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) { }

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
			context.getHandler(), context.getClass()
		]);

		if (!requiredRoles) {
			return true;
		}
		if (requiredRoles.length === 1 && requiredRoles.includes(UserRole.COMMON)) {
			return true
		}
		const request = context.switchToHttp().getRequest()
		if (!requiredRoles.includes(request.user.role)) {
			throw new ForbiddenException({ message: 'Недостаточно прав' })
		}

		return true
	}
}