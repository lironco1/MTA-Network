import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import Context from "../Auth/AuthApi"
import { initAuth, URL, createUserSession } from "../Utills/utills"

import "../../Styles/form.css"

function Login() {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [alert, setAlert] = useState("")
  const Auth = useContext(Context)

  const navigate = useNavigate()

  function submitLogin(e) {
    e.preventDefault()

    const requestLogin = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: pass }),
    }

    fetch(`${URL}/users/login`, requestLogin).then((resHTTP) => {
      resHTTP.json().then((res) => {
        setAlert(res.message)
        if (resHTTP.status === 200) {
          setAlert((alert) => alert + " Redirect to Home Page...")
          createUserSession(
            res.user.email,
            res.user.fullname,
            res.user.status,
            res.token
          )
          setTimeout(() => {
            initAuth(Auth)
            navigate("/")
          }, 2000)
        }
      })
    })
  }

  return (
    <>
      <div className="form">
        <h1>LOGIN</h1>
        <form>
          <div className="content">
            <h3>{alert && alert}</h3>
            <div className="input-field">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-field">
              <input
                type="password"
                placeholder="Password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
          </div>
          <div className="action">
            <button onClick={submitLogin}>Sign in</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login
