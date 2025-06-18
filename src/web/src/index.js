import React from 'react';
import ReactDOM from 'react-dom/client';
import './themes/index.css';
import { RouterProvider } from "react-router-dom";
import { router } from './routes/routes';


import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>

        <ThemeProvider theme={darkTheme}>
            <CssBaseline />

            <RouterProvider router={router} />

            <ToastContainer />

        </ThemeProvider>

    </React.StrictMode>
);
