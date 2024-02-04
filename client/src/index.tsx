import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider, theme } from 'antd';
import { store } from './app/store';
import { Paths } from './paths';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Login from './pages/Login';
import Register from './pages/Register';
import { Status } from './pages/Status';
import { Employee } from './pages/Employee';
import { EditEmployee } from './pages/EditEmployee';
import { AddEmployee } from './pages/AddEmployee';
import Layout from './Components/Layout';
import { Auth } from './features/auth/auth';
import './index.css';

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <Layout />,
    children: [
      {
        path: Paths.home,
        element: <App />
      },
      {
        path: Paths.login,
        element: <Login />
      },
      {
        path: Paths.register,
        element: <Register />
      },
      {
        path: Paths.employeeAdd,
        element: <AddEmployee />
      },
      {
        path: `${Paths.status}/:status`,
        element: <Status />
      },
      {
        path: `${Paths.employee}/:id`,
        element: <Employee />
      },
      {
        path: `${Paths.employeeEdit}/:id`,
        element: <EditEmployee />
      },
    ]
  }
])

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={{
        algorithm: theme.darkAlgorithm
      }}>
        <Auth>
          <RouterProvider router={router} />
        </Auth>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
