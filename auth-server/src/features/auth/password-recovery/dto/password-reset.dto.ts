import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class PasswordResetDTO {

	@IsNotEmpty({ message: 'Поле не должно быть пустым' })
	@IsEmail({}, { message: 'Поле должно содержать валидный mail' })
	email: string
}