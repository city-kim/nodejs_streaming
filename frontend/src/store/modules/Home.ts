import { Module, ActionContext } from 'vuex'
import { axios } from '@/store/axios'

import type { RootState } from '@/store'
import type { VideoList } from '@/types/Home'

export interface StoreHomeType {
  fileList: VideoList
}

const setHomeData = () => {
  return {
    fileList: []
  }
}

const state = setHomeData()

const actions = {
  putVideoCount(context: ActionContext<StoreHomeType, RootState>, payload: string) {
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
  getVideoList({ commit }: ActionContext<StoreHomeType, RootState>) {
    axios('http://localhost:3000/api/video/list/public', {
      method: 'GET'
    })
    .then((res) => {
      commit('GET_VIDEO_LIST', res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }
}

const mutations = {
  GET_VIDEO_LIST(state: StoreHomeType, payload: VideoList) {
    state.fileList = payload
  }
}

const getters = {
  videoList (state: StoreHomeType) {
    // 체크된 대상 리스트
    return state.fileList
  }
}

export const Home: Module<StoreHomeType, RootState> = {
  namespaced: true,
  state: state,
  actions: actions,
  mutations: mutations,
  getters: getters
}

