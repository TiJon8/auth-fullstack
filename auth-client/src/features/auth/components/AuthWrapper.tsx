import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { AuthSocial } from "./AuthSocial";

interface IAuthWrapperProps {
	header: string
	desc?: string
	backButtonLabel?: string
	backButtonString?: string
	backButtonHref?: string
	showSocial?: boolean
}


export function AuthWrapper({
	header,
	children,
	desc,
	backButtonLabel,
	backButtonHref,
	backButtonString,
	showSocial = false
}: PropsWithChildren<IAuthWrapperProps>) {
	return (
		<Card className="w-[400px]">
			<CardHeader>
				<CardTitle className="text-lg font-bold">{header}</CardTitle>
				{desc && (
					<CardDescription>
						{desc}
					</CardDescription>
				)}
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				{showSocial && <AuthSocial />}
				{children}
			</CardContent>
			<CardFooter>
				{backButtonLabel && backButtonHref && (
					<Link href={backButtonHref} className="w-full">
						<p className="w-full font-light text-center text-sm text-muted-foreground">
							{backButtonString} {backButtonLabel}
						</p>
					</Link>
				)}
			</CardFooter>
		</Card>
	)
}