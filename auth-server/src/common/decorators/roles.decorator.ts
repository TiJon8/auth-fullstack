import { UserRole } from "@/prisma/__generated__"
import { SetMetadata } from "@nestjs/common"


export const ROLES_KEY = Symbol('roles')
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles)
