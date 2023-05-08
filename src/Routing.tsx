/** @format */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Fragment } from 'react';
import App from './App';
import ForgotPassword from './layout/Login/ForgotPassword';
import LoginForm from './layout/Login/LoginForm';
import LoginLayout from './layout/LoginLayout';
import DefaultLayout from './layout/DefaultLayout';
import { DeviceDetail, DeviceList, DeviceAdd,DeviceUpdate } from './layout/Device';
const Routing = () => {
  const pages = [
    {
      component: <App />,
      path: '/',
      layout: null,
    },

    {
      component: <DeviceList />,
      path: '/device',
    },
    {
      component: <DeviceDetail />,
      path: '/device-detail',
    },
    {
      component: <DeviceAdd />,
      path: '/device-add',
    },    {
      component: <DeviceUpdate />,
      path: '/device-update',
    },
    {
      component: <LoginForm />,
      path: '/login',
      layout: LoginLayout,
    },
    {
      component: <ForgotPassword />,
      path: '/forgot-password',
      layout: LoginLayout,
    },
    // {
    //   component: <LoginPage />,
    //   path: "/login",
    //   layout: null,
    // },
  ];

  return (
    <Router>
      <Routes>
        {pages.map((route, index) => {
          let page = route.component;

          let Layout =
            route.layout === null ? Fragment : route.layout || DefaultLayout;

          return (
            <Route
              key={index}
              path={route.path}
              element={<Layout>{page}</Layout>}
            />
          );
        })}
      </Routes>
    </Router>
  );
};

export default Routing;