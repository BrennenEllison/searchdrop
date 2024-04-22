import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './routes/root.jsx';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import ErrorPage from './error-page.jsx';

import './index.css';

const router = createBrowserRouter([
  {
    path:"/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
