import React, { useEffect, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import Context from "./Auth/AuthApi"

function Navbar() {
  const Auth = useContext(Context)
  const navigate = useNavigate()

  function openNav() {
    const x = document.getElementById("navDemo")
    if (x.className.indexOf("w3-show") === -1) {
      x.className += " w3-show"
    } else {
      x.className = x.className.replace(" w3-show", "")
    }
  }

  // Runs after EVERY rendering
  useEffect(() => {
    // console.log("NavBar", Auth.user)
  })

  return (
    <>
      {/* Navbar */}
      <div className="w3-hrefp">
        <div className="w3-bar w3-theme-d2 w3-left-align w3-large">
          <div
            className="w3-bar-item  w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2"
            onClick={openNav}
          >
            <i className="fa fa-bars"></i>
          </div>
          <Link
            to="/"
            className="disabled-link w3-bar-item  w3-padding-large w3-theme-d4"
          >
            <i className="fa fa-home w3-margin-right"></i>MTA NETWORK
          </Link>
          <Link
            to="/"
            className="w3-bar-item  w3-hide-small w3-padding-large w3-hover-white"
          >
            <i className="fa fa-globe"></i> Home
          </Link>
          <Link
            to="/messages"
            className="w3-bar-item  w3-hide-small w3-padding-large w3-hover-white"
            title="Messages"
          >
            <i className="fa fa-envelope"></i> Messages
          </Link>
          <Link
            to="/about"
            className="w3-bar-item  w3-hide-small w3-padding-large w3-hover-white"
          >
            <i className="fa fa-info-circle"></i> About
          </Link>

          {Auth.user.token && (
            <Link
              onClick={() => {
                Auth.setUser({})
                sessionStorage.removeItem("email")
                sessionStorage.removeItem("fullName")
                sessionStorage.removeItem("status")
                sessionStorage.removeItem("token")
                navigate("/")
              }}
              to="/"
              className="w3-bar-item  w3-hide-small w3-right w3-padding-large w3-hover-white"
            >
              <span>Logout</span>
            </Link>
          )}

          {/* Admin user!!!!! */}
          {Auth.user.email === "admin@js.com" ? (
            <Link
              to="/admin"
              className="w3-bar-item  w3-hide-small w3-right w3-padding-large w3-hover-white"
            >
              <img
                src={"/images/avatar3.png"}
                className="w3-circle"
                style={{ height: "23px", width: "23px" }}
                alt="Avatar"
              />{" "}
              <span>Admin</span>
            </Link>
          ) : (
            ""
          )}

          {/* Admin user!!!!! */}

          {!Auth.user.token && (
            <>
              <Link
                to="/login"
                className="w3-bar-item w3-hide-small w3-right w3-padding-large w3-hover-white"
              >
                <span>Login</span>
              </Link>
              <Link
                to="/signup"
                className="w3-bar-item w3-hide-small w3-right w3-padding-large w3-hover-white"
              >
                <span>Sign Up</span>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* <!-- Navbar on small screens --> */}
      <div
        id="navDemo"
        className="w3-bar-block w3-theme-d2 w3-hide w3-hide-large w3-hide-medium w3-large"
      >
        <Link to="/" className="w3-bar-item w3-button w3-padding-large">
          My Profile
        </Link>
        <Link to="/messages" className="w3-bar-item w3-button w3-padding-large">
          Messages
        </Link>
        <Link to="/about" className="w3-bar-item w3-button w3-padding-large">
          About
        </Link>
        {/* Admin user! */}
        {Auth.user.email === "admin@js.com" ? (
          <Link to="/admin" className="w3-bar-item w3-button w3-padding-large">
            Admin
          </Link>
        ) : (
          ""
        )}
      </div>
    </>
  )
}

export default Navbar
