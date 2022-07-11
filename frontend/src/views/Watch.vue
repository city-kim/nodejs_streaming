<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const store = useStore()
const router = useRoute()

const stream = computed(() => router.params.key)

onMounted(() => {
  store.dispatch('Home/putVideoCount', {key: router.params.key})
})
</script>

<template>
  <video v-if="stream" width="320" height="240" controls>
    <source :src="`http://localhost:3000/api/video/stream?key=${stream}`" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</template>

