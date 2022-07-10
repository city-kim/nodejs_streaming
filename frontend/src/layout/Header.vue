<script setup lang="ts">
import Icon from '@/components/util/Icon.vue'
</script>

<template>
  <div class="flex px-4 py-2 gap-8 items-center justify-between">
    <div class="flex">
      <button type="button">
        <Icon icon="list"
          size="2rem"
        ></Icon>
      </button>
      <img class="ml-4 px-4 py-3 cursor-pointer" src="https://via.placeholder.com/97x20"/>
    </div>
    <div class="flex max-w-screen-md flex-auto border border-gray-600 rounded overflow-hidden">
      <input class="flex-auto px-2 py-2"
        type="text"
        placeholder="검색"
      />
      <button class="px-4 border-l border-gray-600"
        type="button">
        <Icon icon="search"
          size="1rem"
        ></Icon>
      </button>
    </div>
    <div class="flex gap-6 items-center">
      <icon icon="bell"
        size="1.5rem"
      ></icon>
      <router-link to="#">
        <img class="w-10 rounded-full"
          src="~@/assets/person.jpg"
        />
      </router-link>
    </div>
  </div>
</template>