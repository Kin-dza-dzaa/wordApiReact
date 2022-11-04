import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.less';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { SignInModal } from './App-bar/sign-in-modal';
import { SignUpModal } from './App-bar/sign-up-modal';
import { VerifyUserModal } from './App-bar/verify-modal';
import { Cards } from './main-content/cards/cards';
import { Home } from './main-content/home';
import { About } from './main-content/about';
import { Tips } from './main-content/tips';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Navigate to={"/home"} replace={true} state={{ from: "/" }} />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/collections",
        element: <Cards />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/tips",
        element: <Tips />,
      },
      {
        path: "/sign-in",
        element: <SignInModal />,
      },
      {
        path: "/sign-up",
        element: <SignUpModal />,
      },
      {
        path: "/verify/:verificationCode",
        element: <VerifyUserModal />,
      },
    ]
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RouterProvider router={router} ></RouterProvider>
);

