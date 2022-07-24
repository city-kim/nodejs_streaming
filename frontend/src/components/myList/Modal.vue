<script setup lang="ts">
import { defineProps, PropType, computed } from 'vue'
import { useStore } from 'vuex'
import { secondToTime } from '@/helper/text_converter'
import type { ModalType } from '@/types/MyList'

const store = useStore()

const props = defineProps({
  modalConfig: {
    type: Object as PropType<ModalType>,
    required: true
  }
})

const modalConfig = computed(() => props.modalConfig) // 모달정보

const emit = defineEmits(['update:closeModal']) // 부모 comp에 모달이 닫힘을 전달

function removeVideo () {
  // 영상 삭제하기
  store.dispatch('MyList/removeVideo', props.modalConfig.key)
  .then((res) => {
    emit('update:closeModal', true)
  })
  .catch((err) => {
    emit('update:closeModal', true)
  })
}
</script>
<template>
  <div class="flex w-full h-full items-center justify-center bg-black/50 fixed top-0 right-0 z-10">
    <div class="w-4/12 p-5 bg-white rounded-lg">
      <h2 class="text-xl">이 동영상을 완전히 삭제하시겠습니까?</h2>
      <div class="flex mt-6 p-4 bg-gray-200">
        <div class="flex">
          <figure class="relative">
            <img class="w-40"
              :src="`http://localhost:3000/api/thumbnail?key=${modalConfig.key}`"
            />
            <figcaption class="px-1 border-0 rounded-sm absolute right-2 bottom-1 bg-stone-900 text-gray-50">
              {{secondToTime(modalConfig.second)}}
            </figcaption>
          </figure>
        </div>
        <section class="ml-3">
          <h2 class="text-base">{{modalConfig.title ? modalConfig.title : '제목없음'}}</h2>
          <h3 class="text-base text-gray-700">업로드 날짜: {{modalConfig.regist_at}}</h3>
          <p class="text-base text-gray-500">조회수 {{modalConfig.count}}회</p>
        </section>
      </div>
      <fieldset class="mt-3">
        <label>
          <input type="checkbox"/>
          <span class="ml-3">삭제된 동영상은 되돌릴 수 없음을 알고 있습니다.</span>
        </label>
      </fieldset>
      <div class="flex mt-6 justify-between">
        <a class="text-blue-700"
          :href="`http://localhost:3000/api/thumbnail?key=${modalConfig.key}`"
          target="_blank"
        >동영상 오프라인 저장</a>
        <div class="flex gap-5 text-blue-700">
          <button type="button"
            @click="emit('update:closeModal', false)"
          >취소</button>
          <button type="button"
            @click="removeVideo"
          >삭제</button>
        </div>
      </div>
    </div>
  </div>
</template>