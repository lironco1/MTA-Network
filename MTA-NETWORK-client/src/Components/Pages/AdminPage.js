import React, { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import AdminMessage from "../AdminMessage"
import Profile from "../Profile"
import UserStatus from "../UserStatus"
import {
  URL,
  initAuth,
  generateHeaders,
  ADMIN_EMAIL,
} from "../Utills/utills"
import Context from "../Auth/AuthApi"

function AdminPage() {
  const [users, setUsers] = useState([])
  const Auth = useContext(Context)
  const navigate = useNavigate()

  const reqPosts = generateHeaders("GET")

  async function fetchUsers() {
    fetch(`${URL}/users/`, reqPosts).then((resHTTP) => {
      resHTTP.json().then((res) => {
        setUsers(res)
      })
    })
  }

  function updateUserList() {
    fetchUsers()
  }

  // Runs ONCE on inital Rendering
  useEffect(() => {
    if (sessionStorage.getItem("email") !== ADMIN_EMAIL) {
      navigate("/")
    }
    console.log("Home page useEffect")
    initAuth(Auth)
    fetchUsers()
  }, [])

  return (
    <>
      {/* <!-- The Container --> */}
      <div
        className="w3-container w3-content"
        style={{ maxWidth: "1400px", marginTop: "80px" }}
      >
        {/* <!-- The Grid --> */}
        <div className="w3-row">
          {/* <!-- Left Column --> */}
          <div className="w3-col m3">
            <Profile />
            <br />
          </div>

          {/* <!-- END Left Column --> */}

          {/* <!-- Middle Column --> */}
          <div className="w3-col m7 w3-row-padding">
            <AdminMessage />
            <br />
            <div className="w3-card w3-round w3-white w3-center">
              {users.map((user) => (
                <UserStatus
                  key={user._id}
                  user={user}
                  updateUserList={updateUserList}
                />
              ))}
            </div>
          </div>
          {/* <!-- END Middle Column --> */}

          {/* <!-- Right Column --> */}
          <div className="w3-col m2"></div>
          {/* <!-- END Right Column --> */}
        </div>
        {/* <!-- END Grid --> */}
      </div>
      {/* <!-- END Container --> */}
    </>
  )
}

export default AdminPage
