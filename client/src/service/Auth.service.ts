import { $authApi, $api } from "../api";


export default class AuthService {
    static async login(login: string, password: string) {
        return $api.post('/auth/login/', { login, password });
    }

    static async registration(username: string, birthday: string, position: string, POLUCHKA: number, date_of_hiring: string, role: string) {
        return $authApi.post(`/auth/registration`, { username, birthday, position, POLUCHKA, date_of_hiring, role });
    }

    static async confirm(link: string, login: string, password: string, confirmPassword: string) {
        return $authApi.post(`/auth/confirm/${link}`, { login, password, confirmPassword });
    }

    static async getMe() {
        return $authApi.get(`/users/get/me`);
    }
}