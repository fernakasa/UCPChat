import { pool } from '../database/database.js'
import verify from 'jsonwebtoken'
import config from '../config.js'

export const verificarToken = async (req, res, next) => {
  const token = req.headers['x-access-token']

  if (!token) return res.status(403).json({ message: 'No token provided' })

  try {
    const decoded = verify(token, config.secret)
    console.log(decoded)
    pool.query(
      'SELECT * FROM usuario WHERE usuarioNombre = ?',
      [decoded.usuario],
      (err, row) => {
        if (!row) {
          return res.status(404).json({ message: 'No user found' })
        } else {
          console.log('agrego al request >>> ' + row[0].usuarioId)
          req.body['usuarioid'] = row[0].usuarioId
          next()
        }
      }
    )
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized!' })
  }
}
