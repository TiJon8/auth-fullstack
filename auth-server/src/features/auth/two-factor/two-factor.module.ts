import { Module } from '@nestjs/common';
import { TwoFactorService } from './two-factor.service';
import { MailModule } from '@/libs/mail/mail.module';
import { MailService } from '@/libs/mail/mail.service';

@Module({
	imports: [MailModule],
	providers: [TwoFactorService],
	exports: [TwoFactorService]
})
export class TwoFactorModule { }
