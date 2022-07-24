<script setup lang="ts">
import { toRefs } from 'vue'
import { timeComparison } from '@/helper/text_converter'
import Icon from '@/components/util/Icon.vue'

const props = defineProps({
  watchKey: String,
  name: String,
  title: String,
  subject: String,
  regist_at: {
    type: String,
    required: true
  },
  second: {
    type: Number,
    required: true
  },
  count: Number
})

const {watchKey, title, subject, count} = toRefs(props)
</script>

<template>
  <div>
    <router-link :to="{name: 'watch', params: {key: watchKey}}">
      <figure class="relative">
        <img class="block mx-auto" :src="`http://localhost:3000/api/thumbnail?key=${watchKey}`"/>
        <figcaption class="px-1 border-0 rounded-sm absolute right-2 bottom-1 bg-stone-900 text-gray-50">{{second}}</figcaption>
      </figure>
    </router-link>
    <div class="ml-4">
      <h2 class="text-2xl">{{title}}</h2>
      <div class="flex items-center">
        <p>조회수 {{count}}회</p>
        <icon icon="dot"
          size="1rem"
        ></icon>
        <p>{{timeComparison(regist_at)}}</p>
      </div>
    </div>
  </div>
</template>