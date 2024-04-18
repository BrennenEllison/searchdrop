import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Root from './routes/root.jsx'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import ErrorPage from './error-page.jsx'
import DropSearchScreen from './pages/DropSearchScreen.jsx';

import './index.css'

const router = createBrowserRouter([
  {
    path:"/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/Home",
        element: <App />
      },
      {
        path: "dropsearch",
        element: <DropSearchScreen />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
