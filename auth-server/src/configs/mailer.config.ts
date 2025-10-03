import { MailerOptions } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";
import { ResendOptions } from 'nestjs-resend'

export const useConfigMailer = async (config: ConfigService): Promise<ResendOptions> => {
	return {
		apiKey: config.getOrThrow<string>('MAIL_API_KEY')
	}
}