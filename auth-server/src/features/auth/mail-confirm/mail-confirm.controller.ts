import { Body, Controller, HttpCode, HttpStatus, Post, Req } from "@nestjs/common";
import { FastifyRequest } from "fastify";
import { ConfirmationRequest } from "./dto/confirm.dto";
import { MailConfirmService } from "./mail-confirm.service";

@Controller('auth/confirm')
export class MailConfirmController {
	constructor(private readonly mailConfirm: MailConfirmService) {}

	@Post()
	@HttpCode(HttpStatus.OK)
	async newVerification(@Req() request: FastifyRequest, @Body() dto: ConfirmationRequest) {
		return await this.mailConfirm.newVerifiction(request, dto)
	}
}