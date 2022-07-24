<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive, watch, Transition } from 'vue';

import Icon from '@/components/util/Icon.vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  duration: Number,
  title: String,
  contents: String
})

const toastData = reactive({
  isShow: false, // 화면 출력여부
  timer: null as unknown as ReturnType<typeof setTimeout>, // 타이머
});

onMounted(() => {
  startTimer(); // 타이머를 시작해줌
  toastData.isShow = true; // show해줌
});

onUnmounted(() => {
  clearTimeout(toastData.timer); // 언마운트시 타이머를 클리어해줌
});

const startTimer = () => {
  let duration = 2000 // 기본 지연시간
  if (props.duration) {
    duration = props.duration // 지연시간 전달받은경우 세팅
  }
  toastData.timer = setTimeout(() => {
    // 지연종료되면
    if (!closed.value) {
      close(); // close함수 호출
    }
  }, duration);
};

const closed = ref(false); // 닫힘버튼 클릭여부
const close = () => {
  // close함수 호출시
  closed.value = true; // 닫힘버튼 동작으로세팅
  clearTimeout(toastData.timer) // 타이머 삭제
};
const toastWrap = document.getElementById('__toast__wrap');

watch(closed, (newVal) => {
  // 닫힘버튼 값이 업데이트되면
  if (newVal) {
    toastData.isShow = false; // 토스트 숨겨줌
    setTimeout(() => {
      // 애니메이션 고려 지연시간 반영 후 dom 삭제해줌
      if (toastWrap) {
        let node = document.getElementById(props.id)
        if (node?.parentNode) {
          node.parentNode.removeChild(node)
        }
      }
    }, 500);
  }
});
</script>

<template>
  <transition
    leave-from-class="opacity-100"
    leave-active-class="transition-opacity"
    leave-to-class="opacity-0"
  >
    <div class="w-96 mt-3 border border-gray-300 rounded shadow bg-white"
      v-if="toastData.isShow"
    >
      <div class="flex py-2.5 px-3.5 justify-between items-center">
        <h3>{{props.title}}</h3>
        <div class="flex justify-between items-center">
          <!-- <p class="text-sm">TODO: 7 second ago</p> -->
          <Icon class="w-6 stroke-1 cursor-pointer"
            icon="x"
            @click="close()"
          ></Icon>
        </div>
      </div>
      <div class="p-3.5 border-t">
        <p class="text-sm whitespace-pre-line">{{props.contents}}</p>
      </div>
    </div>
  </transition>
</template>
