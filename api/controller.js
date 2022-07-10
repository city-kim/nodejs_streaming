const express = require('express')
const router = express.Router()
const multer = require('multer') // express file upload multer module
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

const thumbnailStorage = multer.diskStorage({
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
const thumbnail = multer({ storage: thumbnailStorage })

router.post('/file/store', upload.single('file'), (req, res) => {
  // 파일 업로드
  res.send('uploaded')
})

router.post('/thumbnail/store', thumbnail.single('file'), (req, res) => {
  res.send('thumbnail')
})

router.post('/file/merge', (req, res) => {
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
})

router.get('/video', (req, res) => {
  // query name 파일을 불러와 스트리밍하기
  const filePath = `resources/${req.query.key}.mp4`
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

router.get('/thumbnail', (req, res) => {
  // 썸네일 가져오기
  const filePath = `thumbnail/${req.query.key}.png`
  // 스트림 만들어줌
  const image = fs.createReadStream(filePath)
  image.on('open', function () {
    // 이미지 열리면 제공하기
    // res.set('Content-Type', type)
    image.pipe(res)
});
})

router.get('/file/list/public', (req, res) => {
  fs.readFile(`video.json`, (error, data) => {
    // 리스트 불러오기
    if (error) res.status(404).send('file not found');
    const fileList = JSON.parse(data)
    // 이미 제목이 있는경우만 출력
    const list = fileList.reduce((acc, cur) => {
        if (cur.title) {
            acc.push(cur)
        }
        return acc
    }, [])
    res.send(list)
  })
})

router.get('/file/list/private', (req, res) => {
  fs.readFile(`video.json`, (error, data) => {
    // 리스트 불러오기
    if (error) res.status(404).send('file not found');
    const fileList = JSON.parse(data)
    res.send(fileList)
  })
})

router.delete('/file', (req, res) => {
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
})

router.put('/counter', (req, res) => {
  fs.readFile(`video.json`, (error, data) => {
    // 조회수 올리기
    if (error) reject(error)
    let fileList = JSON.parse(data)
    const index = fileList.findIndex(x => x.key == req.body.key)
    if (index > -1) {
      fileList[index].count++
      fs.writeFile('video.json', JSON.stringify(fileList).replace(/,/g, ',\n'), 'utf-8', (err) => {
        if (err) {
          res.status(500).send('Fail!');
        } else {
          res.send('done')
        }
      })
    }
  })
})

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

module.exports = router