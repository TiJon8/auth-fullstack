import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { IS_DEV_ENV } from './common/utils/is-dev';
import { InfraModule } from './infra/infra.module';
import { FeatureModule } from './features/feature.module';
import { MailModule } from './libs/mail/mail.module';
import { TwoFactorModule } from './features/auth/two-factor/two-factor.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			ignoreEnvFile: !IS_DEV_ENV
		}),
		InfraModule,
		FeatureModule,
		MailModule,
		TwoFactorModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
