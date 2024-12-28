import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useContext } from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import './style.scss'
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext)
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to='/login' />
    }
    return children  // else navigate to homepage
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={'Error 404'} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
