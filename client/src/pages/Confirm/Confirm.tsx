import React, { FC, useContext, useState, useEffect } from 'react';
import PaperContainer from '../../components/PaperContainer/PaperContainer';
import { IConfirmInputs, ICreateInputs, IIputData } from '../../types';
import { cancelButtonText, confirmButtonText, confirmText, createButtonText, createText } from '../../config';
import { Button, Stack, TextField, Typography } from '@mui/material';
import InputsList from '../../components/InputsList/InputsList';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../context';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { userLogin } from '../../store/action-creators/user';
import { IUser, IUserResponse } from '../../types/User';
import { useFetching } from '../../hooks/useFetching';
import AuthService from '../../service/Auth.service';


const createInputs: IIputData[] = [
    {
        key: 'login',
        field: 'text',
        label: 'Логин',
        options: [],
    },
    {
        key: 'password',
        field: 'text',
        label: 'Пароль',
        type: 'password',
        options: [],
    },
    {
        key: 'confirmPassword',
        field: 'text',
        label: 'Повторите пароль',
        type: 'password',
        options: [],
    }
];


const Confirm: FC = () => {
    const [user, setUser] = useState<IUserResponse>();
    const { setSnack } = useContext(AppContext);
    const confirmData = useForm<IConfirmInputs>();
    const { link } = useParams();
    const navigate = useNavigate();

    const [confirm, loading, error] = useFetching(async (data: IConfirmInputs) => {
        if (link) {
            const response = await AuthService.confirm(link, data.login, data.password, data.confirmPassword);
            setUser(response.data);
        }
    });

    const handleSubmit = (data: IConfirmInputs) => {
        if (isEmpty(data)) {
            setSnack([true, 'У вас остались пустые поля!', 'error']);
            return;
        }

        if (data.password !== data.confirmPassword) {
            setSnack([true, 'Пароли не совпадают!', 'error']);
            return;
        }

        confirm(data);
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

    useEffect(() => {
        if (user) {
            setSnack([true, `Сотрудник ${user.user.username} подтвержден, теперь вы можете авторизоваться!`, 'success']);
            navigate('/');
        }
    }, [user]);


    return (
        <PaperContainer onSubmit={confirmData.handleSubmit(handleSubmit)}>
            <Stack gap='16px' maxWidth='400px' margin='auto'>
                <Typography variant='h6'>{confirmText}</Typography>

                <Stack gap='16px'>
                    <InputsList register={confirmData.register} inputs={createInputs} />
                </Stack>

                <Button type='submit' variant='contained'>{confirmButtonText}</Button>
            </Stack>
        </PaperContainer>
    )
}


export default Confirm;