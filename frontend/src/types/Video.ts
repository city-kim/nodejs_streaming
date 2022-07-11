type VideoList = Array<videoInfo>

interface videoInfo {
  watchKey: string
  name: string
  title: string
  subject: string
  second: number
  count: number
}

export type {
  VideoList
}