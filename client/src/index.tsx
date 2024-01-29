import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { Paths } from './paths';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Layout from './Components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
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
    ]
  }
])

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
