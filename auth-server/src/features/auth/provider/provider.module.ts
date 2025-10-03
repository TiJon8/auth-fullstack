import { DynamicModule, Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ProviderOptionsSymbol, TAsyncOptions, TOptions } from './provider.constants';

@Module({})
export class ProviderModule {
	public static register(options: TOptions): DynamicModule {
		return {
			module: ProviderModule,
			providers: [
				{
					provide: ProviderOptionsSymbol,
					useValue: options.services
				},
				ProviderService
			],
			exports: [ProviderService]
		}
	}

	public static registerAsync(options: TAsyncOptions): DynamicModule {
		return {
			module: ProviderModule,
			imports: options.imports,
			providers: [
				{
					provide: ProviderOptionsSymbol,
					useFactory: options.useFactory,
					inject: options.inject
				},
				ProviderService
			],
			exports: [ProviderService]
		}
	}

}
