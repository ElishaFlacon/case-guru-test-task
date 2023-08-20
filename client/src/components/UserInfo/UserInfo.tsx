import React, { FC } from 'react';
import { Stack } from '@mui/material';
import { IUser } from '../../types/User';
import { Link } from 'react-router-dom';
import { userInfoKeys } from '../../config';


const UserInfo: FC<{ user: IUser }> = ({ user }) => {
    return (
        <Stack gap='8px'>
            {Object.entries(user).map(([key, value], index) => (
                <Stack key={key} display='flex' direction='row' gap='4px'>
                    {key === 'availableLink'
                        ?
                        <><b>{userInfoKeys[index]}</b> <Link to={`/confirm/${value}`}>{value}</Link></>
                        :
                        <><b>{userInfoKeys[index]}</b> {`${value}`}</>
                    }
                </Stack>
            ))
            }
        </Stack>
    );
}


export default UserInfo;