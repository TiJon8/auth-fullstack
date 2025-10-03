import { PickType } from "@nestjs/mapped-types";
import { RegisterRequest } from "../../dto/register.dto";

export class NewPasswordDTO extends PickType(RegisterRequest, ['password', 'passwordConfirm'] as const) { }