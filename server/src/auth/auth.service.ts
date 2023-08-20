import { HttpStatus, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { CreateUserDto, ConfirmUserDto, UserDto, FullUsersDto } from 'src/users/dto/user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { v4 } from 'uuid';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    // регистрирует пользователя, которого необходимо подтвердить и добавить в него пароль и логин
    async registration(userDto: CreateUserDto) {
        const availableLink = v4();
        const birthdayMonth = new Date(userDto.birthday).getMonth() + 1
        const user = await this.usersService.create({ ...userDto, availableLink, birthdayMonth: String(birthdayMonth) });
        return new FullUsersDto(user);
    }

    async login(userDto: UserDto) {
        const user = await this.validateUser(userDto);
        const token = await this.generateToken(user);
        return { user: new FullUsersDto(user), token };
    }

    // подтверждает пользователя по ссылке
    async confirmUser(userDto: ConfirmUserDto, availableLink: string) {
        const user = await this.usersService.getByLink(availableLink);

        if (!user) {
            throw new HttpException('Этого пользователя не существует!', HttpStatus.BAD_REQUEST);
        }

        if (user.isAvailable) {
            throw new HttpException('Этот пользователь уже зарегистрирован!', HttpStatus.BAD_REQUEST);
        }

        const validate_user = await this.usersService.getByLogin(userDto.login);
        if (validate_user && validate_user.login === userDto.login) {
            throw new HttpException('Пользователь с таким логином уже существует!', HttpStatus.BAD_REQUEST);
        }

        if (userDto.password !== userDto.confirmPassword) {
            throw new HttpException('Пароли не совпадают!', HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const newUser = await this.usersService.update({
            ...user,
            login: userDto.login,
            password: hashPassword,
            isAvailable: true,
            availableLink,
        });
        const token = await this.generateToken(newUser);

        return { user: new FullUsersDto(newUser), token };
    }

    async generateToken(userDto: UserDto) {
        const payload = { id: userDto.id, login: userDto.login, username: userDto.username, role: userDto.role };
        const token = this.jwtService.sign(payload);
        return token;
    }

    // проверяем валидность пользователя
    private async validateUser(userDto: UserDto) {
        const user = await this.usersService.getByLogin(userDto.login);

        if (!user) {
            throw new HttpException('Этого пользователя не существует!', HttpStatus.BAD_REQUEST);
        }

        if (!user.isAvailable) {
            throw new UnauthorizedException({ message: 'Пользователь не подтвержден!' });
        }

        const checkPasswords = await bcrypt.compare(userDto.password, user.password);

        if (!user || !checkPasswords) {
            throw new UnauthorizedException({ message: 'Неверный логин или пароль!' });
        }

        return user;
    }
}
