import { FetchClient } from "../utils";

export const api = new FetchClient({
	baseUrl: (process.env.NEXT_PUBLIC_APPLICATION_URL) as string,
	options: {
		credentials: 'include'
	}
})