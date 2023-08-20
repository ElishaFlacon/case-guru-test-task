import { IRoutes } from '../types';
import Change from '../pages/Change/Change';
import Login from '../pages/Login/Login';
import Hr from '../pages/Hr/Hr';
import Worker from '../pages/Worker/Workers';
import Create from '../pages/Create/Create';
import Confirm from '../pages/Confirm/Confirm';


export const publicRoutes: IRoutes[] = [
    // create тут не должно быть, она сделана, чтобы избежать ошибки
    // если бд пустая и нет ни одного hr, то будет не возможно добавить пользователя
    { path: '/create', component: Create },
    { path: '/confirm/:link', component: Confirm },
    { path: '/', component: Login },
];

export const hrRoutes: IRoutes[] = [
    // я точно не знаю, стоит ли давать авторизованым пользователям подтверждать других пользователей, но оставлю вот так
    { path: '/confirm/:link', component: Confirm },
    { path: '/change', component: Change },
    { path: '/create', component: Create },
    { path: '/', component: Hr },
];

export const workerRoutes: IRoutes[] = [
    // я точно не знаю, стоит ли давать авторизованым пользователям подтверждать других пользователей, но оставлю вот так
    { path: '/confirm/:link', component: Confirm },
    // тут точно также как в publicRoutes
    { path: '/create', component: Create },
    { path: '/', component: Worker },
];