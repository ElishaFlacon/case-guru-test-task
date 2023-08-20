import React, { FC, useEffect, useState } from 'react';
import PaperContainer from '../../components/PaperContainer/PaperContainer';
import { Button, Stack, Typography } from '@mui/material';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import UserInfo from '../../components/UserInfo/UserInfo';
import UsersService from '../../service/Users.service';
import { useFetching } from '../../hooks/useFetching';
import Tabl from '../../components/Tabl/Tabl';
import { IHRTable } from '../../types';
import { allEmployText, createButtonText, miniTableKeys, personalDataText } from '../../config';
import { Link } from 'react-router-dom';
import AuthService from '../../service/Auth.service';
import LogoutButton from '../../components/LogoutButton/LogoutButton';


const Worker: FC = () => {
    const { isAuth, data } = useTypedSelector(state => state.user);
    const [pageData, setPageData] = useState<{ users: IHRTable[] }>();

    const [getPageData] = useFetching(async () => {
        const users = await UsersService.getAll();
        setPageData({ users: users.data });
    });

    useEffect(() => {
        getPageData();
    }, [])


    return (
        <Stack gap='32px'>
            <Link to='/create'>
                <Button variant='contained' fullWidth>{createButtonText}</Button>
            </Link>

            <LogoutButton />

            <PaperContainer>
                <Typography variant='h6' marginBottom='8px'>{personalDataText}</Typography>

                <Stack direction='row' gap='16px'>
                    {data && <UserInfo user={data?.user} />}
                </Stack>
            </PaperContainer>

            <PaperContainer>
                <Typography variant='h6' marginBottom='8px'>{allEmployText}</Typography>
                {pageData && <Tabl keys={miniTableKeys} rows={pageData.users} />}
            </PaperContainer>
        </Stack>
    )
}


export default Worker;