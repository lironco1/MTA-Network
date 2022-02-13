import React, { useRef } from "react"
import { generateHeaders, URL } from "./Utills/utills"

function SendMessage({ updateMessages }) {
  const sendToInput = useRef()
  const messageInput = useRef()
  const reqSendMsg = generateHeaders("POST")

  function sendMessage() {
    const to = sendToInput.current.value
    const text = messageInput.current.innerHTML
    reqSendMsg.body = JSON.stringify({ to: to, text: text })

    fetch(`${URL}/messages/`, reqSendMsg).then((resHTTP) => {
      resHTTP.json().then((res) => {
        if (resHTTP.status !== 201) alert(res.message)
      })
      updateMessages()
      sendToInput.current.value = ""
      messageInput.current.innerHTML = ""
    })
  }

  return (
    <>
      <div className="w3-row-padding">
        <div className="w3-col m12">
          <div className="w3-card w3-round w3-white">
            <div className="w3-container w3-padding">
              <h6 className="w3-opacity ">Write Message</h6>
              <input
                type="text"
                placeholder="Send To ... (EMAIL)"
                ref={sendToInput}
              />
              <p
                contentEditable="true"
                className="w3-border w3-padding"
                ref={messageInput}
              ></p>
              <button
                type="button"
                className="w3-button w3-theme"
                onClick={sendMessage}
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

export default SendMessage
