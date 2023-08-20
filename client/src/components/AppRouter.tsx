import React, { FC, useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { hrRoutes, publicRoutes, workerRoutes } from '../router';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { userCheckAuth } from '../store/action-creators/user';


const AppRouter: FC = () => {
    const { isAuth, data } = useTypedSelector(state => state.user);
    const dispatch: any = useDispatch();
    const location = useLocation();

    useEffect(() => {
        if (isAuth) {
            dispatch(userCheckAuth());
        }
    }, [location]);

    useEffect(() => {
        dispatch(userCheckAuth());
    }, []);


    return (
        // тут я достаю роль из локалстораджа, потому что, если досавать его из data, то будет задержка
        // и на доли секунд будет видна форма авторизации
        <Routes>
            {isAuth && localStorage.getItem('role') === 'hr'
                ?
                hrRoutes.map((route) =>
                    <Route
                        key={route.path}
                        path={route.path}
                        element={<route.component />}
                    />
                )
                : isAuth && localStorage.getItem('role') === 'worker' ?
                    workerRoutes.map((route) =>
                        <Route
                            key={route.path}
                            path={route.path}
                            element={<route.component />}
                        />
                    )
                    :
                    publicRoutes.map((route) =>
                        <Route
                            key={route.path}
                            path={route.path}
                            element={<route.component />}
                        />
                    )
            }
            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    );
}


export default AppRouter;