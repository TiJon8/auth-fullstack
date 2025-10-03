import { IsNotEmpty, IsString } from "class-validator";

export class ConfirmationRequest {
	@IsString({ message: 'Токен должен быть типа string' })
	@IsNotEmpty({ message: 'Токен не должен быть пустой строкой' })
	token: string
}