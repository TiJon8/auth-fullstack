import { isPasswordMatching } from '@/common/decorators/password-matcher.decorator'
import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class RegisterRequest {

	@IsString({ message: 'Поле должно быть типа string' })
	@IsNotEmpty({ message: 'Поле не должно быть пустым' })
	email: string

	@IsString({ message: 'Поле должно быть типа string' })
	@IsNotEmpty({ message: 'Поле не должно быть пустым' })
	name: string

	@IsString({ message: 'Поле должно быть типа string' })
	@IsNotEmpty({ message: 'Поле не должно быть пустым' })
	@MinLength(6, { message: 'Пароль должен содержать минимум 6 символов' })
	password: string

	@IsString({ message: 'Поле должно быть типа string' })
	@IsNotEmpty({ message: 'Поле не должно быть пустым' })
	@MinLength(6, { message: 'Пароль должен содержать минимум 6 символов' })
	@isPasswordMatching({ message: 'Пароли не совпадают' })
	passwordConfirm: string
}