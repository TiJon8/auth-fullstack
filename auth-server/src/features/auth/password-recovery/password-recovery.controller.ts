import { Body, Controller, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { PasswordRecoveryService } from './password-recovery.service';
import { PasswordResetDTO } from './dto/password-reset.dto';
import { NewPasswordDTO } from './dto/new-password.dto';

@Controller('auth/password')
export class PasswordRecoveryController {
	constructor(private readonly passwordRecoveryService: PasswordRecoveryService) { }

	@Post('reset')
	@HttpCode(HttpStatus.OK)
	async reset(@Body() dto: PasswordResetDTO) {
		return this.passwordRecoveryService.reset(dto)
	}

	@Post('new')
	@HttpCode(HttpStatus.OK)
	async newPassword(@Body() dto: NewPasswordDTO, @Query('token') token: string) {
		console.log(token)
		return this.passwordRecoveryService.setNewPassword(dto, token)
	}
}
