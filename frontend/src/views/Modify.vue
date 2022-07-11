<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import text_converter from '@/helper/text_converter'
import Icon from '@/components/util/Icon.vue'

const store = useStore()
const route = useRoute()

const videoList = computed(() => store.getters['MyList/videoList'])

const key = route.params.key

onMounted(() => {
  store.dispatch('MyList/getVideoList')
})
</script>

<template>
  <div class="pt-5 px-3">
    <div class="bg-white">
      <div class="flex p-5 items-center justify-between">
        <h2 class="text-3xl font-bold">동영상 세부정보</h2>
        <div class="flex gap-6">
          <button class="text-blue-700"
            type="button"
          >변경사항 취소</button>
          <button class="px-3 py-2 border border-blue-700 rounded bg-blue-700 text-white"
            type="button"
          >저장</button>
        </div>
      </div>
      <div class="flex p-5 gap-5">
        <div class="flex flex-col w-4/5">
          <textarea class="w-full h-30 p-3 border border-gray-500 rounded resize-none"
            placeholder="제목"
          ></textarea>
          <textarea class="w-full flex-auto mt-3 p-3 border border-gray-500 rounded resize-none"
            placeholder="내용"
          ></textarea>
        </div>
        <div class="w-1/5">
          <video v-if="key" width="320" height="240" controls>
            <source :src="`http://localhost:3000/api/video/stream?key=${key}`" type="video/mp4">
            Your browser does not support the video tag.
          </video>
          <div class="p-5 bg-gray-200">
            <h2>동영상 링크</h2>
            <router-link class="mt-3 text-blue-700"
            :to="{name: 'watch', params: {key: key}}">
              http://localhost:3000/key
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

