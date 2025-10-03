import z from "zod";

export const NewPasswordSchema = z.object({
	password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
	passwordConfirm: z.string().min(6, 'Пароль должен содержать минимум 6 символов')
}).refine((data) => data.password === data.passwordConfirm, { message: 'Пароли не совпадают', path: ['confirmPassword'] })

export type TNewPasswordSchema = z.infer<typeof NewPasswordSchema>