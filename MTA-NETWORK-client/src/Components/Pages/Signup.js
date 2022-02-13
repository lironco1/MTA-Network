import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { URL } from "../Utills/utills"
import "../../Styles/form.css"

function Signup() {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [fullname, setFullName] = useState("")
  const [alert, setAlert] = useState("")
  const navigate = useNavigate()

  function submitSignUp(e) {
    e.preventDefault()

    const requestSignUp = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: pass, fullname }),
    }

    fetch(`${URL}/users/signup`, requestSignUp).then((resHTTP) => {
      resHTTP.json().then((res) => {
        setAlert(res.message)
        if (resHTTP.status === 201) {
          setAlert((alert) => alert + " Redirect to Login")
          setTimeout(() => {
            navigate("/login")
          }, 2000)
        }
      })
    })
  }

  return (
    <>
      <div className="form">
        <h1>REGISTER</h1>
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
                type="text"
                placeholder="Full name"
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
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
            <button onClick={submitSignUp}>Sign Up</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Signup
