import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './users.model';
import { UserDto, FullUsersDto, MiniUsersDto, CreateUserDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { Op } from 'sequelize';
import { getMonthStartEndPoints, getPreviosMonths, getMonthSalary } from 'src/utils';


@Injectable()
export class UsersService {
    constructor(
        @InjectModel(UserModel) private userRepository: typeof UserModel,
        private jwtService: JwtService,
    ) { }

    // создает пользователя, которого необходимо подтвердить и добавить в него пароль и логин
    async create(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        return user;
    }

    // обновляет данные пользователя, для нахождения пользователя используется availableLink
    async update(dto: UserDto) {
        const candidate = await this.userRepository.update(dto, { where: { availableLink: dto.availableLink } });
        // в поле candidate возвращается массив с числом внутри, если внутри 0 то прокидываем ошибку
        if (!candidate[0]) {
            throw new HttpException('Пользователь не был изменен!', HttpStatus.BAD_REQUEST);
        }

        const user = await this.getByLink(dto.availableLink);
        return user;
    }

    // проверяет авторизованость пользователя и отправляет дтошку
    async getMe(authorization: string) {
        const [bearer, token] = authorization.split(' ');

        const { login } = this.jwtService.verify(token);
        const user = await this.getByLogin(login);

        if (!user) {
            throw new UnauthorizedException({ message: 'Пользователя не существует!' });
        }

        return new FullUsersDto(user);
    }

    // получаем всех пользователей
    // в зависимости от роли hr или worker изменяется возвращаемое значение
    async getAll(authorization: string) {
        const [bearer, token] = authorization.split(' ');
        if (bearer !== 'Bearer' || !token) {
            throw new UnauthorizedException({ message: 'Пользователь не авторизован!' });
        }

        const user = this.jwtService.verify(token);
        const users = await this.userRepository.findAll();

        switch (user.role) {
            // сотруднику не обязательно знать о не работающих сотрудниках и о сотрудниках которые не активировали аккаунт
            // поэтому мы убираем их через map, а после фильтруем и убираем пустоты, чтобы отправлялся красивый ответ без множества null
            case 'worker':
                return users.map((user) => {
                    if (user.isWorking && user.isAvailable) {
                        return new MiniUsersDto(user);
                    }
                }).filter((user) => user)
            case 'hr':
                return users.map((user) => new FullUsersDto(user));
        }
    }

    // получаем пользователя по логину
    async getByLogin(login: string) {
        const user = await this.userRepository.findOne({ where: { login } });
        return user;
    }

    // получаем пользователя по availableLink
    async getByLink(availableLink: string) {
        const user = await this.userRepository.findOne({ where: { availableLink } });
        return user;
    }

    // получаем количество нанятых сотрудников в этом месяце и в этом году
    async getCountHiring() {
        const { startMonth, endMonth } = getMonthStartEndPoints();

        const { count } = await this.userRepository.findAndCountAll({
            where: {
                date_of_hiring: { [Op.gt]: startMonth, [Op.lt]: endMonth },
                isWorking: true,
            }
        });

        return count;
    }

    // получаем количество уволеных сотрудников в этом месяце и в этом году
    async getCountDismiss() {
        const { startMonth, endMonth } = getMonthStartEndPoints();

        const { count } = await this.userRepository.findAndCountAll({
            where: {
                date_of_hiring: { [Op.gt]: startMonth, [Op.lt]: endMonth },
                isWorking: false,
            }
        });

        return count;
    }

    // получаем количество сотрудников у которых день рожденье в ближайший месяц
    async getUpcomingBirthdays() {
        const { endMonth } = getMonthStartEndPoints();

        const users = await this.userRepository.findAll({
            where: {
                date_of_hiring: { [Op.gt]: new Date().getDate(), [Op.lt]: endMonth },
                isWorking: true,
                isAvailable: true,
            }
        });

        return users;
    }

    // получаем ожидаемые выплаты ЗП, возвращается объект с
    // массивом с выплатами от текущего месяца и до текущего месяца - 11 месяцев
    // и массивом со списком месяцев от текущего месяца и до текущего месяца - 11 месяцев
    async getExpectedSalaryPayments() {
        // вообще стоило запоминать дату увольнения, чтобы график получился более четким
        // потому что сейчас, если мы уволим человека, то его зп пропадет из графика прошлых месяцев, когда он работал 
        const users = await this.userRepository.findAll({
            where: {
                isAvailable: true,
                isWorking: true,
            }
        });

        const monthSalary = getMonthSalary(users);
        const monthList = getPreviosMonths();

        return { monthSalary, monthList };
    }
}

