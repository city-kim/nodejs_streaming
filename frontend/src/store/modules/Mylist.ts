import { Module, ActionContext } from 'vuex'
import { axios } from '@/store/axios'

import type { RootState } from '@/store'
import type { VideoList } from '@/types/Video'

export interface StoreMyListType {
  fileList: VideoList
}

const setMyListData = () => {
  return {
    fileList: []
  }
}

const state = setMyListData()

const actions = {
  getVideoList({ commit }: ActionContext<StoreMyListType, RootState>) {
    axios('http://localhost:3000/api/video/list/private', {
      method: 'GET'
    })
    .then((res) => {
      console.log(res)
      commit('GET_VIDEO_LIST', res.data)
    })
    .catch((err) => {
      console.log(err)
      console.log(err)
    })
  },
  removeVideo({ commit }: ActionContext<StoreMyListType, RootState>, payload: string) {
    axios('http://localhost:3000/api/file', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        key: payload
      }
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }
}

const mutations = {
  GET_VIDEO_LIST(state: StoreMyListType, payload: VideoList) {
    state.fileList = payload
  }
}

const getters = {
  videoList (state: StoreMyListType) {
    // 체크된 대상 리스트
    return state.fileList
  }
}

export const MyList: Module<StoreMyListType, RootState> = {
  namespaced: true,
  state: state,
  actions: actions,
  mutations: mutations,
  getters: getters
}

