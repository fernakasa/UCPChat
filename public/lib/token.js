/* eslint-disable no-undef */
let token = sessionStorage.token
let user = sessionStorage.user

if (!token || !user) {
  window.location = '/login.html'
}
