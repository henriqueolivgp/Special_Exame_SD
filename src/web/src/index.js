import React from 'react';
import ReactDOM from 'react-dom/client';
import './themes/index.css';
import { RouterProvider } from "react-router-dom";
import { router } from './routes/routes';


import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

import { ThemeModeProvider } from './providers/ThemeModeProvider';
import { MuiThemeProvider } from './providers/MuiThemeProvider';
import { useThemeMode } from './hooks/ThemeHook';

// Mantém as notificações legíveis em ambos os temas
function ThemedToastContainer() {
    const { mode } = useThemeMode();
    return <ToastContainer theme={mode} position="top-right" />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>

        <ThemeModeProvider>
            <MuiThemeProvider>

                <RouterProvider router={router} />

                <ThemedToastContainer />

            </MuiThemeProvider>
        </ThemeModeProvider>

    </React.StrictMode>
);
