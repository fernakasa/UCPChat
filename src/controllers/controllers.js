import { pool } from '../database/database.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../config.js'

export const getSalas = async (req, res) => {
  await pool.query('SELECT * FROM sala', (err, qres) => {
    if (!err) {
      res.json(qres.rows)
    } else {
      console.log(err)
    }
  })
}

export const postMensajes = async (req, res) => {
  const { id } = req.params
  await pool.query(
    'SELECT mensaje.mensajeId, mensaje.mensajeDate, mensaje.mensajeCont, usuario.usuarioNombre FROM mensaje INNER JOIN usuario ON usuario.usuarioId = mensaje.usuarioId WHERE mensaje.salaId = $1',
    [id],
    (err, qres) => {
      if (!err) {
        res.json(qres.rows)
      } else {
        console.log(err)
      }
    }
  )
}

export const postMensaje = async (req, res) => {
  const { salaid, usuarioid, mensaje } = req.body
  console.log('postmensaje -> usuarioid = ' + usuarioid)
  await pool.query(
    'INSERT INTO mensaje (mensajeCont, salaId, usuarioId) VALUES ($1, $2, $3)',
    [mensaje, salaid, usuarioid],
    (err) => {
      if (!err) {
        res.json({ message: mensaje })
      } else {
        console.log(err)
      }
    }
  )
}

export const defaultPage = (req, res) => {
  res.redirect('/')
}

export const register = async (req, res) => {
  let { usuario, password } = req.body

  let user = usuario.toLowerCase()

  const salt = await bcrypt.genSalt(10)
  const pass = await bcrypt.hash(password, salt)

  pool.query(
    'INSERT INTO usuario (usuarionombre, passwordhash, passwordsalt) VALUES ($1, $2, $3)',
    [user, pass, salt],
    (err, data) => {
      if (!data && err.code === '23505') {
        return res.json({
          status: false,
          message: 'duplicate user',
        })
      }

      if (data) {
        return res.status(200).json({
          status: true,
          message: 'user registered sucessfully',
        })
      }

      if (!data && err) {
        return res.json({
          status: false,
          message: err.detail,
        })
      }
    }
  )
}

export const login = async (req, res) => {
  try {
    let usuario = req.body.usuario
    let user = usuario.toLowerCase()
    let password = req.body.password
    pool.query(
      'SELECT * FROM usuario WHERE usuarionombre = $1',
      [user],
      (err, qres) => {
        if (!qres) {
          return res.status(400).json({ message: 'User Not Found' })
        }
        //console.log(row[0].passwordHash)
        const pass = bcrypt.compareSync(password, qres.rows[0].passwordhash)
        if (!pass) {
          return res
            .status(401)
            .json({ token: null, message: 'Invalid Password' })
        } else {
          jwt.sign({ usuario }, config.secret, (err, token) => {
            console.log(token)
            res.status(200).json({ token })
          })
        }
      }
    )
  } catch (error) {
    console.log(error.message)
  }
}
