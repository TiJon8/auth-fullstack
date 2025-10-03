'use client';

import { PropsWithChildren } from "react";
import { TanstackQueryProvider } from "./tanstack.provider";
import { ThemeProvider } from "./theme.provider";

export function AppProvider({ children }: PropsWithChildren) {
	return (
		<TanstackQueryProvider>
			<ThemeProvider attribute={'class'} defaultTheme={''} enableSystem disableTransitionOnChange>
				{children}
			</ThemeProvider>
		</TanstackQueryProvider>
	)
}