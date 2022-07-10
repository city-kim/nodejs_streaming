import { Module, ActionContext } from 'vuex'
import { axios } from '@/store/axios'

import type { RootState } from '@/store'
import type { uploadFile, createVideo, uploadThumbnail } from '@/types/Upload'

export interface StoreUploadType {
  isUpload: boolean
}

const setUploadData = () => {
  return {
    isUpload: true
  }
}

const state = setUploadData()

const actions = {
  postUploadFile({ commit }: ActionContext<StoreUploadType, RootState>, payload: uploadFile) {
    return new Promise((resolve, reject) => {
      let form = new FormData()
      form.append('key', payload.key) // 랜덤 hex key값
      form.append('size', payload.size) // index 사이즈
      form.append('index', payload.index) // index
      form.append('file', payload.file) // 전송할 파일
      axios('http://localhost:3000/api/file/store', {
        method: 'POST',
        data: form
      })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
    })
  },
  createVideo({ commit }: ActionContext<StoreUploadType, RootState>, payload: createVideo) {
    // 종료되면 합쳐줌
    return new Promise((resolve, reject) => {
      axios('http://localhost:3000/api/file/merge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: payload
      })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
    })
  },
  postUploadThumbnail({ commit }: ActionContext<StoreUploadType, RootState>, payload: uploadThumbnail) {
    let form = new FormData()
    console.log(payload)
    form.append('key', payload.key) // 랜덤 hex key값
    form.append('file', payload.file) // 전송할 파일
    axios('http://localhost:3000/api/thumbnail/store', {
      method: 'POST',
      data: form
    })
    .then((res) => {
      console.log(res)
      // resolve(res)
    })
    .catch((err) => {
      console.log(err)
      // reject(err)
    })
  }
}

const mutations = {
  UPLOAD_SEND(state: StoreUploadType, payload: boolean) {
    state.isUpload = payload
  }
}

const getters = {
  upload (state: StoreUploadType) {
    // 체크된 대상 리스트
    return state.isUpload
  }
}

export const Upload: Module<StoreUploadType, RootState> = {
  namespaced: true,
  state: state,
  actions: actions,
  mutations: mutations,
  getters: getters
}

