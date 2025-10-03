'use client';

import { NewPassportForm } from "@/features/auth/components";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function NewPassportPage() {
	const router = useRouter()
	const params = useSearchParams()
	const tk = params.get('token')

	useEffect(() => {
		if (!tk) {
			router.push('/auth/password-reset')
		}
	}, [tk])

	return <NewPassportForm />
}