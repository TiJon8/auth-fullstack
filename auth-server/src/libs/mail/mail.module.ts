import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ResendModule } from 'nestjs-resend';
import { useConfigMailer } from '@/configs/mailer.config';

@Module({
	imports: [ResendModule.forRootAsync({
		imports: [ConfigModule],
		useFactory: useConfigMailer,
		inject: [ConfigService]
	})],
	providers: [MailService],
	exports: [MailService]
})
export class MailModule { }
