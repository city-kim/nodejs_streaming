interface uploadFile {
  key: string // 랜덤 key값
  file: File // 업로드될 파일
  size: string // 총 파일 길이
  index: string // 현재 index
}

interface createVideo {
  key: string // 랜덤 key값
  size: number // index 사이즈
  name: string // 파일명
  type: string // 파일타입
}

interface uploadThumbnail {
  key: string,
  file: File
}

export type {
  uploadFile,
  createVideo,
  uploadThumbnail
}