import React from "react"

function Post({ post }) {
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
        <span className="w3-right w3-opacity">{post.date.split("T")[0]}</span>
        <h4 className="w3-left">{post.userEmail}</h4>
        <br />
        <hr className="w3-clear" />
        <p>{post.text}</p>
        <button
          type="button"
          className="w3-left w3-button w3-theme-d1 w3-margin-bottom"
        >
          <i className="fa fa-thumbs-up"></i> Like
        </button>
        <button
          type="button"
          className="w3-left w3-button w3-theme-d2 w3-margin-bottom"
        >
          <i className="fa fa-comment"></i>  Comment
        </button>
      </div>
    </>
  )
}

export default Post
