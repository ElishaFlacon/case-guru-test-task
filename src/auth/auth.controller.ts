import { Controller, Body, Post, Get, Param, Headers, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfirmUserDto, UserDto } from 'src/users/dto/user.dto';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { AuthGuard } from './auth.guard';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    // вот так должно быть, но чтобы избежать ситуации во время тестов, когда бд пустая
    // сделаю возможность использовать для всех
    // @Roles('hr')
    // @UseGuards(RolesGuard, AuthGuard)
    @Post('/registration')
    registration(@Body() userDto: UserDto) {
        return this.authService.registration(userDto);
    }

    @Post('/login')
    login(@Body() userDto: UserDto) {
        return this.authService.login(userDto);
    }

    @Post('/confirm/:link')
    confirm(@Body() userDto: ConfirmUserDto, @Param('link') link: string) {
        return this.authService.confirmUser(userDto, link);
    }
}
