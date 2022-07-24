<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import Header from '@/layout/Header.vue'
import Aside from '@/layout/Aside.vue'

const store = useStore()

const screenType = computed(() => store.getters['Ui/screenType'])
const asideUi = computed(() => store.getters['Ui/asideUi'])

const wrapClass = computed(() => {
  if (screenType.value == 'pc') {
    // pc일경우
    if (asideUi.value.pcShort) {
      // sidebar를 줄인경우
      return 'margin-left: 80px'
    } else {
      return 'margin-left: 240px'
    }
  }
})

function windowResize (event: UIEvent) {
  // window resize시 vuex에 전달
  const inner = event.target as Window
  store.commit('Ui/WINDOW_RESIZE', {
    width: inner.innerWidth,
    height: inner.innerHeight
  })
}

onMounted(() => {
  // 로드시 윈도우 사이즈 설정
  store.commit('Ui/WINDOW_RESIZE', {
    width: window.innerWidth,
    height: window.innerHeight
  })
  // resize event
  window.addEventListener('resize', windowResize)
})
</script>

<template>
<Header class="w-full fixed top-0 left-0 border-b border-gray-300 bg-white z-10"></Header>
<Aside></Aside>
<div class="h-full mt-[60px]"
  :style="wrapClass"
>
  <router-view class="h-full"/>
</div>
</template>

