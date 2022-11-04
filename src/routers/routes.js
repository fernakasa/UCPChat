import { Router } from 'express' //inicializamos la funcion router en una variable Router
import { verificarToken } from './../auth/verificarToken.js'
import {
  getSalas,
  postMensajes,
  postMensaje,
  defaultPage,
  register,
  login,
} from './../controllers/controllers.js' //requerimos cada una de las funciones desde los controladores

const router = Router()

router.get('/api/salas', verificarToken, getSalas) //Con la Ruta /usuarios se ejecute la funcion getUsuarios
router.post('/api/mensajes/:id', verificarToken, postMensajes) //Con la Ruta /usuarios se ejecute la funcion getUsuarios
router.post('/api/mensaje', verificarToken, postMensaje) //Con la Ruta /usuarios se ejecute la funcion getUsuarios
router.post('/api/auth/register', register)
router.post('/api/auth/login', login)
router.get('/', defaultPage) //Con la Ruta /usuarios se ejecute la funcion getUsuarios
router.post('/', defaultPage)
router.get('*', defaultPage) //Con la Ruta /usuarios se ejecute la funcion getUsuarios
router.post('*', defaultPage)

export default router
