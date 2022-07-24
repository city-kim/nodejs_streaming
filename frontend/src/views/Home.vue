<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import SkeletonList from '@/components/home/SkeletonList.vue'
import VideoList from '@/components/home/VideoList.vue'
import Icon from '@/components/util/Icon.vue'
import type { VideoInfo } from '@/types/Video'

const store = useStore()
const video = computed(() => store.getters['Home/videoList']) // 영상정보
const breakPoint = computed(() => store.getters['Ui/breakPoint']) // window size

const sliceCount = computed(() => {
  if (breakPoint.value == 'lg') {
    return 3
  } else if (breakPoint.value == 'md') {
    return 2
  } else if (breakPoint.value == 'sm') {
    return 1
  }
  return 4
})

const videoList = computed<Array<Array<VideoInfo>>>(() => {
  const array = []
  const list = video.value.list
  // 정렬을 위해 n개씩 배열에 다시담음
  if (list.length > 0) {
    for (let i=0; i<list.length; i+=sliceCount.value) {
      array.push(list.slice(i, i+sliceCount.value))
    }
  }
  return array
})

onMounted(() => {
  store.dispatch('Home/getVideoList')
})
</script>

<template>
  <div class="pt-5 px-3 bg-gray-200">
    <div class="2xl:container mx-auto flex flex-wrap gap-y-10 items-baseline">
      <SkeletonList v-show="video.isLoading"
        :row="3"
        :column="sliceCount"
      ></SkeletonList>
      <div class="w-full flex sm:grid justify-center"
        :class="`grid-cols-${sliceCount}`"
        v-show="!video.isLoading"
        v-for="array in videoList"
      >
        <VideoList v-for="list in array"
          class="mx-3"
          :watchKey="list.key"
          :name="list.name"
          :title="list.title"
          :second="list.second"
          :count="list.count"
          type="base"
        ></VideoList>
      </div>
    </div>
    <div class="flex w-full h-full items-center justify-center"
      v-show="videoList.length < 1"
    >
      <div class="text-center">
        <Icon icon="exclamation"
          classes="mx-auto"
          size="5rem"
        ></Icon>
        <p class="mt-3 text-xl">영상을 업로드 또는 제목을 지정해주세요</p>
        <router-link :to="{name: 'upload'}"
          class="block mt-4 px-4 py-2 border border-blue-700 rounded bg-blue-500 text-white"
        >업로드하기</router-link>
      </div>
    </div>
  </div>
</template>

