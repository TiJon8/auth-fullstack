import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { MailConfirmModule } from './mail-confirm/mail-confirm.module';
import { TwoFactorModule } from './two-factor/two-factor.module';
import { PasswordRecoveryModule } from './password-recovery/password-recovery.module';
import { MailModule } from '@/libs/mail/mail.module';
import { ProviderModule } from './provider/provider.module';
import { useProviderConfig } from '@/configs/provider.config';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
	imports: [UserModule,
		forwardRef(() => MailConfirmModule),
		TwoFactorModule,
		PasswordRecoveryModule,
		ProviderModule.registerAsync({
			imports: [ConfigModule],
			useFactory: useProviderConfig,
			inject: [ConfigService]
		})
	],
	controllers: [AuthController],
	providers: [AuthService],
	exports: [AuthService]
})
export class AuthModule { }
