import express from 'express' //paquete servidor web
import http from 'http' // paquete servidor
import morgan from 'morgan' // debug peticiones http
import { Server } from 'socket.io'
import config from './config.js'
import appRoutes from './routers/routes.js'

export const app = express() // inicializar sv express
export const server = http.createServer(app) // inicializar sv a traves de express

app.set('port', config.port) // puerto que va a recibir peticion

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public')) // set carpeta static file

app.use(appRoutes)

// Socket setup
import { guardarMensaje, mensajesSalas } from './models/models.js'

const io = new Server(server)

io.on('connection', async (socket) => {
  console.log('Made socket connection')
  const mensaje = await mensajesSalas(1)
  socket.emit('chat history', mensaje)

  socket.on('chat message', async (data) => {
    const result = await guardarMensaje(data.nick, data.message, data.channel)
    //console.log(result);
    io.emit('chat message', result)
  })
})
