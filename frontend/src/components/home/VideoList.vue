<script setup lang="ts">
import { toRefs, computed } from 'vue'

const props = defineProps({
  watchKey: String,
  name: String,
  title: String,
  subject: String,
  second: Number,
  count: Number 
})

const {watchKey, title, subject, count} = toRefs(props)

const second = computed(() => {
  if (props.second) {
    let count = Math.floor(props.second)
    let time = {
      hour: 0,
      minute: 0,
      second: 0
    }
    // 시간으로 나눔
    time.hour = Math.floor(count / (24 * 60))
    if (count % (24 * 60)) {
      // 나머지를 분으로 나눈뒤 세팅
      count = count % (24 * 60)
      time.minute = Math.floor(count / 60)
    }
    if (count % 60) {
      // 그외 나머지값은 모두 초
      count = count % 60
      time.second = count % 60
    }
    return `${time.hour ? time.hour + ':' : ''}${time.minute ? time.minute : 0}:${time.second}`
  }
  return '0'
})
</script>

<template>
  <div class="max-w-[360px]">
    <router-link :to="{name: 'watch', params: {key: watchKey}}">
      <figure class="relative">
        <img class="block mx-auto" :src="`http://localhost:3000/api/thumbnail?key=${watchKey}`"/>
        <figcaption class="px-1 border-0 rounded-sm absolute right-2 bottom-1 bg-stone-900 text-gray-50">{{second}}</figcaption>
      </figure>
    </router-link>
    <div class="flex mt-3 px-5 items-start">
      <router-link to="#">
        <img class="rounded-full"
          src="https://via.placeholder.com/50x50"
        />
      </router-link>
      <div class="w-11/12 ml-5">
        <router-link class="max-h-12 overflow-hidden text-ellipsis video-title text-gray-900"
          :to="{name: 'watch', params: {key: watchKey}}"
        >{{title}}</router-link>
        <router-link class="block mt-1 text-sm text-gray-500"
          to="#"
        >{{subject}}</router-link>
        <p class="text-sm text-gray-500">
          조회수 {{count}}회
        </p>
      </div>
    </div>
  </div>
</template>