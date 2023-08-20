import React, { FC, useContext, useEffect, useState } from 'react';
import PaperContainer from '../../components/PaperContainer/PaperContainer';
import { ICreateInputs, IIputData } from '../../types';
import { cancelButtonText, createButtonText, createText } from '../../config';
import { Button, Stack, TextField, Typography } from '@mui/material';
import InputsList from '../../components/InputsList/InputsList';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context';
import { useForm } from 'react-hook-form';
import { useFetching } from '../../hooks/useFetching';
import AuthService from '../../service/Auth.service';


const createInputs: IIputData[] = [
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
];


const Create: FC = () => {
    const { setSnack } = useContext(AppContext);
    const personalData = useForm<ICreateInputs>();

    const [link, setLink] = useState('Cсылка для активации пользователя');

    const [registration, loading, error] = useFetching(async (data: ICreateInputs) => {
        const response = await AuthService.registration(data.username, data.birthday, data.position, data.POLUCHKA, data.date_of_hiring, data.role);
        setLink(`http://localhost:3000/confirm/${response.data.availableLink}`);
        personalData.reset();
    });

    const handleSubmit = (data: ICreateInputs) => {
        if (isEmpty(data)) {
            setSnack([true, 'У вас остались пустые поля!', 'error']);
            return;
        }

        registration(data);
    }

    const isEmpty = (obj: object): boolean => {
        return Object.values(obj).some((item) => item === "");
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
        <PaperContainer onSubmit={personalData.handleSubmit(handleSubmit)}>
            <Stack gap='16px' maxWidth='400px' margin='auto'>
                <Typography variant='h6'>{createText}</Typography>

                <Stack gap='16px'>
                    <InputsList register={personalData.register} inputs={createInputs} />
                </Stack>

                <TextField value={link} disabled />

                <Button type='submit' variant='contained'>{createButtonText}</Button>
                <Link to='/'>
                    <Button variant='contained' color='error' fullWidth>{cancelButtonText}</Button>
                </Link>
            </Stack>
        </PaperContainer>
    )
}


export default Create;