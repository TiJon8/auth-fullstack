import { RegisterRequest } from "@/features/auth/dto/register.dto";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";


@ValidatorConstraint({name: 'isPasswordMatching', async: true})
export class isPasswordMatchingConstraint implements ValidatorConstraintInterface {
	validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
		const obj = validationArguments.object as RegisterRequest
		return obj.password === value
	}

	defaultMessage(validationArguments?: ValidationArguments): string {
		return 'Пароли не совпадают'
	}
}

export function isPasswordMatching(validationOptions?: ValidationOptions) {
	return function (object: Object, propert: any) {
		return registerDecorator({
			propertyName: propert,
			target: object.constructor,
			options: validationOptions,
			validator: isPasswordMatchingConstraint
		})
	}
}