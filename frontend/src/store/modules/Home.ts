import { Module, ActionContext } from 'vuex'
import { axios } from '@/store/axios'

import type { RootState } from '@/store'
import type { VideoList, VideoInfo } from '@/types/Video'

export interface StoreHomeType {
  video: {
    list: VideoList
    isLoading: boolean
  }
  searchList: Array<VideoInfo>
}

const setHomeData = () => {
  return {
    video: {
      list: [],
      isLoading: true
    },
    searchList: []
  }
}

const state = setHomeData()

const actions = {
  getVideoList({ commit }: ActionContext<StoreHomeType, RootState>) {
    // 제목있는 비디오만 가져오기
    axios('http://localhost:3000/api/video/list/public', {
      method: 'GET'
    })
    .then((res) => {
      commit('GET_VIDEO_LIST', res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  },
  getSearchList({ commit }: ActionContext<StoreHomeType, RootState>, payload: string) {
    // 검색리스트 받아오기
    return new Promise((resolve, rejects) => {
      axios('http://localhost:3000/api/video/list/private', {
        method: 'GET'
      })
      .then((res) => {
        commit('GET_SEARCH_LIST', {
          list: res.data,
          keyword: payload
        })
        resolve(res)
      })
      .catch((err) => {
        console.log(err)
        rejects(err)
      })
    })
  },
}

const mutations = {
  GET_VIDEO_LIST(state: StoreHomeType, payload: VideoList) {
    state.video.list = payload
    setTimeout(() => {
      state.video.isLoading = false
    }, 1000);
  },
  GET_SEARCH_LIST(state: StoreHomeType, payload: { list: VideoList, keyword: string }) {
    let array: Array<VideoInfo> = []
    if (payload.keyword) {
      // 검색어가 있을경우
      array = payload.list.reduce((acc: Array<VideoInfo>, cur: VideoInfo) => { // 전달받은 값에서 찾아서 반환
        if (cur.title.indexOf(payload.keyword) > -1) {
          acc.push(cur)
        }
        return acc
      }, [])
    }
    state.searchList = array
  },
}

const getters = {
  videoList (state: StoreHomeType) {
    // 체크된 대상 리스트
    return state.video
  },
  searchList (state: StoreHomeType) {
    // 체크된 대상 리스트
    return state.searchList
  },
}

export const Home: Module<StoreHomeType, RootState> = {
  namespaced: true,
  state: state,
  actions: actions,
  mutations: mutations,
  getters: getters
}

