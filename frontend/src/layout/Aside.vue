<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import PcAside from '@/components/aside/Pc.vue'
import MobileAside from '@/components/aside/Mobile.vue'

const store = useStore()
const screenType = computed(() => store.getters['Ui/screenType']) // 화면 타입
</script>

<template>
  <PcAside v-show="screenType == 'pc'"></PcAside>
  <MobileAside v-show="screenType == 'mobile'"></MobileAside>
</template>