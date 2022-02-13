import React from "react"


function Notification({ notifyCount, flag, updateList }) {
  return (
    <>
      <div className="w3-card w3-round w3-white w3-center">
        <div className="w3-container">
          <h3>Notification</h3>
          {flag === "posts" && (
            <p onClick={updateList}>{notifyCount} New Posts</p>
          )}
          {flag === "msgs" && (
            <p onClick={updateList}>{notifyCount} New Messages</p>
          )}
        </div>
      </div>
      <br />
    </>
  )
}

export default Notification
