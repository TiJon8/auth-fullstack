'use client';

import { Button, Card, CardContent, CardHeader, CardTitle, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input, Loading, Switch } from "@/shared/components/ui";
import { useProfile } from "../hooks";
import { ProfileAction, ProfileActionLoading } from "./UserAction";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TUserSettings, UserSettings } from "../shemas";
import { useUpdate } from "../hooks";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function Profile() {
	const { data, isLoading, isError, error } = useProfile()
	const router = useRouter()

	// console.log(typeof error)
	// console.log(error?.message)
	// console.log(data)

	useEffect(() => {
		console.log(error)
		console.log(data)
		if (error?.statusText === 'Unauthorized') {
			router.push('/auth/login')
		}
	}, [error, isLoading])

	const form = useForm<TUserSettings>({
		resolver: zodResolver(UserSettings),
		values: {
			name: data?.name || '',
			email: data?.email || '',
			isTwoFactorEnabled: data?.isTwoFactorEnabled!
		}
	})

	const { mutate, isPending } = useUpdate()

	const onSubmit = (values: TUserSettings) => {
		console.log(values)
		mutate(values)
	}

	return (
		<Card className="w-[400px]">
			<CardHeader className="flex justify-between items-center">
				<CardTitle>Профиль</CardTitle>
				{isLoading ? <ProfileActionLoading /> : <ProfileAction user={data!} />}
			</CardHeader>
			<CardContent>
				{isLoading
					? <Loading />
					: <Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input placeholder="" disabled={isPending} type="text" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)} />

							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input placeholder="" disabled={isPending} type="email" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)} />

							<FormField
								control={form.control}
								name="isTwoFactorEnabled"
								render={({ field }) => (
									<FormItem className="flex flex-row justify-between items-center border rounded-2xl p-3 shadow-sm">
										<div className="flex flex-col justify-between gap-2">
											<FormLabel>Двухфакторная аутентификация</FormLabel>
											<FormDescription>
												Добавьте двухфакторную аутентификацию для вышей учетной записи
											</FormDescription>
										</div>
										<FormControl>
											<Switch checked={field.value} disabled={isPending} onCheckedChange={field.onChange} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)} />
							<Button type="submit" disabled={isPending} variant={'outline'} className="cursor-pointer py-6 rounded-full text-base">Сохранить</Button>
						</form>
					</Form>

				}
			</CardContent>
		</Card>
	)
}