import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { render } from '@react-email/components';
import { ResendService } from 'nestjs-resend';
import { ConfirmationTemplate } from './templates/confirmation.template';
import { twoFactorTemplate } from './templates/two-factor.template';
import { PasswordResetTemplate } from './templates/password-reset.template';

@Injectable()
export class MailService {
	constructor(private readonly resend: ResendService, private readonly config: ConfigService) { }

	public async sendConfirmMail(email: string, token: string) {
		const domain = this.config.getOrThrow<string>('ALLOWED_ORIGIN')
		const html = await render(ConfirmationTemplate({ domain, token }))

		// console.log(html)
		// console.log(this.resend)
		// return await this.sendMail(email, 'Подтверждение почты', html)
	}

	public async sendPasswordResetMail(email: string, token: string) {
		const domain = this.config.getOrThrow<string>('ALLOWED_ORIGIN')
		const html = await render(PasswordResetTemplate({ domain, token }))

		// console.log(html)
		// console.log(this.resend)
		// return await this.sendMail(email, 'Подтверждение почты', html)
	}

	public async send2FactorMail(email: string, code: string) {
		const html = await render(twoFactorTemplate({ code }))
		// console.log(html)

		// return await this.sendMail(email, 'Подтверждение входы', html)
	}

	async sendMail(to: string, subject: string, body: string) {

		const a = await this.resend.send({
			from: this.config.getOrThrow<string>('MAIL_HOST'),
			to,
			subject,
			html: body
		});
		console.log(a)
	}
}
