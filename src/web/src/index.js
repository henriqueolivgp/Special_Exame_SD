import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from "react-router-dom";
import { router } from './routes';
import { AuthProvider } from './providers/AuthProvider';
import { ToastContainer } from 'react-toastify';

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <AuthProvider>
                <RouterProvider router={router} />
                <ToastContainer />
            </AuthProvider>
        </ThemeProvider>
    </React.StrictMode>
);
