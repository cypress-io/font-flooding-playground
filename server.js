const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()

const comment = Array(10000000).fill('-').join('')

app.set('etag', false)

app.use(
  '/public/:file',
  (req, res, next) => {
    const flavor = req.query.flavor

    res.set('Content-Type', 'text/css')

    if (flavor === 'no-cache') {
      res.set('Cache-Control', 'no-cache')
    } else if (flavor === 'no-store') {
      res.set('Cache-Control', 'no-store')
    } else if (flavor === 'etag') {
      res.set('ETag', '12345')
      if (req.get('If-None-Match') === '12345') {
        res.sendStatus(304)

        return
      }
    } else if (flavor === 'maxage') {
      res.set('Cache-Control', 'max-age=3600')
    }

    const contents = fs.readFileSync(path.join(__dirname, 'public', req.params.file), 'utf8')

    res.send(`${contents}\n\n/*${comment}*/`)
  },
)

app.get('/:flavor', (req, res) => {
  res.send(`
  <html>
    <head>
      <title>playground</title>
      <link rel="stylesheet" href="/public/style.css?flavor=${req.params.flavor}">
    </head>
    <body>
      <h1>playground</h1>
      <script>
        setTimeout(() => {
          const style = document.createElement('style')
    
          style.textContent = \`
            body {
              background-color: red;
            }
          \`
    
          document.head.prepend(style)
        }, 1000)

        setTimeout(() => {
          URL.revokeObjectURL('http://localhost:4848/public/style.css?flavor=${req.params.flavor}')
        }, 2000)
      </script>
    </body>
  </html>  
`)
})

const srv = app.listen(8080, (err) => {
  if (err) {
    throw err
  }

  const url = `http://localhost:${(srv.address()).port}`

  console.log('playground server is listening at', url)
})
