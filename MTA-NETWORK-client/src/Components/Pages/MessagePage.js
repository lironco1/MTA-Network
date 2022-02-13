import React, { useContext, useEffect, useState } from "react"
import Message from "../Message"
import Profile from "../Profile"
import SendMessage from "../SendMessage"
import Header from "../Header"
import Notification from "../Notification"
import Context from "../Auth/AuthApi"
import { initAuth, generateHeaders, URL } from "../Utills/utills"

function MessagePage() {
  const Auth = useContext(Context)
  const [newMsgCount, setNewMsgCount] = useState(0)
  const [messages, setMessages] = useState([])
  const reqMsgs = generateHeaders("GET")

  function updateMessages() {
    window.location.reload()
  }

  const handleNotify = function (curMsgLength) {
    return function () {
      fetch(`${URL}/messages/`, reqMsgs).then((resHTTP) => {
        resHTTP.json().then((res) => {
          if (curMsgLength < res.length) {
            setNewMsgCount(res.length - curMsgLength)
            curMsgLength = res.length
          }
        })
      })
    }
  }

  async function fetchMessages() {
    const resHTTP = await fetch(`${URL}/messages/`, reqMsgs)
    const response = await resHTTP.json()
    setMessages(response.reverse())
    return response.length
  }

  // Runs ONLY once on inital rendering
  useEffect(() => {
    let inter
    initAuth(Auth)
    fetchMessages().then((msgsLength) => {
      inter = setInterval(handleNotify(msgsLength), 5000)
    })
    if (Auth.user.token) {
      clearInterval(inter)
    }
    return () => {
      clearInterval(inter)
    }
  }, [])

  return (
    <>
      {!Auth.user.token ? (
        <Header about={false} />
      ) : (
        // The Container
        <div
          className="w3-container w3-content"
          style={{ maxWidth: "1400px", marginTop: "80px" }}
        >
          {/* <!-- The Grid --> */}
          <div className="w3-row">
            {/* <!-- Left Column --> */}
            <div className="w3-col m3">
              {/* <!-- Profile --> */}
              <Profile />
              <br />
            </div>
            {/* <!-- END Left Column --> */}

            {/* <!-- Middle Column --> */}
            <div className="w3-col m7">
              <SendMessage updateMessages={fetchMessages} />
              {messages.map((msg) => (
                <Message key={msg._id} data={msg} />
              ))}
            </div>
            {/* <!-- END Middle Column --> */}

            {/* <!-- Right Column --> */}
            <div className="w3-col m2">
              <Notification
                notifyCount={newMsgCount}
                flag={"msgs"}
                updateList={updateMessages}
              />
            </div>
            {/* <!-- END Right Column --> */}
          </div>
          {/* <!-- END Grid --> */}
        </div>
      )}
      {/* END Container */}
    </>
  )
}

export default MessagePage
