export type TSearchParams = {
	[key: string]: string | number | boolean | undefined | (number | string | boolean | undefined)[]
}


export interface IRequestOptions extends RequestInit {
	headers?: Record<string, string>
	params?: TSearchParams
}


export type TFetchRequestConfig<Params = undefined> =
	Params extends undefined
	? { config?: IRequestOptions }
	: { params: Params; config?: IRequestOptions }


const a: TFetchRequestConfig = {}