<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import { secondToTime, timeComparison } from '@/helper/text_converter'
import Icon from '@/components/util/Icon.vue'
import ModalVue from '@/components/myList/Modal.vue'
import type { ModalType } from '@/types/MyList'
import type { VideoList, VideoInfo } from '@/types/Video'

const store = useStore();
const videoList = computed<VideoList>(() => store.getters['MyList/videoList'])

let modalConfig = ref<ModalType>({
  key: '',
  title: '',
  regist_at: '',
  count: 0,
  second: 0
})

const isModalShow = ref(false) // 모달 출력여부

function removeModal (list: VideoInfo) {
  // 삭제모달 출력
  modalConfig.value = list
  isModalShow.value = true
}

function closeModal (isReload: boolean) {
  isModalShow.value = false
  modalConfig.value = {
    key: '',
    title: '',
    regist_at: '',
    count: 0,
    second: 0
  }
  if (isReload) {
    // 새로고침 여부
    store.dispatch('MyList/getVideoList')
  }
}

onMounted(() => {
  store.dispatch('MyList/getVideoList')
})
</script>

<template>
  <div class="pt-5 px-3">
    <div class="bg-white">
      <h2 class="p-5 text-3xl font-bold">나의 콘텐츠 목록</h2>
      <div class="flex w-full mt-3 py-3 px-5 border-y border-gray-300">
        <div class="w-1/2 pl-5">동영상</div>
        <div class="w-1/4">날짜</div>
        <div class="w-1/4">조회수</div>
      </div>
      <div class="flex px-5 border-b border-gray-300 hover:bg-gray-100"
        v-for="list in videoList"
        :key="list.key"
      >
        <div class="flex w-1/2 py-1 pl-5 items-center relative group">
          <div class="min-w-[160px]">
            <router-link :to="{name: 'mylist.modify', params: {key: list.key}}">
              <figure class="relative">
                <img class="w-40"
                  :src="`http://localhost:3000/api/thumbnail?key=${list.key}`"
                />
                <figcaption class="px-1 border-0 rounded-sm absolute right-2 bottom-1 bg-stone-900 text-gray-50">{{secondToTime(list.second)}}</figcaption>
              </figure>
            </router-link>
          </div>
          <div class="hidden sm:block ml-5">
            <h3 class="text-lg break-all"
              :class="[list.title ? 'text-black' : 'text-gray-400']"
            >{{list.title ? list.title : '제목없음'}}</h3>
            <h3 class="text-base break-all"
              :class="[list.title ? 'text-gray-800' : 'text-gray-300']"
            >{{list.subject ? list.subject : '설명없음'}}</h3>
          </div>
          <div class="hidden group-hover:flex pl-5 gap-3 left-1/2 bottom-0 bg-white absolute">
            <router-link :to="{name: 'mylist.modify', params: {key: list.key}}">
              <Icon icon="pencil_square"
                size="1.5rem"
                classes="fill-gray-500 hover:fill-black"
              ></Icon>
            </router-link>
            <router-link :to="{name: 'watch', params: {key: list.key}}">
              <Icon icon="play_fill"
                size="1.5rem"
                classes="fill-gray-500 hover:fill-black"
              ></Icon>
            </router-link>
            <button type="button"
              @click="removeModal(list)"
            >
              <Icon icon="trash"
                size="1.5rem"
                classes="fill-gray-500 hover:fill-black"
              ></Icon>
            </button>
          </div>
        </div>
        <div class="flex w-3/12 items-center">
          {{timeComparison(list.regist_at)}}
        </div>
        <div class="flex w-3/12 items-center">
          {{list.count}}회
        </div>
      </div>
      <div v-show="videoList.length < 1"
        class="py-5 text-center"
      >
        업로드된 비디오가 없습니다
      </div>
    </div>
    <ModalVue v-if="isModalShow"
      :modalConfig="modalConfig"
      @update:closeModal="closeModal"
    ></ModalVue>
  </div>
</template>

