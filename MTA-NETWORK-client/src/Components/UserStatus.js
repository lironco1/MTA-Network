import React from "react"
import { generateHeaders, URL } from "./Utills/utills"

function UserStatus({ user, updateUserList }) {
  function changeToActive() {
    changeStatus("active")
  }

  function changeToSuspend() {
    changeStatus("suspend")
  }

  function changeStatus(status) {
    const reqChangeStatus = generateHeaders("PATCH")
    reqChangeStatus.body = JSON.stringify({ status: status })

    fetch(`${URL}/users/${user._id}`, reqChangeStatus).then(
      (resHTTP) => {
        console.log(resHTTP)
        updateUserList()
      }
    )
  }

  return (
    <>
      <div className="w3-container">
        <br />
        <span>
          {user.email} is -- {user.status}
        </span>
        <div className="w3-row w3-opacity">
          <div className="w3-half">
            <button
              className="w3-button w3-block w3-green w3-section"
              onClick={changeToActive}
            >
              <i className="fa fa-check"></i>
              <span className="up">active</span>
            </button>
          </div>
          <div className="w3-half">
            <button
              className="w3-button w3-block w3-red w3-section"
              onClick={changeToSuspend}
            >
              <i className="fa fa-remove"></i>
              <span className="up">suspend</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserStatus
