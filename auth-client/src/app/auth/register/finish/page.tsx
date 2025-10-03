import { AuthWrapper } from "@/features/auth/components/AuthWrapper";

export default function FinishRegistrationPage() {
	return (
		<div>
			<AuthWrapper header="Завершите регистрацию">
				<div>
					Подтвердите почту. Код был выслан на указанную почту.
				</div>
			</AuthWrapper>
		</div>
	)
}