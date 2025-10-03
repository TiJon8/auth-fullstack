import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequest } from './dto/register.dto';
import { FastifyRequest } from 'fastify';
import { LoginRequest } from './dto/login.dto';
import { FastifyReply } from 'fastify';
import { ProviderGuard } from '@/common/guards/provider.guard';
import { ProviderService } from './provider/provider.service';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService, private provider: ProviderService, private config: ConfigService) { }

	@Post('register')
	@HttpCode(HttpStatus.CREATED)
	async register(@Body() dto: RegisterRequest) {
		return await this.authService.register(dto)
	}

	@Post('login')
	@HttpCode(HttpStatus.OK)
	async login(@Req() request: FastifyRequest, @Body() dto: LoginRequest) {
		return await this.authService.login(request, dto)
	}

	@Get('oauth/callback/:provider')
	@HttpCode(HttpStatus.OK)
	async connectCallback(
		@Req() request: FastifyRequest,
		@Param('provider') provider: string,
		@Res() response,
		@Query('code') code: string
	) {
		if (!code) {
			throw new BadRequestException({
				message: 'Код аутентификации провайдера не был предоставлен'
			})
		}

		await this.authService.extractAccountFromCode(request, provider, code)

		return response.status(302).redirect(`${this.config.getOrThrow<string>('ALLOWED_ORIGIN')}/me`)
	}


	@UseGuards(ProviderGuard)
	@Get('oauth/connect/:provider')
	@HttpCode(HttpStatus.OK)
	async connect(@Param('provider') provider: string) {
		const providerInstance = this.provider.findByService(provider)
		console.log(providerInstance)

		return {
			url: providerInstance.getOAuthUrl()
		}
	}

	@Get('logout')
	@HttpCode(HttpStatus.OK)
	async logout(@Req() request: FastifyRequest, @Res({ passthrough: true }) response: FastifyReply) {
		return await this.authService.logout(request, response)
	}
}
