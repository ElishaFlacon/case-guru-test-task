import React, { FormEventHandler } from 'react';
import classes from './PaperContainer.module.css';
import { Paper } from '@mui/material';


const PaperContainer: React.FC<{ children: React.ReactNode, onSubmit?: FormEventHandler<HTMLFormElement>; }> = ({ children, onSubmit }) => {
    return (
        <Paper
            className={classes.paper}
            component='form'
            elevation={2}
            onSubmit={onSubmit}
        >
            {children}
        </Paper>
    )
}


export default PaperContainer;