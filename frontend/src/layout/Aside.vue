<script setup lang="ts">
import Icon from '@/components/util/Icon.vue'

const publicLink = [
  { link: { name: 'home' }, name: '홈', icon: 'house' }
]
const privateLink = [
  { link: { name: 'history' }, name: '시청기록', icon: 'history' },
  { link: { name: 'upload' }, name: '업로드', icon: 'play' },
  { link: { name: 'mylist' }, name: '콘텐츠', icon: 'film' }
]
</script>

<template>
<div class="flex flex-col pt-4 px-4 gap-4">
  <ul>
    <li v-for="list in publicLink"
      class="hover:bg-gray-200"
    >
      <router-link class="flex w-full p-2 items-center"
        :to="list.link">
        <icon classes="mr-4" :icon="list.icon"/>
        {{list.name}}
      </router-link>
    </li>
  </ul>
  <ul class="flex flex-col pt-4 gap-2 border-t border-gray-300">
    <li v-for="list in privateLink"
      class="hover:bg-gray-200"
    >
      <router-link class="flex w-full p-2 items-center"
        :to="list.link">
        <icon classes="mr-4" :icon="list.icon"/>
        {{list.name}}
      </router-link>
    </li>
  </ul>
  <a class="mt-auto py-2 text-sm text-gray-200"
    href="https://github.com/nkdevil"
    target="_blank"
  >Copyright 2022. Kim Chan Tae</a>
</div>
</template>