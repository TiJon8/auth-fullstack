export class FetchError extends Error {
	constructor(statusCode: number, message: string, response?: Response) {
		super(message)

		Object.setPrototypeOf(this, new.target.prototype)
	}
}