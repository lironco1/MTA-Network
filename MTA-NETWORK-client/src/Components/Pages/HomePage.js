import React, { useState, useEffect, useContext } from "react"
import SendPost from "../SendPost"
import Post from "../Post"
import Profile from "../Profile"
import Header from "../Header"
import Notification from "../Notification"
import Context from "../Auth/AuthApi"
import { initAuth, generateHeaders, URL } from "../Utills/utills"

function HomePage() {
  const Auth = useContext(Context)
  const [newPostCount, setNewPostCount] = useState(0)
  const [posts, setPosts] = useState([])
  const reqPosts = generateHeaders("GET")

  async function updatePosts() {
    window.location.reload()
  }

  const handleNotify = function (curPostLength) {
    return function () {
      fetch(`${URL}/posts/`, reqPosts).then((resHTTP) => {
        resHTTP.json().then((res) => {
          if (curPostLength < res.length) {
            setNewPostCount(res.length - curPostLength)
            curPostLength = res.length
          }
        })
      })
    }
  }

  async function fetchPosts() {
    const resHTTP = await fetch(`${URL}/posts/`, reqPosts)
    const response = await resHTTP.json()
    setPosts(response.reverse())
    return response.length
  }

  // Runs ONCE on inital Rendering
  useEffect(() => {
    let inter
    initAuth(Auth)
    fetchPosts().then((postsLength) => {
      inter = setInterval(handleNotify(postsLength), 5000)
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
              <SendPost updatePosts={fetchPosts} />
              {posts.map((post) => (
                <Post key={post._id} post={post} />
              ))}
            </div>
            {/* <!-- END Middle Column --> */}

            {/* <!-- Right Column --> */}
            <div className="w3-col m2">
              <Notification
                notifyCount={newPostCount}
                flag={"posts"}
                updateList={updatePosts}
              />
            </div>
            {/* <!-- END Right Column --> */}
          </div>
          {/* <!-- END Grid --> */}
        </div>
        // END Container
      )}
    </>
  )
}

export default HomePage
