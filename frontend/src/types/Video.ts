type VideoList = Array<VideoInfo>

interface VideoInfo { // 비디오 정보
  key: string
  name: string
  title: string
  subject: string
  regist_at: string
  second: number
  count: number
}

interface UpdateVideoInfomation { // 업데이트 비디오정보
  title: string
  subject: string
  key: string
}

export type {
  VideoList,
  VideoInfo,
  UpdateVideoInfomation
}