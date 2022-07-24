<script setup lang="ts">
import { toRefs, computed } from 'vue'
import { secondToTime } from '@/helper/text_converter'

const props = defineProps({
  watchKey: String,
  name: String,
  title: String,
  subject: String,
  second: {
    type: Number,
    required: true
  },
  count: Number
})

const {watchKey, title, count} = toRefs(props)

const second = computed(() => secondToTime(props.second))
</script>

<template>
  <div class="flex flex-col max-w-[360px]">
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
        <p class="text-sm text-gray-500">
          조회수 {{count}}회
        </p>
      </div>
    </div>
  </div>
</template>