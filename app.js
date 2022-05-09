const express = require('express')
const fs = require('fs')
const app = express()
const apiController = require('./api/controller.js')

const makeFolder = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}

app.use(express.json());
// app.use('/js', express.static(__dirname + '/js'))
app.use('/api', apiController)

app.get(/(.*)/, function (req, res) {
  fs.createReadStream(__dirname + "/index.html").pipe(res)
})

app.listen(3000, function () {
    console.log('server start')
    // 서비스 시작시 리소스 폴더가 없다면 생성
    makeFolder('resources')
})
