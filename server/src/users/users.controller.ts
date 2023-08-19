import { Controller, Post, Body, Get, UseGuards, Headers } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';


@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Roles('worker', 'hr')
    @UseGuards(RolesGuard, AuthGuard)
    @Get('/get')
    getAll(@Headers('Authorization') authorization: string) {
        return this.usersService.getAll(authorization);
    }

    @Roles('worker', 'hr')
    @UseGuards(RolesGuard, AuthGuard)
    @Get('/get/me')
    getMe(@Headers('Authorization') authorization: string) {
        return this.usersService.getMe(authorization);
    }

    @Roles('hr')
    @UseGuards(RolesGuard, AuthGuard)
    @Post('/update')
    update(@Body() userDto: UserDto) {
        return this.usersService.update(userDto);
    }

    @Roles('hr')
    @UseGuards(RolesGuard, AuthGuard)
    @Get('/count/hiring')
    getCountHiring() {
        return this.usersService.getCountHiring();
    }

    @Roles('hr')
    @UseGuards(RolesGuard, AuthGuard)
    @Get('/count/dismiss')
    getCountDismiss() {
        return this.usersService.getCountDismiss();
    }

    @Roles('hr')
    @UseGuards(RolesGuard, AuthGuard)
    @Get('/birthdays')
    getUpcomingBirthdays() {
        return this.usersService.getUpcomingBirthdays();
    }

    @Roles('hr')
    @UseGuards(RolesGuard, AuthGuard)
    @Get('/salary')
    getExpectedSalaryPayments() {
        return this.usersService.getExpectedSalaryPayments();
    }
}
