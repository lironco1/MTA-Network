import React from "react"
import "../Styles/header.css"
import { Link } from "react-router-dom"

function Header({ about }) {
  return (
    <>
      <header>
        <div className="overlay">
          <h1>MTA NETWORK</h1>
          <h2>{document.cookie}</h2>
          {about && (
            <>
              <h3>Welcome to the Social Network</h3>
              <p>
                All rights reserverd to Liron Cohen, Front-end &#38; Back-end
              </p>
            </>
          )}
          {!about && (
            <div>
              <p>You must Authenticate your-self first</p>
              <button>
                <Link to="/login">Login</Link>
              </button>
              <button>
                <Link to="/signup">Sign Up</Link>
              </button>
            </div>
          )}

          <br />
        </div>
      </header>
    </>
  )
}

export default Header
