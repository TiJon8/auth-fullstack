import z from "zod";

export const PasswordResetSchema = z.object({
	email: z.email('Должен быть корректный формат почты')
})

export type TPasswordResetSchema = z.infer<typeof PasswordResetSchema>