import React, { FC } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablsType } from '../../types';
import classes from './Tabl.module.css';


interface props {
    keys: string[];
    rows: TablsType[];
}


const Tabl: FC<props> = ({ keys, rows }) => {
    return (
        <TableContainer className={classes.table} component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {keys.map((key) => (
                            <TableCell key={key} size='small'>
                                {key}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            {Object.entries(row).map(([key, value], index) => (
                                key !== 'id' && (
                                    <TableCell key={`${row.id} ${index}`} size='small' >
                                        {`${value}`}
                                    </TableCell>
                                )
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}


export default Tabl;