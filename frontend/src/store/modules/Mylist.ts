import { Module, ActionContext } from 'vuex'
import { axios } from '@/store/axios'

import type { RootState } from '@/store'
import type { VideoList, VideoInfo } from '@/types/Video'

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
    // 비디오 리스트 가져오기(전체)
    axios('http://localhost:3000/api/video/list/private', {
      method: 'GET'
    })
    .then((res) => {
      commit('GET_VIDEO_LIST', res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  },
  removeVideo({ commit }: ActionContext<StoreMyListType, RootState>, payload: string) {
    // 비디오 삭제
    return new Promise((resolve, rejects) => {
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
        resolve(res)
      })
      .catch((err) => {
        rejects(err)
      })
    })
  }
}

const mutations = {
  GET_VIDEO_LIST(state: StoreMyListType, payload: Array<VideoInfo>) {
    state.fileList = payload
  },
}

const getters = {
  videoList (state: StoreMyListType) {
    // 체크된 대상 리스트
    return state.fileList
  },
}

export const MyList: Module<StoreMyListType, RootState> = {
  namespaced: true,
  state: state,
  actions: actions,
  mutations: mutations,
  getters: getters
}

