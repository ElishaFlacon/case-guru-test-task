import React, { useState } from 'react';
import AppRouter from './components/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import Snack from './components/Snack/Snack';
import { SnackbarCloseReason } from '@mui/material';
import { AppContext } from './context';
import { CategoryScale, Chart, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js';
import './App.css';


Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


function App() {
    const [snack, setSnack] = useState([]);
    const snackClose = (event: Event | React.SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => {
        if (reason !== 'clickaway') {
            setSnack([]);
        }
    };


    return (
        <AppContext.Provider value={{ setSnack }}>
            <div className="app">
                <BrowserRouter>
                    <AppRouter />
                    <Snack open={snack[0]} text={snack[1]} severity={snack[2]} onClose={snackClose} />
                </BrowserRouter>
            </div>
        </AppContext.Provider>
    );
}


export default App;
