import { buttonVariants } from "@/shared/components/ui";
import Link from "next/link";

export default function Home() {
	return (
		<div className="space-y-5 text-center">
			<h1 className="text-4xl font-medium">Main</h1>
			<div className="flex gap-2">
				<Link href={'/auth/login'} className={buttonVariants()}>Sign in</Link>
				<Link href={'/auth/register'} className={buttonVariants()}>Register</Link>
			</div>
		</div>

	);
}
