export class UserDto {
    readonly id: number;
    readonly login: string;
    readonly username: string;
    readonly password: string;
    readonly role: string;
    readonly birthday: string;
    readonly birthdayMonth: string;
    readonly position: string;
    readonly POLUCHKA: number;
    readonly date_of_hiring: string;
    readonly isWorking: boolean;
    readonly availableLink: string;
    readonly isAvailable: boolean;
}

export class CreateUserDto {
    readonly username: string;
    readonly birthday: string;
    readonly birthdayMonth: string;
    readonly role: string;
    readonly position: string;
    readonly POLUCHKA: number;
    readonly date_of_hiring: string;
    readonly availableLink: string;
}

export class ConfirmUserDto {
    readonly login: string;
    readonly password: string;
    readonly confirmPassword: string;
}

export class FullUsersDto {
    readonly id: number;
    readonly login: string;
    readonly username: string;
    readonly role: string;
    readonly birthday: string;
    readonly position: string;
    readonly POLUCHKA: number;
    readonly date_of_hiring: string;
    readonly isWorking: boolean;
    readonly availableLink: string;
    readonly isAvailable: boolean;

    constructor(model: FullUsersDto) {
        this.id = model.id;
        this.login = model.login;
        this.username = model.username;
        this.position = model.position;
        this.POLUCHKA = model.POLUCHKA;
        this.birthday = model.birthday;
        this.date_of_hiring = model.date_of_hiring;
        this.role = model.role;
        this.isWorking = model.isWorking;
        this.availableLink = model.availableLink;
        this.isAvailable = model.isAvailable;
    }
}

export class MiniUsersDto {
    readonly id: number;
    readonly username: string;
    readonly position: string;
    readonly birthday: string;
    readonly date_of_hiring: string;

    constructor(model: FullUsersDto) {
        this.id = model.id;
        this.username = model.username;
        this.position = model.position;
        this.birthday = model.birthday;
        this.date_of_hiring = model.date_of_hiring;
    }
}