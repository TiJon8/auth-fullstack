'use client';

import { IUser } from "@/features/auth/types";
import { useLogout } from "../hooks";
import { Avatar, AvatarFallback, AvatarImage, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Skeleton } from "@/shared/components/ui";
import { LuLogOut } from "react-icons/lu";
import { useEffect, useState } from "react";

interface IProfileAction {
	user: IUser
}

export function ProfileAction({ user }: IProfileAction) {
	const { mutate, isPending } = useLogout()


	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarImage src={user?.avatar} />
					<AvatarFallback>
						{user?.name.slice(0, 1)}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-40' align='end'>
				<DropdownMenuItem
					disabled={isPending}
					onClick={() => mutate()}
				>
					<LuLogOut className='mr-2 size-4' />
					Выйти
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export function ProfileActionLoading() {
	return <Skeleton className='h-10 w-10 rounded-full' />
}