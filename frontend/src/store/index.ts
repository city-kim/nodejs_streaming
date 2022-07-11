import { createStore } from 'vuex'
import { Home } from '@/store/modules/Home'
import { Upload } from '@/store/modules/Upload'
import { MyList } from '@/store/modules/MyList'

import type { StoreHomeType } from '@/store/modules/Home'
import type { StoreUploadType } from '@/store/modules/Upload'
import type { StoreMyListType } from '@/store/modules/MyList'

export interface RootState {
  Home: StoreHomeType
  Upload: StoreUploadType
  MyList: StoreMyListType
}

export default createStore<RootState>({
  modules: {
    Home,
    Upload,
    MyList
  }
})
