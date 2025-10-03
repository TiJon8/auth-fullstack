declare module 'fastify' {
	interface Session {
		userId?: string
	}
	interface FastifyRequest {
		user?: any
	}
}