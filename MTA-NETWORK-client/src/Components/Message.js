import React from "react"

function Message({ data }) {
  return (
    <>
      <div className="w3-container w3-card w3-white w3-round w3-margin">
        <br />
        <img
          src={"/images/avatar3.png"}
          alt="Avatar"
          className="w3-left w3-circle w3-margin-right"
          style={{ width: "60px" }}
        />
        <span className="w3-right w3-opacity">{data.date.split("T")[0]}</span>
        <h4 className="w3-left">
          {data.from} <strong>to</strong> {data.to}
        </h4>
        <br />

        <hr className="w3-clear" />
        <br />
        <p>{data.text}</p>
      </div>
    </>
  )
}

export default Message
