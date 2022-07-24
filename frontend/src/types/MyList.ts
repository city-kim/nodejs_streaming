interface VideoKey { // 모달 비디오 키
  key: string
}

interface ModalType { // 모달정보
  key: string
  title: string
  regist_at: string
  count: number
  second: number
}

export type {
  VideoKey,
  ModalType
}