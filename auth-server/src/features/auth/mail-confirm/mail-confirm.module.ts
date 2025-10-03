import { forwardRef, Module } from '@nestjs/common';
import { MailConfirmService } from './mail-confirm.service';
import { MailModule } from '@/libs/mail/mail.module';

import { AuthModule } from '../auth.module';
import { MailConfirmController } from './mail-confirm.controller';
import { UserModule } from '@/features/user/user.module';


@Module({
	imports: [MailModule, forwardRef(() => AuthModule), UserModule],
	controllers: [MailConfirmController],
	providers: [MailConfirmService],
	exports: [MailConfirmService]
})
export class MailConfirmModule { }
