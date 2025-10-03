'use client';
import { useForm } from "react-hook-form";
import { AuthWrapper } from "./AuthWrapper";
import { RegisterSchema, TRegisterSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/shared/components/ui";
import { useRegister } from "../hooks";

export function RegisterForm() {
	const form = useForm<TRegisterSchema>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			email: '',
			name: '',
			password: '',
			passwordConfirm: ''
		}
	})

	const { mutate, isPending } = useRegister()

	const onSubmit = (values: TRegisterSchema) => { mutate({ values }) }

	return (
		<AuthWrapper header="Регистрация" backButtonLabel="Войти" backButtonString="Уже есть аккуант? " backButtonHref="/auth/login" showSocial>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="my-2 flex flex-col gap-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Имя</FormLabel>
								<FormControl>
									<Input placeholder="Эндж" disabled={isPending} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)} />

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Почта</FormLabel>
								<FormControl>
									<Input placeholder="postecoglou@mail" disabled={isPending} type="email" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)} />

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Почта</FormLabel>
								<FormControl>
									<Input placeholder="parol" disabled={isPending} type="password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)} />

					<FormField
						control={form.control}
						name="passwordConfirm"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Почта</FormLabel>
								<FormControl>
									<Input placeholder="confirm parol" disabled={isPending} type="password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)} />

					<Button type="submit" disabled={isPending} variant={'outline'} className="cursor-pointer py-6 rounded-full text-base">Создать аккаунт</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}