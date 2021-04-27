const express = require('express')
const bodyParser = require('body-parser')
const Instagram = require('instagram-web-api')

var username = process.env['username']
var password = process.env['password']

; (async () => {
  const app = express()
  const client = new Instagram({ username, password })

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  await client.login()

  app.get('/', (req, res) => {
    res.send('ok')
    res.status(200)
  })

  app.post('/info', async (req, res) => {
    var username_search = req.body.username
    client.getUserByUsername({ username: username_search })
      .then((data) => {
        res.send({
          "follow": data.edge_follow.count,
          "followed_by": data.edge_followed_by.count,
          "full_name": data.full_name,
          "biography": data.biography
        })
      })
      .catch(() => {
        res.send('User not found')
      })
  })

  app.listen(process.env.PORT, () => {
    console.clear()
    console.log('Api online')
  })
})()