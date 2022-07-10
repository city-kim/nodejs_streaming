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
  },
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

