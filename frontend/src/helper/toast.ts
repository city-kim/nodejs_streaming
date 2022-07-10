import { render, createVNode } from 'vue'
import Toast from '@/components/util/Toast.vue'
import type { ToastType } from '@/types/Toast'

let toastCounter = 1 // 토스트의 카운터

export default {
  wakeup: (config: ToastType) => {
    // 토스트는 독립적으로 구현한다
    let toastWrap = null as HTMLElement | null
    toastWrap = document.getElementById('__toast__wrap')
    if (!toastWrap) {
      // toast warp이 만약 없다면 만들어준다
      toastWrap = document.createElement('div')
      toastWrap.id = '__toast__wrap'
      toastWrap.style.position = 'fixed'
      toastWrap.style.left = '1rem'
      toastWrap.style.bottom = '1rem'
      toastWrap.style.zIndex = '30'
      document.body.appendChild(toastWrap)
      toastWrap = document.getElementById('__toast__wrap')
    }
    // toast warp이 있을경우
    const id = `toast_${toastCounter++}` // 아이디지정
    let toastElement = document.createElement('div') // element 생성
    toastElement.id = id // 아이디 입력
    toastElement.className = 'mt-2\.5' // margin은 tailwind 값을 씀
    let toastVM = createVNode( // VNode 로 vue render 값을 생성해준다
      Toast,
      {
        ...config,
        id
      },
      null
    )
    render(toastVM, toastElement) // 랜더링
    if (toastWrap) {
      toastWrap.appendChild(toastElement) // wrap에 append 시켜준다
    }
  }
}
