'use client';
import { useForm } from "react-hook-form";
import { AuthWrapper } from "./AuthWrapper";
import { LoginSchema, TLoginSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/shared/components/ui";
import { useLogin } from "../hooks";
import { useState } from "react";
import Link from "next/link";

export function LoginForm() {
	const form = useForm<TLoginSchema>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		}
	})

	const [show2Factor, setShow2Factor] = useState(false)

	const { login, isPending } = useLogin(setShow2Factor)

	const onSubmit = (values: TLoginSchema) => {
		console.log(values)
		const a = login({ values })
		console.log(a)
	}

	return (
		<AuthWrapper header="Войти" backButtonLabel="Зарегестрироваться" backButtonString="Еще нет аккаунта? " backButtonHref="/auth/register" showSocial>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="my-1 flex flex-col gap-4">
					{!show2Factor && (
						<>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input placeholder="pochta" disabled={isPending} type="email" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)} />

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem className="gap-1">
										<div className="flex justify-end">
											<Link href={'/auth/password-reset'}>
												<span className="inline-block text-sm text-gray-500 hover:text-gray-300 transition">Забыли пароль?</span>
											</Link>
										</div>
										<FormControl>
											<Input placeholder="parol" disabled={isPending} type="password" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)} />
						</>
					)}

					{show2Factor && (
						<FormField
							control={form.control}
							name="code"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder="" disabled={isPending} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)} />
					)}

					<Button type="submit" disabled={isPending} variant={'outline'} className="cursor-pointer py-6 rounded-full text-base">Войти</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}