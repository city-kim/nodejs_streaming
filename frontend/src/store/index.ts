import { createStore } from 'vuex'
import { Home } from '@/store/modules/Home'
import { Upload } from '@/store/modules/Upload'
import { MyList } from '@/store/modules/MyList'
import { Video } from '@/store/modules/Video'
import { Ui } from '@/store/modules/Ui'

import type { StoreHomeType } from '@/store/modules/Home'
import type { StoreUploadType } from '@/store/modules/Upload'
import type { StoreMyListType } from '@/store/modules/MyList'
import type { StoreVideoType } from '@/store/modules/Video'
import type { StoreUiType } from '@/store/modules/Ui'

export interface RootState {
  Home: StoreHomeType
  Upload: StoreUploadType
  MyList: StoreMyListType
  Video: StoreVideoType
  Ui: StoreUiType
}

export default createStore<RootState>({
  modules: {
    Home,
    Upload,
    MyList,
    Video,
    Ui
  }
})
