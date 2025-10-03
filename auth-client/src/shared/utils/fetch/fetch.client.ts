

import { FetchError } from "./fetch.errors"
import { IRequestOptions, type TSearchParams } from "./fetch.types"

interface IConstructOptions {
	baseUrl: string
	headers?: Record<string, string>
	params?: TSearchParams
	options?: IRequestOptions
}

export class FetchClient {
	private baseUrl: string
	public headers?: Record<string, string>
	public params?: TSearchParams
	public options?: IRequestOptions

	public constructor(construct: IConstructOptions) {
		this.baseUrl = construct.baseUrl
		this.headers = construct.headers
		this.params = construct.params
		this.options = construct.options
	}

	private createSearchParams(params: TSearchParams) {
		const searchParams = new URLSearchParams()

		for (const key in { ...this.params, ...params }) {
			if (Object.prototype.hasOwnProperty.call(params, key)) {
				const value = params[key]

				if (Array.isArray(value)) {
					value.forEach(currentValue => {
						if (currentValue) {
							searchParams.append(key, currentValue.toString())
						}
					})
				} else if (value) {
					searchParams.set(key, value.toString())
				}
			}
		}

		return `${searchParams.toString()}`
	}

	private async request<T>(endpoint: string, method: RequestInit['method'], options: IRequestOptions = {}) {
		let url = `${this.baseUrl}/${endpoint}`

		if (options.params) {
			url += this.createSearchParams(options.params)
		}

		const config: RequestInit = {
			method,
			...(!!this.options && { ...this.options }),
			...options,
			headers: {
				...this.headers,
				...(!!options?.headers && options.headers),
			}
		}



		const response = await fetch(url, config)

		if (!response.ok) {
			console.log(response)
			return (response)
			// throw new FetchError(response.status, response.statusText, response)

		}

		if (response.headers.get('Content-Type')?.includes('application/json')) {
			return (await response.json()) as unknown as T
		} else {
			return (await response.text()) as unknown as T
		}
	}

	public get<T>(endpoint: string, options: Omit<IRequestOptions, 'body'> = {}) {
		return this.request<T>(endpoint, 'GET', options)
	}

	public post<T>(
		endpoint: string,
		body?: Record<string, any>,
		options: IRequestOptions = {}
	) {
		return this.request<T>(endpoint, 'POST', {
			...options,
			headers: {
				'Content-Type': 'application/json',
				...(options?.headers || {})
			},
			...(!!body && { body: JSON.stringify(body) })
		})
	}

	public patch<T>(
		endpoint: string,
		body?: Record<string, any>,
		options: IRequestOptions = {}
	) {
		return this.request<T>(endpoint, 'PATCH', {
			...options,
			headers: {
				'Content-Type': 'application/json',
				...(options?.headers || {})
			},
			...(!!body && { body: JSON.stringify(body) })
		})
	}
}

// const a = new FetchClient({ baseUrl: '/api' })

// console.log(a.testSearchParams({ 'user': '1' }))