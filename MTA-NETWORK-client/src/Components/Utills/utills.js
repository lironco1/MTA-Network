export const URL = "http://localhost:3000/api"
export const ADMIN_EMAIL = "admin@js.com"

export function getToken(name) {
  return sessionStorage.getItem(name)
}

export function initAuth(Auth) {
  Auth.setUser({
    email: sessionStorage.getItem("email"),
    fullName: sessionStorage.getItem("fullName"),
    status: sessionStorage.getItem("status"),
    token: sessionStorage.getItem("token"),
  })
}

export function generateHeaders(mtd) {
  const bearer = "Bearer " + getToken("token")
  const myHeaders = new Headers()
  myHeaders.set("Content-Type", "application/json")
  myHeaders.set("Authorization", bearer)
  const request = {
    method: mtd,
    headers: myHeaders,
  }
  return request
}

export function createUserSession(email, fullname, status, token) {
  sessionStorage.setItem("email", email)
  sessionStorage.setItem("fullName", fullname)
  sessionStorage.setItem("status", status)
  sessionStorage.setItem("token", token)
}
