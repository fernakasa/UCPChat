/* eslint-disable no-undef */
let userDisplay = document.querySelector(
  'body > div > ul > li.profile > div > div > div'
)

userDisplay.textContent = user.charAt(0).toUpperCase() + user.slice(1)

let sidebar = document.querySelector('.sidebar')
let closeBtn = document.querySelector('#btn')
let searchBtn = document.querySelector('.bx-search')

closeBtn.addEventListener('click', () => {
  sidebar.classList.toggle('open')
  menuBtnChange()
})

let logoutBtn = document.querySelector('#log_out')

logoutBtn.addEventListener('click', () => {
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('user')
  window.location = '/'
})


searchBtn.addEventListener('click', () => {
  sidebar.classList.toggle('open')
  menuBtnChange()
})

function menuBtnChange() {
  if (sidebar.classList.contains('open')) {
    closeBtn.classList.replace('bx-menu', 'bx-menu-alt-right')
  } else {
    closeBtn.classList.replace('bx-menu-alt-right', 'bx-menu')
  }
}

const socket = io()

const inputField = document.querySelector('.message_form__input')
const messageForm = document.querySelector('.message_form')
const messageBox = document.querySelector('.messages__history')

messageForm.addEventListener('submit', (e) => {
  e.preventDefault()
  if (!inputField.value) {
    return
  }

  socket.emit('chat message', {
    message: inputField.value,
    nick: user,
    channel: 1,
  })

  inputField.value = ''
  inputField.focus()
})

socket.on('chat history', (data) => {
  const mensajes = JSON.parse(data)
  //console.log(mensajes);
  Object.entries(mensajes).forEach((entry) => {
    //console.log(`${entry[1].mensajeCont}, ${entry[1].mensajeDate}, ${entry[1].usuarioNombre}`);

    addNewMessage({
      username: entry[1].usuarionombre,
      message: entry[1].mensajecont,
      timestamp: entry[1].mensajedate,
    })
  })
})

socket.on('chat message', (data) => {
  //console.log(data)
  addNewMessage({
    username: data.username,
    message: data.message,
    timestamp: data.timestamp,
  })
})

const addNewMessage = ({ username, message, timestamp }) => {
  const time = new Date(timestamp)
  const formattedTime = time.toLocaleString(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
    second: '2-digit',
  })

  const receivedMsg = `
    <div class="message">
        <div class="info">
          <span class="author">${username}</span>
          <span class="time_date">${formattedTime}</span>
        </div>
        <p>${message}</p>
    </div>`

  const myMsg = `
    <div class="message">
        <div class="info">
          <span class="user">${user}</span>
          <span class="time_date">${formattedTime}</span>
        </div>
        <p>${message}</p>
    </div>`

  messageBox.innerHTML += user === username ? myMsg : receivedMsg
  messageBox.scrollTop = messageBox.scrollHeight
}
