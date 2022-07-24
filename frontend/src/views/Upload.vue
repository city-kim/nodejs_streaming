<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'

import Icon from '@/components/util/Icon.vue'

const store = useStore() // vuex
const fileUploader = ref<HTMLInputElement | null>(null) // input file element

const file = ref<null | File>(null) // file mounted
const fileError = ref(false) // 파일 에러출력

const sampleVideo = ref('') // 비디오 샘플이미지

const videoEl = ref<null | HTMLVideoElement>(null) // 샘플 비디오
const canvasEl = ref<null | HTMLCanvasElement>(null) // 썸네일 캔버스

const progressBar = ref(0) // 프로그레스바
const uploadText = ref('업로드중...') // 업로드 출력 텍스트

function fileSelect () {
  // window창 띄워서 파일을 선택시키기
  fileUploader.value?.click()
}

function onDragover (event: Event) {
  // element가 드래그되지 않도록함
  event.preventDefault()
}
function onDrop (event: DragEvent) {
  // 드래그 완료시
  event.preventDefault()
  if (event.dataTransfer) {
    file.value = event.dataTransfer.files[0]
  }
}

function setInputFile (event: Event) {
  // input file 마운트
  let files = (event.target as HTMLInputElement).files
  if (files) {
    file.value = files[0]
    uploadFile()
  } else {
    fileError.value = true
  }
  
  if (fileUploader.value) {
    fileUploader.value.value = ''
  }
}

async function uploadFile () {
  // 파일 업로드
  if (file.value) {
    sampleVideo.value = URL.createObjectURL(file.value)
    const video = videoEl.value
    const chunkSize = 1 * (1024*1024) // 1MB
    const blobLength = Math.ceil(file.value.size / chunkSize) // 올림으로 index를 만든다
    let fileArray = []
    let sliceStart = 0 // slice 시작
    for (let i=0; i<blobLength; i++) {
      // 파일 분할하기
      let sliceEnd = Math.min(chunkSize * (i + 1) , file.value.size )
      // 마지막 index를 file.size까지이기 때문에 chunkSize * index 사이즈와 비교해 작은값을 쓴다
      fileArray.push(file.value.slice(sliceStart, sliceEnd, file.value.type))
      // file Array에 담아주기
      sliceStart = sliceEnd
      // 다음 시작지점은 종료지점과 같다
    }

    const key = Math.random().toString(16).substring(2)

    for (let i=0; i<fileArray.length; i++) {
      // 한개씩 서버로 전송한다
      // this.uploadFile(key, file.value.name, blobLength, i)
      await store.dispatch('Upload/postUploadFile', {
        key: key,
        file: fileArray[i],
        size: blobLength,
        index: i
      })
      progressBar.value = ((i + 1) / blobLength * 100)
    }

    store.dispatch('Upload/createVideo', {
      key: key, // 랜덤 key값
      size: blobLength, // index 사이즈
      name: file.value.name, // 파일명
      type: file.value.type, // 파일타입
    }).then((res) => {
      uploadText.value = '비디오를 만드는중...'
      file.value = null
      if (video) {
        // 캔버스로 썸네일 만들기
        let ctx = canvasEl.value?.getContext('2d')
        ctx?.drawImage(video, 0, 0, 360, 200)
        canvasEl.value?.toBlob((file) => {
          store.dispatch('Upload/postUploadThumbnail', {
            file: file,
            key: key
          })
          .then((res) => {
            uploadText.value = '썸네일 제작중...'
            setTimeout(() => {
              router.push({name: 'mylist.modify', params: { key: key }})
              progressBar.value = 0
            }, 500)
          })
          URL.revokeObjectURL(sampleVideo.value)
          sampleVideo.value = ''
        },'image/png')
      }
    })
  }
}

</script>

<template>
<div class="h-full p-5">
  <div class="flex flex-col h-full items-center justify-between bg-white border-0 rounded-lg"
    id="dragZone"
    @dragover="onDragover($event)"
    @drop="onDrop($event)"
  >
    <section class="mt-[30vh] text-center"
      v-show="progressBar < 1"
    >
      <input class="hidden"
        type="file"
        ref="fileUploader"
        @change="setInputFile($event)"
      />
      <div class="flex w-40 h-40 mx-auto items-center justify-center bg-gray-200 rounded-full cursor-pointer"
        @click="fileSelect"
      >
        <div class="upload-btn-group">
          <div class="w-0 h-0">
          </div>
          <div class="w-8 mx-auto bg-gray-300 transition-all"
            :class="[file ? 'h-2' : 'h-5']"
          ></div>
          <div class="w-full h-2 mt-3 bg-gray-300"></div>
        </div>
      </div>
      <h2 class="mt-3 text-3xl font-bold">동영상 업로드</h2>
      <p class="mt-3 text-gray-700">동영상 파일을 드래그 앤 드롭하여 업로드</p>
      <p v-show="fileError"
        class="flex mt-3 items-center justify-center"
      >
        <icon icon="exclamation"
          class="fill-red-500 mr-3"
        ></icon>파일 형식이 잘못되었습니다.
      </p>
      <button class="mt-8 px-8 py-3 border border-blue-700 rounded bg-blue-500 text-white"
        type="button"
        @click="fileSelect"
      >파일 선택</button>
    </section>

    <div class="w-1/2 mt-[30vh] p-y-2 bg-gray-200 rounded-full h-2.5"
      v-show="progressBar > 0"
    >
      <div class="bg-blue-600 h-2.5 rounded-full" :style="`width: ${progressBar}%`"></div>
      <h2 class="mt-3 text-center text-3xl">{{uploadText}}</h2>
    </div>

    
      <video class="w-0 h-0 invisible"
        :src="sampleVideo"
        ref="videoEl"
      ></video>
      <canvas
        class="invisible fixed right-0 bottom-0 z-0"
        width="360"
        height="200"
        ref="canvasEl"
      ></canvas>
    <p class="mt-auto pb-2 text-gray-500">불법촬영물 게재시 삭제 조치되고 관련 법에 따라 처벌 받을 수 있습니다. 타인의 저작권 또는 개인정보 보호 권한을 침해해서는 안 됩니다.</p>
  </div>
</div>
</template>

