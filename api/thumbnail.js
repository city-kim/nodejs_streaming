const multer = require('multer')
const fs = require('fs')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.readdir('thumbnail', (error) => {
      // uploads 폴더 없으면 생성
      if (error) {
        fs.mkdirSync('thumbnail',  { recursive: true })
        // key값으로 디렉토리 임시생성 후 chunk파일 저장
        cb(null, `thumbnail`)
      } else {
        cb(null, `thumbnail`)
      }
    })
  },
  filename: function (req, file, cb) {
    cb(null, `${req.body.key}.png`)
  }
})

const upload = multer({ storage: storage })

const getThumbnail = (req, res) => {
  const filePath = `thumbnail/${req.query.key}.png`
  // 스트림 만들어줌
  const image = fs.createReadStream(filePath)
  image.on('open', function () {
    // 이미지 열리면 제공하기
    // res.set('Content-Type', type)
    image.pipe(res)
  })
}

module.exports = {
  upload,
  getThumbnail
}