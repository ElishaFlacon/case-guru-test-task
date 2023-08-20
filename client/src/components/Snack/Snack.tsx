import React, { FC } from 'react';
import { Snackbar, Alert, SnackbarCloseReason, AlertColor } from '@mui/material';


const Snack: FC<{
    open?: boolean,
    onClose?: ((event: Event | React.SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => void) | undefined,
    text?: string,
    severity?: AlertColor,
}> = ({ open, onClose, severity, text }) => {


    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={onClose}
        >
            <Alert severity={severity} sx={{ width: '100%' }}>
                {text}
            </Alert>
        </Snackbar>
    );
}


export default Snack