export interface IUser {
    login: string;
    username: string;
    position: string;
    POLUCHKA: number;
    birthday: string;
    date_of_hiring: string;
    role: string;
    isWorking: boolean;
    availableLink: string;
    isAvailable: boolean;
}

export interface IUserResponse {
    token: string;
    user: IUser;
}

export interface IUserState {
    data: IUserResponse | null;
    isAuth: boolean;
    loading: boolean;
    error: string | null;
}


export enum UserActionTypes {
    USER_LOGIN = 'USER_LOGIN',
    USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',
    USER_LOGIN_ERROR = 'USER_LOGIN_ERROR',

    USER_CHECK_AUTH = 'USER_CHECK_AUTH',
    USER_CHECK_AUTH_SUCCESS = 'USER_CHECK_AUTH_SUCCESS',
    USER_CHECK_AUTH_ERROR = 'USER_CHECK_AUTH_ERROR',

    USER_LOGOUT = 'USER_LOGOUT',
}


interface IUserLoginAction {
    type: UserActionTypes.USER_LOGIN;
}

interface IUserLoginSuccessAction {
    type: UserActionTypes.USER_LOGIN_SUCCESS;
    payload: IUserResponse;
}

interface IUserLoginErrorAction {
    type: UserActionTypes.USER_LOGIN_ERROR;
    payload: string;
}

type TUserLogin = IUserLoginAction | IUserLoginSuccessAction | IUserLoginErrorAction;


interface IUserCheckAuthAction {
    type: UserActionTypes.USER_CHECK_AUTH;
}

interface IUserCheckAuthSuccessAction {
    type: UserActionTypes.USER_CHECK_AUTH_SUCCESS;
    payload: IUserResponse;
}

interface IUserCheckAuthErrorAction {
    type: UserActionTypes.USER_CHECK_AUTH_ERROR;
    payload: string;
}

type TUserCheckAuth = IUserCheckAuthAction | IUserCheckAuthSuccessAction | IUserCheckAuthErrorAction;


interface IUserLogoutAction {
    type: UserActionTypes.USER_LOGOUT;
}


export type UserAction = TUserLogin | TUserCheckAuth | IUserLogoutAction;
