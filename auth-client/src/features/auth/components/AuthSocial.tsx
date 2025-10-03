'use client';
import { Button } from "@/shared/components/ui";
import { useMutation } from "@tanstack/react-query";
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa6";
import { authService } from "../services";
import { useRouter } from "next/navigation";

export function AuthSocial() {
	const router = useRouter()

	const { mutateAsync } = useMutation({
		mutationKey: ['OAuth'],
		mutationFn: async (provider: string) => (
			await authService.providerConnect(provider)
		)
	})

	const handleClick = async (provider: 'google' | 'github') => {
		const res = await mutateAsync(provider)
		if (res) {
			router.push(res.url)
		}
	}

	return <>
		<div className="grid grid-cols-2 gap-2">
			<Button onClick={() => handleClick('google')} variant={'outline'} className="rounded-full">
				<FaGoogle className="size-4" />
				Google
			</Button>
			<Button onClick={() => handleClick('github')} variant={'outline'} className="rounded-full">
				<FaGithub className="size-4" />
				GitHub
			</Button>
		</div>
		<div className="relative flex justify-center items-center">
			<div className="absolute inset-0 flex items-center">
				<span className="w-full border-t"></span>
			</div>
			<div className="relative flex justify-center text-sm">
				<span className="px-2 bg-card mb-0.5 text-muted-foreground">или</span>
			</div>
		</div>
	</>
}