import { writeFile } from 'fs/promises'
import { app } from './app'
import { env } from './env'
import { resolve } from 'path'

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Runner!!!')
  })

app.ready().then(() => {
  const spec = app.swagger()

  writeFile(
    resolve('.', 'swagger.json'),
    JSON.stringify(spec, null, 2),
    'utf-8',
  )
})
