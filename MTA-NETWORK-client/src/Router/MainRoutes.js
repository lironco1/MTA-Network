import React from "react"
import { Routes, Route } from "react-router-dom"
import HomePage from "../Components/Pages/HomePage"
import Login from "../Components/Pages/Login"
import Signup from "../Components/Pages/Signup"
import AdminPage from "../Components/Pages/AdminPage"
import AboutPage from "../Components/Pages/AboutPage"
import MessagePage from "../Components/Pages/MessagePage"

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="messages" element={<MessagePage />} />
      <Route path="admin" element={<AdminPage />} />
      <Route path="about" element={<AboutPage />} />
    </Routes>
  )
}

export default MainRoutes
