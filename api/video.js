const fs = require('fs')

const public = (req, res) => {
  fs.readFile(`./video.json`, (error, data) => {
    // 제목이 있는 리스트만 불러오기
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
}

const private = (req, res) => {
  fs.readFile(`./video.json`, (error, data) => {
    // 리스트 전부 불러오기
    if (error) res.status(404).send('file not found');
    const fileList = JSON.parse(data)
    res.send(fileList)
  })
}

const show = (req, res) => {
  fs.readFile(`./video.json`, (error, data) => {
    // 비디오 상세정보 받아오기
    if (error) res.status(404).send('file not found');
    const fileList = JSON.parse(data)
    res.send(fileList.find(x => x.key == req.query.key))
  })
}

const edit = (req, res) => {
  fs.readFile(`./video.json`, (error, data) => {
    // 비디오 정보 수정하기
    if (error) res.status(404).send('file not found');
    const fileList = JSON.parse(data)
    const index = fileList.findIndex(x => x.key == req.query.key)
    if (req.body.title) fileList[index].title = req.body.title
    if (req.body.subject) fileList[index].subject = req.body.subject
    fs.writeFile('video.json', JSON.stringify(fileList).replace(/,/g, ',\n'), 'utf-8', (err) => {
      if (err) {
        res.status(500).send('server Error');
      } else {
        res.send('done')
      }
    })
  })
}

const stream = (req, res) => {
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
}

const counte = (req, res) => {
  fs.readFile(`./video.json`, (error, data) => {
    // 조회수 올리기
    if (error) reject(error)
    let fileList = JSON.parse(data)
    const index = fileList.findIndex(x => x.key == req.body.key)
    if (index > -1) {
      fileList[index].count++
      fs.writeFile('./video.json', JSON.stringify(fileList).replace(/,/g, ',\n'), 'utf-8', (err) => {
        if (err) {
          res.status(500).send('Fail!');
        } else {
          res.send('done')
        }
      })
    }
  })
}

module.exports = {
  public,
  private,
  show,
  edit,
  stream,
  counte
}