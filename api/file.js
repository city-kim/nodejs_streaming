const multer = require('multer')
const fs = require('fs')
const { getVideoDurationInSeconds } = require('get-video-duration')

const storage = multer.diskStorage({
  // multer storage
  destination: function (req, file, cb) {
    fs.readdir(`files/${req.body.key}`, (error) => {
      // uploads 폴더 없으면 생성
      if (error) {
        fs.mkdirSync(`files/${req.body.key}`,  { recursive: true })
        // key값으로 디렉토리 임시생성 후 chunk파일 저장
        cb(null, `files/${req.body.key}`)
      } else {
        cb(null, `files/${req.body.key}`)
      }
    })
  },
  filename: function (req, file, cb) {
    cb(null, req.body.index)
  }
})
const upload = multer({ storage: storage })

const merge = (req, res) => {
  for (let i=0; i<req.body.size; i++) {
    // 파일을 머지하기 이때 저장은 key값으로 해준다
    fs.appendFileSync(`resources/${req.body.key}.mp4`, fs.readFileSync(`files/${req.body.key}/${i}`))
    // 머지가 완료된 chunk파일은 삭제한다
    fs.unlinkSync(`files/${req.body.key}/${i}`)
  }
  // 머지 종료되면 디렉토리도 삭제해준다
  fs.rmdirSync(`files/${req.body.key}`)

  // 파일이름은 따로 저장해준다
  updateFileData(req.body.key, req.body.name)
  .then((response) => {
    res.send('merged')
  })
  .catch((err) => {
    res.status(500).send('Fail!');
  })
}

const updateFileData = (key, name, title, subject) => {
  return new Promise ((resolve, reject) => {
    const stream = fs.createReadStream(`resources/${key}.mp4`)
    getVideoDurationInSeconds(stream).then((duration) => {
      fs.readFile(`video.json`, (error, data) => {
        // 파일명 저장하기
        if (error) reject(error)
        let fileList = JSON.parse(data)
        fileList.push({
          key: key,
          name: name,
          title: title ? title : '',
          subject: subject ? subject : '',
          second: duration,
          regist_at: new Date().toISOString(),
          count: 0
        })
        fs.writeFile('video.json', JSON.stringify(fileList).replace(/,/g, ',\n'), 'utf-8', (err) => {
          if (err) {
            reject(error)
          } else {
            resolve('done')
          }
        })
      })
    })
    .catch((err) => {
      reject(error)
    })
  })
}

const remove = (req, res) => {
  fs.readFile(`video.json`, (error, data) => {
    // 파일 삭제하기
    if (error) reject(error)
    let fileList = JSON.parse(data)
    const index = fileList.findIndex(x => x.key == req.body.key)
    fileList.splice(index, 1)
    fs.writeFile('video.json', JSON.stringify(fileList), 'utf-8', (err) => {
      if (err) {
        reject(error)
      }
      fs.unlinkSync(`resources/${req.body.key}.mp4`)
      res.send('done')
    })
  })
}

module.exports = {
  upload,
  merge,
  updateFileData,
  remove
}