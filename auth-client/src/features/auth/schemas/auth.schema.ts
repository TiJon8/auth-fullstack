import z from "zod";


export const RegisterSchema = z.object({
	name: z.string().min(1, 'Поле не должно быть пустым'),
	email: z.email('Должен быть корректный формат почты'),
	password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
	passwordConfirm: z.string().min(6, 'Пароль должен содержать минимум 6 символов')
}).refine((data) => data.password === data.passwordConfirm, { message: 'Пароли не совпадают', path: ['confirmPassword'] })

export type TRegisterSchema = z.infer<typeof RegisterSchema>

export const LoginSchema = z.object({
	email: z.email('Должен быть корректный формат почты'),
	password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),

	code: z.string().optional()
})

export type TLoginSchema = z.infer<typeof LoginSchema>