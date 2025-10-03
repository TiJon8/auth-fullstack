import { PickType } from '@nestjs/mapped-types'
import { RegisterRequest } from './register.dto';
import { IsOptional, IsString } from 'class-validator';

export class LoginRequest extends PickType(RegisterRequest, ['email', 'password'] as const) {
	
	@IsOptional()
	@IsString()
	code: string

}