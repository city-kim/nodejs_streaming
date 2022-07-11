const express = require('express')
const router = express.Router()
const file = require('./file')
const thumbnail = require('./thumbnail')
const video = require('./video')

router.post('/file/store', file.upload.single('file'), (req, res) => { // 파일 분할 업로드
  res.send('uploaded')
})
router.post('/file/merge', file.merge) // 파일 머지하기
router.delete('/file', file.remove) // 파일삭제하기

router.get('/thumbnail', thumbnail.getThumbnail) // 비디오 썸네일
router.post('/thumbnail/store', thumbnail.upload.single('file'), (req, res) => { // 썸네일 저장하기
  res.send('thumbnail')
})

router.get('/video/list/public', video.public) // 공개된 비디오보기
router.get('/video/list/private', video.private) // 비공개된 비디오보기
router.get('/video/stream', video.stream) // 스트리밍
router.put('/counter', video.counte) // 조회수

module.exports = router