import { Module, ActionContext } from 'vuex'
import { axios } from '@/store/axios'

import type { RootState } from '@/store'

export interface StoreHomeType {
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
  GET_VIDEO_LIST(state: StoreHomeType, payload: boolean) {
  }
}

const getters = {
  videoList (state: StoreHomeType) {
    // 체크된 대상 리스트
  }
}

export const Home: Module<StoreHomeType, RootState> = {
  namespaced: true,
  state: state,
  actions: actions,
  mutations: mutations,
  getters: getters
}

