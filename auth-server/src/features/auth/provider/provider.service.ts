import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ProviderOptionsSymbol, TOptions } from './provider.constants';
import { BaseOAuthService } from './services/oauth.service';

@Injectable()
export class ProviderService implements OnModuleInit {
	constructor(@Inject(ProviderOptionsSymbol) private readonly options: TOptions) { }

	public onModuleInit() {
		console.log('On module init')
		console.log(this.options)
		for (const service of this.options.services) {
			service.baseUrl = this.options.baseUrl
			console.log(service)
		}
	}

	public findByService(service: string): BaseOAuthService | null {
		console.log('в сервисе')
		console.log(this.options.services[0].providerName)
		console.log(service)
		console.log(this.options.services.find(s => console.log(s.providerName)))
		return this.options.services.find(s => s.providerName === service) ?? null
	}
}
