import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common';
import { type NestFastifyApplication } from '@nestjs/platform-fastify'
import { FastifyAdapter } from '@nestjs/platform-fastify'
import cors from '@fastify/cors'
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session'
import { ms } from './common/utils/ms';
import { parseBoolean } from './common/utils/parse-boolean';
import { RedisStore } from 'connect-redis'
import { createClient } from 'redis';

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

	const configService = app.get(ConfigService)

	const redis = await createClient({
		url: configService.getOrThrow<string>('REDIS_URI')
	})
		.on("error", (err) => console.log("Redis Client Error", err))
		.connect();


	await app.register(fastifyCookie, {
		secret: configService.getOrThrow<string>('COOKIES_SECRET')
	})

	app.useGlobalPipes(new ValidationPipe({
		transform: true
	}))

	await app.register(cors, {
		credentials: true,
		origin: configService.getOrThrow<string>('ALLOWED_ORIGIN'),
		exposedHeaders: ['set-header'],
		methods: ['GET', 'HEAD', 'POST', 'PATCH']
	})

	await app.register(fastifySession, {
		secret: configService.getOrThrow<string>('SESSION_SECRET'),
		cookieName: configService.getOrThrow<string>('SESSION_NAME'),
		saveUninitialized: false,
		cookie: {
			domain: configService.getOrThrow('SESSION_DOMAIN'),
			maxAge: ms(
				configService.getOrThrow('SESSION_MAX_AGE')
			),
			httpOnly: parseBoolean(
				configService.getOrThrow('SESSION_HTTP_ONLY')
			),
			secure: parseBoolean(
				configService.getOrThrow('SESSION_SECURE')
			),
			sameSite: 'lax'
		},
		store: new RedisStore({
			client: redis,
			prefix: configService.getOrThrow('SESSION_FOLDER')
		})
	})



	await app.listen(configService.getOrThrow('APPLICATION_PORT'));
}
bootstrap();
