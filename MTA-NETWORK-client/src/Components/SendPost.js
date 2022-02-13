import React, { useRef } from "react"
import { generateHeaders } from "./Utills/utills"

function SendPost({ updatePosts }) {
  const postInput = useRef()
  const reqPost = generateHeaders("POST")

  function sendPost() {
    const text = postInput.current.innerHTML
    if (text !== "") {
      reqPost.body = JSON.stringify({ text: text })

      fetch("http://localhost:3000/api/posts/", reqPost).then((resHTTP) => {
        console.log(resHTTP)
        if (resHTTP.status !== 201) {
          alert("Sending post failed!")
        }
        postInput.current.innerHTML = ""
        updatePosts()
      })
    }
  }

  return (
    <>
      <div className="w3-row-padding">
        <div className="w3-col m12">
          <div className="w3-card w3-round w3-white">
            <div className="w3-container w3-padding">
              <h6 className="w3-opacity ">Whats on your mind?</h6>
              <p
                contentEditable
                className="w3-border w3-padding"
                ref={postInput}
              ></p>
              <button
                type="button"
                className="w3-button w3-theme"
                onClick={sendPost}
              >
                <i className="fa fa-pencil"></i> Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SendPost
