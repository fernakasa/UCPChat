/* eslint-disable no-undef */
let loginbtn = document.getElementById('login')
loginbtn.addEventListener('click', () => login())

const login = async () => {
  let user = document.getElementById('user').value
  let pass = document.getElementById('pass').value
  if (!user || !pass) {
    return false
  }
  const response = await fetch('/api/auth/login', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ usuario: user, password: pass }),
  })
  const data = await response.json()
  sessionStorage.token = data['token']
  sessionStorage.user = user
  window.location = '/'
}
