import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/css/style.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Unauth from "./routes/Unauth.jsx";
import Login from "./pages/unauth/Login";
import Register from "./pages/unauth/Register";
import ErrorPage from "./pages/error/ErrorPage";
import Verification from "./pages/unauth/Verification.jsx";
import Auth from "./routes/Auth.jsx";
import Dashboard from "./pages/auth/Dashboard.jsx";
import Customers from "./pages/auth/Customers.jsx";
import Hyvepay from "./pages/auth/Hyvepay.jsx";
import Inventory from "./pages/auth/Inventory.jsx";
import Service from "./pages/auth/Service.jsx";
import Estimates from "./pages/auth/Estimates.jsx";
import Invoice from "./pages/auth/Invoice.jsx";
import Payment from "./pages/auth/Payment.jsx";
import Expenses from "./pages/auth/Expenses.jsx";
import NewTransaction from "./pages/auth/NewTransaction.jsx";
import SavedBeneficiaries from "./pages/auth/SavedBeneficiaries.jsx";
import WelcomeAuthenticationPage from "./pages/unauth/WelcomeAuthenticationPage.jsx";
import LoginPage from "./pages/unauth/LoginPage.jsx";
import Settings from "./pages/auth/Settings.jsx";
import Profile from "./pages/auth/Profile.jsx";

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
        path: "/register",
        element: <Register />,
      },
      {
        path: "/verification",
        element: <Verification />,
      },
      {
        path: "/login",
        element: <LoginPage />,
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
        path: "/hyvepay/initiate-transaction",
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
