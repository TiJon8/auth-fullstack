import { UserRole } from "@/prisma/__generated__";
import { applyDecorators, UseGuards } from "@nestjs/common";
import { Roles } from "./roles.decorator";
import { RolesGuard } from "../guards/role.guard";
import { AuthGuard } from "../guards/auth.guard";

export const Authorization = (...roles: UserRole[]) => {
	if (roles.length > 0) {
		return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RolesGuard))
	}

	return applyDecorators(UseGuards(AuthGuard))
}