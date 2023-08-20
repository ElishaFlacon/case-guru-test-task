import React, { FC, useContext, useEffect } from 'react';
import PaperContainer from '../../components/PaperContainer/PaperContainer';
import { IIputData } from '../../types';
import { cancelButtonText, changeButtonText, changeText } from '../../config';
import { Button, Stack, TextField, Typography } from '@mui/material';
import InputsList from '../../components/InputsList/InputsList';
import { Link, } from 'react-router-dom';
import { AppContext } from '../../context';
import { useForm } from 'react-hook-form';
import { IUser, IUserResponse } from '../../types/User';
import { useFetching } from '../../hooks/useFetching';
import UsersService from '../../service/Users.service';


const changeInputs: IIputData[] = [
    {
        key: 'availableLink',
        field: 'text',
        label: 'Токен подтверждения (код из ссылка подтверждения)',
        options: [],
    },
    {
        key: 'login',
        field: 'text',
        label: 'Логин',
        options: [],
    },
    {
        key: 'username',
        field: 'text',
        label: 'Полное имя',
        options: [],
    },
    {
        key: 'position',
        field: 'text',
        label: 'Позиция',
        options: [],
    },
    {
        key: 'POLUCHKA',
        field: 'text',
        label: 'Зарплата',
        type: 'number',
        options: [],
    },
    {
        key: 'birthday',
        field: 'text',
        helperText: 'Дата дня рожденья',
        type: 'date',
        options: [],
    },
    {
        key: 'date_of_hiring',
        field: 'text',
        helperText: 'Дата устройства на работу',
        type: 'date',
        options: [],
    },
    {
        key: 'role',
        field: 'select',
        helperText: 'Роль',
        defaultValue: 'worker',
        options: [
            { value: 'worker', title: 'Сотрудник' },
            { value: 'hr', title: 'HR' },
        ],
    },
    {
        key: 'isWorking',
        field: 'select',
        helperText: 'Он работает',
        defaultValue: 'true',
        options: [
            { value: 'true', title: 'Да' },
            { value: 'false', title: 'Нет' },
        ],
    },
    {
        key: 'isAvailable',
        field: 'select',
        helperText: 'Аккаунт активирован',
        defaultValue: 'true',
        options: [
            { value: 'true', title: 'Да' },
            { value: 'false', title: 'Нет' },
        ],
    },
];


const Change: FC = () => {
    const { setSnack } = useContext(AppContext);
    const changeData = useForm<IUser>();

    const [change, loading, error] = useFetching(async (data: IUser) => {
        // тут мы отделяем пустые поля, потому что иначе они изменят поля пользователя на null
        const fullfieldData = {};
        Object.entries(data).forEach(([key, value]) => {
            if (value !== '') {
                (fullfieldData as any)[key as keyof typeof fullfieldData] = value;
            }
        });

        const response = await UsersService.update(fullfieldData);
        setSnack([true, 'Пользователь изменен!', 'success']);
        changeData.reset();
    });

    const handleSubmit = (data: IUser) => {
        if (!data.availableLink) {
            setSnack([true, 'Поле "токен подтверждения" является обязательным!', 'error']);
            return;
        }
        change(data);
    }


    useEffect(() => {
        if (!loading && error) {
            if (error === 'Internal server error' || error === 'Network Error') {
                setSnack([true, 'Что-то пошло не так, попробуйте позже!', 'error']);
                return;
            }
            setSnack([true, error, 'error']);
        }
    }, [loading, error]);


    return (
        <PaperContainer onSubmit={changeData.handleSubmit(handleSubmit)}>
            <Stack gap='16px' maxWidth='400px' margin='auto'>
                <Typography variant='h6'>{changeText}</Typography>

                <Stack gap='16px'>
                    <InputsList register={changeData.register} inputs={changeInputs} />
                </Stack>

                <Button type='submit' variant='contained'>{changeButtonText}</Button>
                <Link to='/'>
                    <Button variant='contained' color='error' fullWidth>{cancelButtonText}</Button>
                </Link>
            </Stack>
        </PaperContainer>
    )
}


export default Change;