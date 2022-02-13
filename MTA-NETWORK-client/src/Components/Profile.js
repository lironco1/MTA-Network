import React, { useContext } from "react"
import Context from "../Components/Auth/AuthApi"

function Profile() {
  const Auth = useContext(Context)

  return (
    <>
      <div className="w3-card w3-round w3-white">
        <div className="w3-container">
          <h4 className="w3-center">{Auth.user.fullName}</h4>
          <p className="w3-center">
            <img
              src={"/images/avatar3.png"}
              className="w3-circle"
              style={{ height: "106px", width: "106px" }}
              alt="Avatar"
            />
          </p>
          <hr />
          <p>
            <i className="fa fa-envelope fa-fw w3-margin-right w3-text-theme"></i>{" "}
            {Auth.user.email}
          </p>
          <p>
            <i className="fa fa-plane fa-fw w3-margin-right w3-text-theme"></i>{" "}
            {Auth.user.status}
          </p>
        </div>
      </div>
    </>
  )
}

export default Profile
