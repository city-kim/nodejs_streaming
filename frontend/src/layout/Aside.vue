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
  <nav>
    <router-link
      v-for="list in publicLink"
      v-slot="{ href, isActive }"
      :to="list.link"
    >
      <li class="flex w-full p-2 hover:bg-gray-200 items-center"
        :class="{'bg-gray-200': isActive}"
      >
        <icon classes="mr-4" :icon="list.icon"/>
        {{list.name}}
      </li>
    </router-link>
  </nav>
  <nav class="flex flex-col pt-4 gap-2 border-t border-gray-300">
    <router-link
      v-for="list in privateLink"
      v-slot="{ href, isActive }"
      :to="list.link"
    >
      <li class="flex w-full p-2 hover:bg-gray-200 items-center"
        :class="{'bg-gray-200': isActive}"
      >
        <icon classes="mr-4" :icon="list.icon"/>
        {{list.name}}
      </li>
    </router-link>
  </nav>
  <a class="mt-auto py-2 text-sm text-gray-200"
    href="https://github.com/nkdevil"
    target="_blank"
  >Copyright 2022. Kim Chan Tae</a>
</div>
</template>