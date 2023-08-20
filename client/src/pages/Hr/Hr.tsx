import React, { FC, useEffect, useMemo, useState } from 'react';
import PaperContainer from '../../components/PaperContainer/PaperContainer';
import { Button, Stack, Typography } from '@mui/material';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import UserInfo from '../../components/UserInfo/UserInfo';
import UsersService from '../../service/Users.service';
import { useFetching } from '../../hooks/useFetching';
import { Line } from 'react-chartjs-2';
import Tabl from '../../components/Tabl/Tabl';
import { IHRTable } from '../../types';
import { allEmployText, allStatsText, birthdayText, changeButtonText, createButtonText, fullTableKeys, personalDataText } from '../../config';
import LogoutButton from '../../components/LogoutButton/LogoutButton';
import { Link } from 'react-router-dom';


const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'График выплта зарплат за год',
        },
    },
};


const Hr: FC = () => {
    const { isAuth, data } = useTypedSelector(state => state.user);
    const [pageData, setPageData] = useState<{
        users: IHRTable[],
        hiring: number,
        dismiss: number,
        birthdays: IHRTable[],
        salary: { monthSalary: number[], monthList: number[] }
    }>();

    const [getPageData] = useFetching(async () => {
        const users = await UsersService.getAll();
        const hiring = await UsersService.getCountHiring();
        const dismiss = await UsersService.getCountDismiss();
        const birthdays = await UsersService.getUpcomingBirthdays();
        const salary = await UsersService.getExpectedSalaryPayments();

        setPageData({ users: users.data, hiring: hiring.data, dismiss: dismiss.data, birthdays: birthdays.data, salary: salary.data });
    });

    const lineChartData = useMemo(() => {
        if (pageData) {
            return {
                labels: pageData.salary.monthList,
                datasets: [
                    {
                        label: 'Сумма выплат',
                        data: pageData.salary.monthSalary,
                        borderColor: "#3333ff",
                        fill: false,
                        tension: 0.5
                    }
                ]
            };
        }
    }, [pageData])

    useEffect(() => {
        getPageData();
    }, [])


    return (
        <Stack gap='32px'>
            <Link to='/create'>
                <Button variant='contained' fullWidth>{createButtonText}</Button>
            </Link>

            <Link to='/change'>
                <Button variant='contained' fullWidth>{changeButtonText}</Button>
            </Link>

            <LogoutButton />

            <PaperContainer>
                <Typography variant='h6' marginBottom='8px'>{personalDataText}</Typography>

                <Stack direction='row' gap='16px'>
                    {data && <UserInfo user={data?.user} />}
                </Stack>
            </PaperContainer>

            <PaperContainer>
                <Typography variant='h6' marginBottom='8px'>{allStatsText}</Typography>

                <Stack gap='4px' marginBottom='16px'>
                    <Typography>{`Нанятых за месяц/год: ${pageData?.hiring}`}</Typography>
                    <Typography>{`Уволеных за месяц/год: ${pageData?.dismiss}`}</Typography>
                </Stack>

                <Typography variant='h6' marginBottom='8px'>{birthdayText}</Typography>
                {pageData && <Tabl keys={fullTableKeys} rows={pageData.birthdays} />}
            </PaperContainer>

            <PaperContainer>
                {lineChartData && <Line data={lineChartData} options={options} />}
            </PaperContainer>

            <PaperContainer>
                <Typography variant='h6' marginBottom='8px'>{allEmployText}</Typography>
                {pageData && <Tabl keys={fullTableKeys} rows={pageData.users} />}
            </PaperContainer>
        </Stack>
    )
}


export default Hr;