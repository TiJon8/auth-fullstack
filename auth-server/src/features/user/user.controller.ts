import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRole } from '@/prisma/__generated__';
import { Authorization } from '@/common/decorators/authorization.decorator';
import { Authorized } from '@/common/decorators/authorized.decorator';
import { UpdateUser } from './dto/update-user.dto';


@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) { }

	@Authorization('COMMON')
	@Get('me')
	@HttpCode(HttpStatus.OK)
	getMe(@Authorized('id') id: string) {
		return this.userService.findById(id)
	}

	@Authorization('COMMON')
	@Patch('profile')
	@HttpCode(HttpStatus.OK)
	patch(@Authorized('id') id: string, @Body() dto: UpdateUser) {
		return this.userService.update(id, dto)
	}

	@Authorization('ADMIN')
	@Get(':id')
	@HttpCode(HttpStatus.OK)
	getById(@Param('id') id: string) {
		return this.userService.findById(id)
	}

	@Authorization()
	@Get()
	ping() {
		return 'pong'
	}
}
