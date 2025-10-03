import { LucideLoader2 } from "lucide-react";

export function Loading() {
	return (
		<div className="flex justify-center items-center">
			<LucideLoader2 className="animate-spin" />
			Загрузка...
		</div>
	)
}