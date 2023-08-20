import React, { FC } from 'react';
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux';
import { userLogout } from '../../store/action-creators/user';
import { logoutButtonText } from '../../config';


const LogoutButton: FC = () => {
    const dispatch: any = useDispatch();

    return (
        <Button onClick={() => dispatch(userLogout())} variant='contained' color='error' fullWidth>{logoutButtonText}</Button>
    );
}


export default LogoutButton;