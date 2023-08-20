import { UserActionTypes, IUserState, UserAction, IUser } from "../../types/User";


// здесь очень много махинаций с isAuth, но если их не делать, то когда мы будем перезагружать страницу
// то будем видеть, буквально, на долю секунды форму авторизации

const initalState: IUserState = {
    isAuth: localStorage.getItem('isAuth') ? Boolean(localStorage.getItem('isAuth')) : false,
    data: null,
    loading: false,
    error: null,
}

const saveUser = (user: IUser) => {
    localStorage.setItem('role', user.role);
    localStorage.setItem('isAuth', 'true');
}

const getUser = () => {
    const role = localStorage.getItem('email') || '';
    const isAuth = localStorage.getItem('isAuth') || '';
    return [role, isAuth];
}

const removeUser = () => {
    localStorage.clear();
}

export const userReducer = (state: IUserState = initalState, action: UserAction): IUserState => {
    switch (action.type) {
        case UserActionTypes.USER_LOGIN:
            return { isAuth: false, loading: true, error: null, data: null };
        case UserActionTypes.USER_LOGIN_SUCCESS:
            saveUser(action.payload.user);
            return { isAuth: true, loading: false, error: null, data: action.payload };
        case UserActionTypes.USER_LOGIN_ERROR:
            return { isAuth: false, loading: false, error: action.payload, data: null };

        case UserActionTypes.USER_CHECK_AUTH:
            const [role, isAuth] = getUser();
            return { isAuth: isAuth ? Boolean(isAuth) : false, loading: true, error: null, data: null };
        case UserActionTypes.USER_CHECK_AUTH_SUCCESS:
            saveUser(action.payload.user);
            return { isAuth: true, loading: false, error: null, data: action.payload };
        case UserActionTypes.USER_CHECK_AUTH_ERROR:
            removeUser();
            return { isAuth: false, loading: false, error: action.payload, data: null };

        case UserActionTypes.USER_LOGOUT:
            removeUser();
            return { isAuth: false, loading: false, error: null, data: null };

        default:
            return state;
    }
}