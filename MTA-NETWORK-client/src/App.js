import React, { useState } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import MainRoutes from "./Router/MainRoutes"
import Navbar from "./Components/Navbar"
import Context from "./Components/Auth/AuthApi"

function App() {
  const [user, setUser] = useState({
    email: "",
    fullName: "",
    status: "",
    token: "",
  })

  return (
    <>
      <Context.Provider value={{ user, setUser }}>
        <Router>
          <Navbar />
          <MainRoutes />
        </Router>
      </Context.Provider>
    </>
  )
}

export default App
