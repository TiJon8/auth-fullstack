import { LoginRequest } from "@/features/auth/dto/login.dto";
import { OmitType, PartialType } from "@nestjs/mapped-types";
import { IsBoolean, IsOptional } from "class-validator";

export class UpdateUser extends PartialType(OmitType(LoginRequest, ['code'] as const)) {

	@IsBoolean({ message: 'Значение должно быть типа boolean' })
	@IsOptional()
	isTwoFactorEnabled: boolean
}