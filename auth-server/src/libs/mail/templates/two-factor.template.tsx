import { Body, Container, Heading, Html, Section, Tailwind, Text } from "@react-email/components";
import * as React from "react";

export function twoFactorTemplate({ code }: { code: string }) {
	const otp = String(code).split('')
	return (
		<Tailwind>
			<Html>
				<Body>
					<Section className="w-full h-screen bg-white flex justify-center items-center font-sans">
						<Container className="w-[70%] mx-auto max-w-md p-6 h-fit rounded-2xl border border-b-neutral-100 flex flex-col gap-8">
							<Section className="">
								<Heading className="font-thin text-center text-gray-700 text-xl mb-4">
									Завершите вход в приложение
								</Heading>
								<Section className="flex flex-col items-center gap-4">
									<Text className="text-gray-400">Код двухфакторной аутентификации:</Text>
									<div className="text-center whitespace-nowrap ">
										{otp.map((num, i) => (
											<div key={i} className="inline-block text-center mr-2 px-3 py-2 border rounded-lg text-2xl font-light text-gray-600">
												<span className="w-fit h-fit inline-block">
													{num}
												</span>
											</div>
										))}
									</div>
								</Section>
							</Section>
							<Section className="flex flex-col gap-2">
								<Section className="border-t"></Section>
								<Text className="text-base text-gray-400 text-left">
									Если вы не проходите процесс аутентификации и не запрашивали код подтверждения, проигнорируйте это сообщение
								</Text>
							</Section>

						</Container>
					</Section>
				</Body>
			</Html>
		</Tailwind>
	);
}