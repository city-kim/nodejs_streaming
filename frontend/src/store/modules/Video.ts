import { Module, ActionContext } from 'vuex'
import { axios } from '@/store/axios'

import type { RootState } from '@/store'
import type { VideoInfo, UpdateVideoInfomation } from '@/types/Video'
import type { VideoKey } from '@/types/MyList'

export interface StoreVideoType {
  infomation: VideoInfo
}

const setMyFileinfomation = () => {
  return {
    infomation: {
      count: 0,
      key: '',
      name: '',
      regist_at: '',
      second: 0,
      subject: '',
      title: '',
    }
  }
}

const state = setMyFileinfomation()

const actions = {
  putVideoCount(context: ActionContext<StoreVideoType, RootState>, payload: string) {
    // 비디오 조회수 올리기
    axios('http://localhost:3000/api/counter', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      data: payload
    })
    .then((res) => {
      // console.log(res)
    })
    .catch((err) => {
      // console.log(err)
    })
  },
  getVideoInfomation({ commit }: ActionContext<StoreVideoType, RootState>, payload: VideoKey) {
    // 비디오 정보 가져오기
    return new Promise((resolve, rejects) => {
      axios(`http://localhost:3000/api/video?key=${payload.key}`, {
        method: 'GET'
      })
      .then((res) => {
        commit('GET_VIDEO_INFOMATION', res.data)
        resolve(res.data)
      })
      .catch((err) => {
        rejects(err)
        console.log(err)
      })
    })
  },
  updateInfomation({ commit }: ActionContext<StoreVideoType, RootState>, payload: UpdateVideoInfomation) {
    // 비디오 정보 수정
    return new Promise((resolve, rejects) => {
      axios(`http://localhost:3000/api/video?key=${payload.key}`, {
        method: 'PUT',
        data: {
          title: payload.title,
          subject: payload.subject
        }
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        rejects(err)
        console.log(err)
      })
    })
  },
}

const mutations = {
  GET_VIDEO_INFOMATION(state: StoreVideoType, payload: VideoInfo) {
    state.infomation = payload
  },
}

const getters = {
  infomation (state: StoreVideoType) {
    return state.infomation
  }
}

export const Video: Module<StoreVideoType, RootState> = {
  namespaced: true,
  state: state,
  actions: actions,
  mutations: mutations,
  getters: getters
}

