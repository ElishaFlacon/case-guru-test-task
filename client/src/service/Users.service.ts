import { $authApi, $api } from "../api";
import { IUser } from "../types/User";


export default class UsersService {
    static async update(user: IUser | any) {
        return $authApi.post(`/users/update`, user);
    }

    static async getMe(): Promise<any> {
        return $authApi.get(`/users/get/me`);
    }

    static async getAll(): Promise<any> {
        return await $authApi.get(`/users/get`);
    }

    static async getCountHiring(): Promise<any> {
        return await $authApi.get(`/users/count/hiring`);
    }

    static async getCountDismiss(): Promise<any> {
        return await $authApi.get(`/users/count/dismiss`);
    }

    static async getUpcomingBirthdays(): Promise<any> {
        return await $authApi.get(`/users/birthdays`);
    }

    static async getExpectedSalaryPayments(): Promise<any> {
        return await $authApi.get(`/users/salary`);
    }
}