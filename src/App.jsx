import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from './auth/Login'
import { SignUp } from './auth/SignUp'
import { BookingForm } from './pages/BookingForm'
import { Layout } from './layout/Layout'
import ProtectedRoute from './protectedRoute'
import { NotFound } from './pages/NotFound'
import { Provider } from 'react-redux'
import { store } from './redux/store/store'
import { VerifyEmail } from './auth/VerifyEmail'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Login />
        },
        {
          path: "/signup",
          element: <SignUp />
        },
        {
          path: "/verifyemail",
          element: <VerifyEmail />
        },
        {
          path: "dashboard",
          element: <ProtectedRoute element={<BookingForm />} />
        }
      ]
    },
    {
      path: "*",
      element: <NotFound />
    }
  ])

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  )
}

export default App
