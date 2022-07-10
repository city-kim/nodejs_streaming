<script setup lang="ts">
import { onMounted } from 'vue'
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import VideoList from '@/components/home/VideoList.vue'

const store = useStore()

const videoList = computed(() => store.getters['Home/videoList'])

onMounted(() => {
  store.dispatch('Home/getVideoList')
})
</script>

<template>
  <div class="pt-5 px-3 bg-gray-200">
    <div class="container mx-auto flex flex-wrap gap-x-5 gap-y-10 justify-center items-baseline">
      <VideoList v-for="list in videoList"
        :watchKey="list.key"
        :name="list.name"
        :title="list.title"
        :subject="list.subject"
        :second="list.second"
        :count="list.count"
      ></VideoList>
    </div>
  </div>
</template>

