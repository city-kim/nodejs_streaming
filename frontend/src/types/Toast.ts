// toast에 사용되는 타입
interface ToastType {
  duration?: number // 지연시간
  title: string // 제목
  contents: string // 내용
}

export type {
  ToastType
}
