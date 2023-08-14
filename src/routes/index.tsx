import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React from "react";
import Unauth from "./Unauth";
import WelcomeAuthenticationPage from "../pages/unauth/WelcomeAuthenticationPage";
import Register from "../pages/unauth/Register";
import Verification from "../pages/unauth/Verification";
import LoginPage from "../pages/unauth/LoginPage.jsx";
import Hyvepay from "../pages/auth/Hyvepay";
import NewTransaction from "../pages/auth/NewTransaction";
import SavedBeneficiaries from "../pages/auth/SavedBeneficiaries";
import Settings from "../pages/auth/Settings";
import Profile from "../pages/auth/Profile";
import Auth from "./Auth.jsx";

const router = createBrowserRouter([
  {
    //AUTHENTICATION LINKS (UNAUTH)
    element: <Unauth />,
    children: [
      {
        path: "/",
        element: <WelcomeAuthenticationPage />,
        // errorElement: <ErrorPage />,
      },

      {
        path: "/verification",
        element: <Verification />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    // DASHBOARD LINKS (AUTH)
    element: <Auth />,
    children: [
      {
        path: "/dashboard",
        element: <Hyvepay />,
      },

      {
        path: "/logout",
      },
      {
        path: "/hyvepay/transfer",
        element: <NewTransaction />,
      },
      {
        path: "/hyvepay/saved-beneficiaries",
        element: <SavedBeneficiaries />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
