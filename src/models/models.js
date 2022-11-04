import { pool } from '../database/database.js'

export const guardarMensaje = async (usuario, mensaje, salaid) => {
  let promise = new Promise((resolve) => {
    let response
    let timestamp = new Date()
    console.log('postmensaje -> usuarioid = ' + usuario)
    pool.query(
      'INSERT INTO mensaje (mensajeCont, salaId, mensajeDate, usuarioId) SELECT $1, $2, $3, usuarioId FROM usuario WHERE usuarioNombre = $4',
      [mensaje, salaid, timestamp, usuario],
      (err) => {
        if (!err) {
          console.log('  -> Mensaje Guardado = ' + mensaje)
          response = {
            username: usuario,
            message: mensaje,
            timestamp: timestamp,
          }
        } else {
          console.log(err)
        }
      }
    )
    setTimeout(() => resolve(response), 100)
  })
  return await promise
}

export const mensajesSalas = async (salaid) => {
  let promise = new Promise((resolve) => {
    let response
    pool.query(
      'SELECT mensaje.mensajeId, mensaje.mensajeDate, mensaje.mensajeCont, usuario.usuarioNombre FROM mensaje INNER JOIN usuario ON usuario.usuarioId = mensaje.usuarioId WHERE mensaje.salaId = $1 ORDER BY mensaje.mensajeId ASC',
      [salaid],
      (err, qres) => {
        if (!err) {
          response = JSON.stringify(qres.rows)
        } else {
          console.log(err)
        }
      }
    )
    setTimeout(() => resolve(response), 100)
  })
  return await promise
}
