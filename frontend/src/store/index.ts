import { createStore } from 'vuex'
import { Home } from '@/store/modules/Home'
import { Upload } from '@/store/modules/Upload'

import type { StoreHomeType } from '@/store/modules/Home'
import type { StoreUploadType } from '@/store/modules/Upload'

export interface RootState {
  Home: StoreHomeType
  Upload: StoreUploadType
}

export default createStore<RootState>({
  modules: {
    Home,
    Upload
  }
})
