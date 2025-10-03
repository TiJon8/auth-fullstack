import { TOptions } from "@/features/auth/provider/provider.constants";
import { GitHubProvider } from "@/features/auth/provider/services/github.provider";
import { GoogleProvider } from "@/features/auth/provider/services/google.provider";
import { ConfigService } from "@nestjs/config";

export const useProviderConfig = async (config: ConfigService): Promise<TOptions> => (
	{
		baseUrl: config.getOrThrow<string>('APPLICATION_URL'),
		services: [
			new GoogleProvider({
				client_id: config.getOrThrow<string>('GOOGLE_CLIENT_ID'),
				client_secret: config.getOrThrow<string>('GOOGLE_CLIENT_SECRET'),
				scopes: ['email', 'profile']
			}),
			new GitHubProvider({
				client_id: config.getOrThrow<string>('GITHUB_CLIENT_ID'),
				client_secret: config.getOrThrow<string>('GITHUB_CLIENT_SECRET'),
				scopes: ['user', 'project', 'notifications', 'admin:org']
			})
		]
	}
)