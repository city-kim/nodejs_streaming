<script setup lang="ts">
import { onMounted } from 'vue'
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import VideoList from '@/components/search/VideoList.vue'
import type { VideoInfo } from '@/types/Video'
import router from '@/router'
import toast from '@/helper/toast'

const store = useStore()
const list = store.getters['Home/searchList']

const videoList = computed<Array<Array<VideoInfo>>>(() => {
  const array = []
  // 정렬을 위해 n개씩 배열에 다시담음
  if (list.length > 0) {
    for (let i=0; i<list.length; i+=4) {
      array.push(list.slice(i, i+4))
    }
  }
  return array
})

onMounted(() => {
  if (list.length < 1) {
    // 검색값이 없다면
    toast.wakeup({
      title: '실패',
      contents: '검색내용을 찾을 수 없습니다.'
    })
    router.push({name: 'home'})
  }
})
</script>

<template>
  <div class="pt-5 px-3 bg-gray-200">
    <div class="2xl:container mx-auto flex flex-wrap gap-y-10 justify-center items-baseline">
      <div class="flex flex-col gap-3"
        v-for="array in videoList"
      >
        <VideoList v-for="list in array"
          class="flex mx-3"
          :watchKey="list.key"
          :name="list.name"
          :title="list.title"
          :subject="list.subject"
          :second="list.second"
          :count="list.count"
          :regist_at="list.regist_at"
          type="wide"
        ></VideoList>
      </div>
    </div>
  </div>
</template>

