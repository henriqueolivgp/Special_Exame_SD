import { createBrowserRouter } from "react-router-dom";
import { App } from "../app/App.js";
import { ErrorPage } from "../screens/errorPage.js";
import { Dashboard } from '../screens/Dashboard.js'
import { SignUp } from '../screens/SignUp.js'  
import { SignIn } from '../screens/SignIn.js'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // Pagina de erro
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        // element: (
        //   <PrivateRoutes
        //     element={<LandingPage />}
        //     notHaveAccessNavigateTo="/sign-up"
        //   />
        // ),
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
]);