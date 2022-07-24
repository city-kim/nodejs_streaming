import { Module } from 'vuex'
import type { RootState } from '@/store'

export interface StoreUiType {
  window: {
    width: number // window.innerWidth
    height: number // window.innerHeight
    breakPoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | null // 640px, 768px, 1024px, 1280px, 1536px
    screenType: 'mobile' | 'pc' | null // ui 타입
  },
  asideUi: asideUiType // aside ui 조작용
}

export interface asideUiType {
  pcShort: boolean,
  mobileOpen: boolean
}

const state = {
  window: {
    width: 0,
    height: 0,
    breakPoint: null,
    screenType: null,
  },
  asideUi: {
    pcShort: false,
    mobileOpen: false,
  }
}

const actions = {
}

const mutations = {
  WINDOW_RESIZE (state: StoreUiType, payload: {width: number, height: number}) {
    // window resize시 조절됨
    state.window.width = payload.width
    state.window.height = payload.height
    if (state.window.width <= 640) {
      state.window.breakPoint = 'sm'
      state.window.screenType = 'mobile'
    } else if (state.window.width <= 768) {
      state.window.breakPoint = 'md'
      state.window.screenType = 'mobile'
    } else if (state.window.width <= 1024) {
      state.window.breakPoint = 'lg'
      state.window.screenType = 'mobile'
    } else if (state.window.width <= 1280) {
      state.window.breakPoint = 'xl'
      state.window.screenType = 'pc'
    } else {
      state.window.breakPoint = '2xl'
      state.window.screenType = 'pc'
    }
  },
  UPDATE_ASIDE (state: StoreUiType, payload?: boolean) {
    // default는 false이기 때문에 클릭시 상태만 변경해줌
    if (state.window.screenType == 'mobile') {
      // 모바일 혹은 태블릿인경우
      if (payload) {
        // 값이 있으면 해당 값으로 변경
        state.asideUi.mobileOpen = payload
      } else {
        // 없다면 state의 상태를 변경
        state.asideUi.mobileOpen = !state.asideUi.mobileOpen
      }
    } else {
      // 그외는 항상 상태변경
      state.asideUi.pcShort = !state.asideUi.pcShort
    }
  }
}

const getters = {
  asideUi (state: StoreUiType) {
    return state.asideUi
  },
  windowSize (state: StoreUiType) {
    return {
      width: state.window.width,
      height: state.window.height
    }
  },
  screenType (state: StoreUiType) {
    return state.window.screenType
  },
  breakPoint (state: StoreUiType) {
    return state.window.breakPoint
  }
}

export const Ui: Module<StoreUiType, RootState> = {
  namespaced: true,
  state: state,
  actions: actions,
  mutations: mutations,
  getters: getters
}