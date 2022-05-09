const express = require('express')
const router = express.Router()
const multer = require('multer') // express file upload multer module
const fs = require('fs')

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

router.post('/file/store', upload.single('file'), (req, res) => {
  // 파일 업로드
  res.send('uploaded')
})

router.post('/file/merge', (req, res) => {
  for (let i=0; i<req.body.size; i++) {
    // 파일을 머지하기
    fs.appendFileSync(`resources/${req.body.name}`, fs.readFileSync(`files/${req.body.key}/${i}`))
    // 머지가 완료된 chunk파일은 삭제한다
    fs.unlinkSync(`files/${req.body.key}/${i}`)
  }
  // 머지 종료되면 디렉토리도 삭제해준다
  fs.rmdirSync(`files/${req.body.key}`)
  res.send('merged')
})

router.get('/video', (req, res) => {
  // query name 파일을 불러와 스트리밍하기
  const filePath = `resources/${req.query.name}`
  // 리소스 폴더에서 해당 파일을 찾음
  const stream = fs.createReadStream(filePath)
  // 스트림 만들어준다
  const stat = fs.statSync(filePath)
  // 파일정보 불러오기
  const fileSize = stat.size
  // 파일 사이즈 제공
  const header = {
    'Accept-Ranges': 'bytes', // 컨텐츠의 구간 요청을 허용함
    'Content-Length': fileSize, // 컨텐츠의 길이를 제공하여 화면에도 반영하게함
    // 'Content-Range': `bytes ${start}-${end}/${fileSize}`, // 제공되는 컨텐츠의 길이를 제한
    // 'Content-Type'  : 'audio/mpeg', // 컨텐츠 타입지정 딱히 안해도되는듯
  }
  res.writeHead(200, header)

  // 스트리밍
  stream.pipe(res)
})

module.exports = router