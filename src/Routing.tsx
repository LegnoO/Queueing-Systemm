/** @format */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Fragment } from 'react';
import DashBoard from './layout/DashBoard';
import ForgotPassword from './layout/Login/ForgotPassword';
import LoginForm from './layout/Login/LoginForm';
import LoginLayout from './layout/LoginLayout';
import DefaultLayout from './layout/DefaultLayout';
import {
  DeviceDetail,
  DeviceList,
  DeviceAdd,
  DeviceUpdate,
} from './layout/Device';

import {
  ServiceList,
  ServiceDetail,
  ServiceAdd,
  ServiceUpdate,
} from './layout/Service';

import { SequenceList, SequenceDetail, SequenceAdd } from './layout/Sequence';

import { ReportList } from './layout/Report';

import { RoleList, RoleUpdate, RoleAdd } from './layout/Role';
import { AccountList, AccountAdd, AccountUpdate ,AccountInfo} from './layout/Account';
import ActivityLog from '~/layout/ActivityLog';

const Routing = () => {
  const pages = [
    {
      component: <DashBoard />,
      path: '/',
      layout: null,
    },

    {
      component: <DeviceList />,
      path: '/device-list',
    },
    {
      component: <DeviceDetail />,
      path: '/device-detail/:id',
    },
    {
      component: <DeviceUpdate />,
      path: '/device-update/:id',
    },
    {
      component: <DeviceAdd />,
      path: '/device-add',
    },

    {
      component: <ServiceList />,
      path: '/service-list',
    },
    {
      component: <ServiceDetail />,
      path: '/service-detail/:id',
    },
    {
      component: <ServiceAdd />,
      path: '/service-add',
    },
    {
      component: <ServiceUpdate />,
      path: '/service-update/:id',
    },
    {
      component: <SequenceList />,
      path: '/sequence-list',
    },
    {
      component: <SequenceDetail />,
      path: '/sequence-detail/:id',
    },
    {
      component: <SequenceAdd />,
      path: '/sequence-add',
    },
    {
      component: <ReportList />,
      path: '/report-list',
    },
    {
      component: <RoleList />,
      path: '/role-list',
    },
    {
      component: <RoleUpdate />,
      path: '/role-update/:id',
    },
    {
      component: <RoleAdd />,
      path: '/role-add',
    },
    {
      component: <AccountInfo />,
      path: '/account-info',
    },
    {
      component: <AccountList />,
      path: '/account-list',
    },
    {
      component: <AccountAdd />,
      path: '/account-add',
    },
    {
      component: <AccountUpdate />,
      path: '/account-update/:id',
    },
    {
      component: <ActivityLog />,
      path: '/activity',
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

// {routes.map((route, index) => {
//   const { path, element, layout } = route;
//   const Layout = layout || DefaultLayout;

//   return (
//     <Route key={index} path={path} element={<Layout>{element}</Layout>} />
//   );
// })}
