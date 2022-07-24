<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import router from '@/router'

import Icon from '@/components/util/Icon.vue'
import toast from '@/helper/toast'

const store = useStore() // vuex
const route = useRoute() // 라우터
const key = route.params.key as string // 비디오 key

const videoData = computed(() => store.getters['Video/infomation'])

const title = ref('') // 제목
const subject = ref('') // 내용

function checkCLipboardPermission (key: string) {
  // 클립보드 접근권한 확인하기
  const permissionName = "clipboard-write" as PermissionName;
  navigator.permissions.query({ name: permissionName }).then((permission) => {
    if (permission.state == 'granted') {
      // 이미 허용인경우
      updateClipboard(key)
    }
    // 권한 상태가 변경 됐을때
    permission.onchange = () => {
      if (permission.state == 'granted') {
        // 이미 허용인경우
        updateClipboard(key)
      }
    };
  });
}

function updateClipboard(key: string) {
  // 클립보드에 코드 복사하기
  navigator.clipboard.writeText(`http://localhost:3000/${key}`).then(function() {
    // 성공시
    toast.wakeup({
      title: '완료', // 제목
      contents: '클립보드에 비디오링크가 복사되었습니다.' // 내용
    })
  }, function() {
    // 실패시
    toast.wakeup({
      title: '실패', // 제목
      contents: '비디오링크를 복사하는데 실패하였습니다.' // 내용
    })
  });
}

function resetData () {
  // 수정내용 초기화하기
  title.value = videoData.value.title
  subject.value = videoData.value.subject
}

function submit () {
  // 전송하기
  store.dispatch('Video/updateInfomation', {
    key: key,
    title: title.value,
    subject: subject.value
  })
  .then((res) => {
    toast.wakeup({
      title: '완료',
      contents: '비디오 정보를 수정하였습니다',
      duration: 3000
    })
    router.push({name: 'mylist'}) // 성공시 나의 콘텐츠로 이동
  })
  .catch((err) => {
    toast.wakeup({
      title: '실패',
      contents: '비디오 정보를 수정하는데 실패하였습니다.',
      duration: 5000
    })
  })
}

const disabledSubmit = computed(() => {
  // 변동된 내용이 있다면 전송활성화
  return (title.value != videoData.value.title || subject.value != videoData.value.subject) ? false : true
})

onMounted(() => {
  store.dispatch('Video/getVideoInfomation', {key: key})
  .then((data) => {
    // 변경사항 취소를 적용하기 위해 로드되면 정보를 업데이트해줌
    title.value = videoData.value.title
    subject.value = videoData.value.subject
  })
})
</script>

<template>
  <form @submit.prevent="submit()">
    <div class="pt-5 px-3">
      <div class="bg-white">
        <div class="flex p-5 items-center justify-between">
          <h2 class="text-3xl font-bold">동영상 세부정보</h2>
          <div class="flex gap-6">
            <button class="text-blue-700"
              type="button"
              @click="resetData()"
            >변경사항 취소</button>
            <button class="px-3 py-2 border rounded text-white"
              :class="[disabledSubmit ? 'border-gray-200 bg-gray-200' : 'border-blue-700 bg-blue-700']"
              type="submit"
              :disabled="disabledSubmit"
            >저장</button>
          </div>
        </div>
        <div class="flex p-5 gap-5">
          <div class="flex flex-col w-4/5">
            <textarea class="w-full h-30 p-3 border border-gray-500 rounded resize-none"
              placeholder="제목"
              v-model="title"
            ></textarea>
            <textarea class="w-full flex-auto mt-3 p-3 border border-gray-500 rounded resize-none"
              placeholder="내용"
              v-model="subject"
            ></textarea>
          </div>
          <div class="w-1/5">
            <video v-if="key" width="320" height="240" controls>
              <source :src="`http://localhost:3000/api/video/stream?key=${key}`" type="video/mp4">
              Your browser does not support the video tag.
            </video>
            <div class="p-5 bg-gray-200">
              <section class="flex justify-between">
                <h2>동영상 링크</h2>
                <Icon class="cursor-pointer"
                  icon="files"
                  @click="checkCLipboardPermission(key)"
                ></Icon>
              </section>
              <router-link class="mt-3 text-blue-700"
                :to="{name: 'watch', params: {key: key}}"
              >
                {{`http://localhost:3000/${key}`}}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

