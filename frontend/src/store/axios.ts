import $axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import toast from '@/helper/toast'

let axios = $axios

axios.interceptors.request.use((config: AxiosRequestConfig) => {
    // request 출력
    console.log('reqeust', config)
    return config
  }
)

axios.interceptors.response.use((response: AxiosResponse) => {
    // response 출력
    console.log(response.config.url + ' → ', response)
    return response;
  }, async (error: AxiosError) => {
    // 에러발생시
    const originalRequest = error.config
    if (error.response && error.response.status) {
      if (error.response.status === 401) {
        if (originalRequest.url == 'login') {
          // 로그인일경우는 처리안함
          return Promise.reject(error)
        } else {
          // 그외는 토큰 유효기간 만료
          toast.wakeup({
            title: '알림',
            contents: '로그인 인증이 만료되었습니다. 다시 로그인해주세요.',
            duration: 2000
          })
        }
      } else if (error.response.status === 500) {
        // Unprocessable Entity 처리할 수 없음
        toast.wakeup({
          title: '실패',
          contents: '요청에 실패하였습니다. 고객센터로 문의해주세요.',
          duration: 2000
        })
      }
    }
    return Promise.reject(error)
});

export {
  axios
}
