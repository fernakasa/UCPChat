/* eslint-disable no-undef */
let registerbtn = document.getElementById('register')
registerbtn.addEventListener('click', async () => register())

const register = async() => {
  let user = document.getElementById('user').value
  let pass = document.getElementById('pass').value
  if (!user || !pass) {
    return false
  }
  const response = await fetch('/api/auth/register', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ usuario: user, password: pass }),
  })
  console.log(response)
  alert('Registrado Correctamente! Por favor proceda a logearse')
  window.location = '/login.html'
}