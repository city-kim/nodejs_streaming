const express = require('express')
const fs = require('fs')
const app = express()
const apiController = require('./api/controller.js')
const cors = require('cors')
const path = require('path')

const makeFolder = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}

app.use(express.json());
app.use(cors({
  origin: '*',
  credentials: true
}))
// app.use('/js', express.static(__dirname + '/js'))
app.use('/api', apiController)

app.use(express.static('dist'));

app.get(/(.*)/, function (req, res) {
  fs.createReadStream(__dirname + "/dist/index.html").pipe(res)
})

app.listen(3000, function () {
    console.log('server start')
    // 서비스 시작시 리소스 폴더가 없다면 생성
    makeFolder('resources')
    // video json이 없어도 생성
    fs.readFile(`video.json`, (error, data) => {
      // 서버 구동시 video.json이 없다면 생성해주기
      if (error) {
        fs.writeFile('video.json', '[]', 'utf8', (err) => {
          console.log(err)
        })
      }
    })
})
