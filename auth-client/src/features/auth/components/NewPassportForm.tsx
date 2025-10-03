'use client';

import { useForm } from "react-hook-form"
import { useNewPassword } from "../hooks"
import { AuthWrapper } from "./AuthWrapper"
import { zodResolver } from "@hookform/resolvers/zod"
import { NewPasswordSchema, TNewPasswordSchema } from "../schemas"
import { Button, Form, FormControl, FormField, FormItem, FormMessage, Input } from "@/shared/components/ui"

export function NewPassportForm() {
	const { mutate, isPending } = useNewPassword()
	const form = useForm({
		resolver: zodResolver(NewPasswordSchema),
		defaultValues: {
			password: '',
			passwordConfirm: ''
		}
	})

	const onSubmit = (values: TNewPasswordSchema) => {
		console.log(values)
		mutate({ values })
	}

	return (
		<AuthWrapper header="Придумайте новый пароль">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input placeholder="parol" disabled={isPending} type="text" {...field} />
								</FormControl>
								{/* <FormMessage /> */}
							</FormItem>
						)} />

					<FormField
						control={form.control}
						name="passwordConfirm"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input placeholder="confirm" disabled={isPending} type="text" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)} />

					<Button type="submit" disabled={isPending} variant={'outline'} className="cursor-pointer py-6 rounded-full text-base">Сменить</Button>
				</form>
			</Form>

		</AuthWrapper>
	)
}