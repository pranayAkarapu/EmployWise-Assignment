import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import App from './App.jsx'
import UsersList from './components/UsersList.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"

const routers =  createBrowserRouter([
  {
    path:"/",
    element: <App />,
  },
  {
    path:"/users",
    element:<UsersList/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routers} />
  </StrictMode>,
)
