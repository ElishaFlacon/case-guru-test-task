import { Dispatch } from "redux";
import { UserAction, UserActionTypes } from "../../types/User";
import AuthService from "../../service/Auth.service";
import UsersService from "../../service/Users.service";


export const userLogin = (login: string, password: string) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({ type: UserActionTypes.USER_LOGIN });

            const response = await AuthService.login(login, password);
            localStorage.setItem('token', response.data.token);

            dispatch({
                type: UserActionTypes.USER_LOGIN_SUCCESS,
                payload: response.data,
            });
        } catch (error: any) {
            dispatch({
                type: UserActionTypes.USER_LOGIN_ERROR,
                payload: error?.response?.data?.message ? error.response.data.message : error.message,
            });
        }
    }
}

export const userCheckAuth = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({ type: UserActionTypes.USER_CHECK_AUTH });

            const response = await UsersService.getMe();

            dispatch({
                type: UserActionTypes.USER_CHECK_AUTH_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            dispatch({
                type: UserActionTypes.USER_CHECK_AUTH_ERROR,
                payload: 'error on check auth'
            });
        }
    }
}

export const userLogout = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        dispatch({ type: UserActionTypes.USER_LOGOUT });
        localStorage.clear();
    }
}