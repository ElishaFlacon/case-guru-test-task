import React, { FC, useContext, useEffect } from 'react';
import PaperContainer from '../../components/PaperContainer/PaperContainer';
import { Button, Stack, Typography } from '@mui/material';
import InputsList from '../../components/InputsList/InputsList';
import { useForm } from 'react-hook-form';
import { IIputData, ILoginInputs } from '../../types';
import { AppContext } from '../../context';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../store/action-creators/user';
import { authorizationText, createButtonText, loginButtonText, loginText, passwordText } from '../../config';
import { Link } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';


const loginInputs: IIputData[] = [
    {
        key: 'login',
        field: 'text',
        label: loginText,
        options: [],
    },
    {
        key: 'password',
        field: 'text',
        label: passwordText,
        autoComplete: 'off',
        type: 'password',
        options: [],
    },
];


const Login: FC = () => {
    const { isAuth, data, error, loading } = useTypedSelector(state => state.user);
    const { setSnack } = useContext(AppContext);
    const personalData = useForm<ILoginInputs>();

    const dispatch: any = useDispatch();

    const handleSubmit = (data: ILoginInputs) => {
        if (isEmpty(data)) {
            setSnack([true, 'Вы не ввели логин или пароль!', 'error']);
            return;
        }

        dispatch(userLogin(data.login, data.password));
    }

    const isEmpty = (obj: object): boolean => {
        return Object.values(obj).some((item) => item === "");
    }

    useEffect(() => {
        if (error && error !== 'error on check auth') {
            if (error === 'Internal server error' || error === 'Network Error') {
                setSnack([true, 'Что-то пошло не так, попробуйте позже!', 'error']);
                return;
            }
            setSnack([true, error, 'error']);
        }
    }, [error]);


    return (
        <PaperContainer onSubmit={personalData.handleSubmit(handleSubmit)}>
            <Stack gap='16px' maxWidth='400px' margin='auto'>
                <Typography variant='h6'>{authorizationText}</Typography>

                <Stack gap='16px'>
                    <InputsList register={personalData.register} inputs={loginInputs} />
                </Stack>

                <Button type='submit' variant='contained'>{loginButtonText}</Button>

                <Link to='/create'>
                    <Button variant='contained' fullWidth>{createButtonText} (эта кнопка только для демонстрации, чтобы избежать ошибок)</Button>
                </Link>
            </Stack>
        </PaperContainer>
    )
}


export default Login;