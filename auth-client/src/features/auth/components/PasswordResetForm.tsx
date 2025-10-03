'use client';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { PasswordResetSchema, TPasswordResetSchema } from "../schemas"
import { AuthWrapper } from "./AuthWrapper"
import { Button, Form, FormControl, FormField, FormItem, FormMessage, Input } from "@/shared/components/ui"
import { usePasswordReset } from "../hooks"

export function PasswordResetForm() {
	const form = useForm<TPasswordResetSchema>({
		resolver: zodResolver(PasswordResetSchema),
		defaultValues: {
			email: ''
		}
	})

	const { mutate, isPending } = usePasswordReset()

	const submit = (values: TPasswordResetSchema) => {
		mutate({ values })
	}

	return (
		<AuthWrapper header="Сброс пароля" backButtonLabel="Войти" backButtonString="Уже есть аккуант? " backButtonHref="/auth/login">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(submit)} className="flex flex-col gap-4">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								{/* <FormLabel>Имя</FormLabel> */}
								<FormControl>
									<Input placeholder="pochta" disabled={isPending} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)} />

					<Button type="submit" disabled={isPending} variant={'outline'} className="cursor-pointer py-6 rounded-full text-base">Сбросить</Button>
				</form>
			</Form>

		</AuthWrapper>
	)
}