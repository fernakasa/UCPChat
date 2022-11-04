import { app, server} from './app.js'

server.listen(app.get('port'), () => {
  //start sv en el puerto confg
  console.log('server on port: ' + app.get('port'))
  console.log('http://localhost:' + app.get('port'))
})
