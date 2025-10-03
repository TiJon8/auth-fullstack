import z from "zod";

export const UserSettings = z.object({
	name: z.string().min(1, 'Поле не должно быть пустым'),
	email: z.email('Должен быть корректный формат почты'),
	isTwoFactorEnabled: z.boolean()
})

export type TUserSettings = z.infer<typeof UserSettings>