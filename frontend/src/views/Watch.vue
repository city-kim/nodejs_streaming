<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { VideoInfo } from '@/types/Video'
import { secondToTime, timeComparison } from '@/helper/text_converter'
import Icon from '@/components/util/Icon.vue'

const store = useStore()
const router = useRoute()

const videoEl = ref<null | HTMLVideoElement>(null) // 비디오 element
const stream = computed(() => router.params.key) // 비디오 key
const videoData = computed<VideoInfo>(() => store.getters['Video/infomation']) // 비디오정보
const videoWrap = ref<HTMLDivElement | null>(null)
const playUi = ref(false) // ui 플레이여부
const isVideoPlay = ref(false) // 비디오 플레이상태
const currentTime = ref(0) // 비디오 재생시간
const playPercent = ref(0) // 비디오 플레이 퍼센트
const timePosition = ref(0) // 비디오바 hover시 포지션
const hoverTime = ref(0) // 비디오바 hover시 출력할 시간
const volume = ref(0.5) // 비디오 볼륨
let saveVolume = 0; // 볼륨 저장용
const isVolumeMuted = ref(false) // 비디오 음소거 여부

function videoClickPlay () {
  playUi.value = true
  videoStatus()
  setTimeout(() => {
    playUi.value = false
  }, 300);
}

function videoStatus () {
  // 비디오 상태 변경
  if (videoEl.value) {
    // 로드된경우만
    if (videoEl.value.paused || videoEl.value.ended) {
      // 멈춰있다면 플레이
      isVideoPlay.value = true
      videoEl.value.play()
    } else {
      // 플레이중이라면 멈추기
      isVideoPlay.value = false
      videoEl.value.pause()
    }
  }
}

function videoTimeUpdate () {
  if (videoEl.value) {
    // 비디오가 로드된 경우에만
    currentTime.value = videoEl.value.currentTime // 플레이타임
    playPercent.value = Math.floor((currentTime.value / videoEl.value.duration) * 100) // 플레이 시간
  }
}

function hoverVideoBar (event: MouseEvent) {
  // 마우스 오버시 시간 표시용
  let maxPosition = 0
  if (videoWrap.value) {
    // wrap의 총 넓이
    maxPosition = videoWrap.value.clientWidth
  }

  if (maxPosition && event.offsetX > maxPosition - 50) {
    // 타이머가 화면을 벗어나는 것을 방지함 최대 넓이가 있으면서 offsetX가 설정한 값보다 크다면
    timePosition.value = maxPosition - 50
  } else {
    timePosition.value = event.offsetX
  }

  hoverTime.value = Math.floor((event.offsetX / maxPosition) * videoData.value.second)
}

function skipVideo(event: Event) {
  // 비디오 재생위치 바꾸기
  playPercent.value = Number((<HTMLInputElement>event.target).value)
  if (videoEl.value) {
    // 재생시간은 비디오 전체시간 * 비율 / 100
    videoEl.value.currentTime = videoEl.value.duration * (playPercent.value / 100)
  }
}

function volumechange () {
  // 볼륨 조절하기
  if(videoEl.value) {
    if (videoEl.value.muted) {
      // 뮤트상태라면 해제
      videoEl.value.muted = false
      isVolumeMuted.value = false
    }

    // 볼륨값을 조절해줌
    videoEl.value.volume = volume.value
  }
}

function muteToggle () {
  // 볼륨 뮤트 토글
  if (isVolumeMuted.value) {
    // 뮤트상태인경우 해제
    if (videoEl.value) {
      volume.value = saveVolume
      videoEl.value.muted = false
      isVolumeMuted.value = false
    }
  } else {
    // 아닐경우 뮤트
    if (videoEl.value) {
      saveVolume = volume.value
      volume.value = 0
      videoEl.value.muted = true
      isVolumeMuted.value = true
    }
  }
}

onMounted(() => {
  store.dispatch('Video/putVideoCount', {key: stream.value})
  store.dispatch('Video/getVideoInfomation', {key: stream.value})
  videoEl.value?.addEventListener('timeupdate', videoTimeUpdate)
})
</script>

<template>
  <div>
    <div class="bg-black">
      <div class="flex justify-center relative">
        <video v-if="stream"
          class="w-5/6 max-h-[80vh]"
          ref="videoEl"
          @click="videoClickPlay"
        >
          <source :src="`http://localhost:3000/api/video/stream?key=${stream}`" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <div class="flex w-full h-full absolute top-0 left-0 justify-center items-center"
          v-show="playUi"
        >
          <div class="p-5 border-0 rounded-full bg-black/50">
            <Icon classes="fill-white"
              :icon="isVideoPlay ? 'play_fill' : 'pause'"
              size="3rem"
            ></Icon>
          </div>
        </div>
      </div>
      <div class="w-full relative video-control"
        ref="videoWrap"
        @mousemove="hoverVideoBar($event)"
        @mouseleave="timePosition = 0"
      >
        <div class="p-1 text-white absolute bg-gary-500 -top-8"
          v-show="timePosition"
          :style="`left: ${timePosition}px`"
        >{{secondToTime(hoverTime)}}</div>
        <div class="w-full h-2 bg-gray-700 absolute top-0 left-0"></div>
        <div class="h-2 bg-orange-600 absolute top-0 left-0"
          :style="`width: ${playPercent}%`"
        ></div>
        <input class="w-full h-2 absolute top-0 left-0 cursor-pointer"
          type="range"
          step="1"
          :value="playPercent"
          :max="100"
          @click="skipVideo($event)"
        >
      </div>
      <div class="flex gap-3 mt-5 items-center fill-white">
        <div class="cursor-pointer">
          <Icon icon="play_fill"
            v-show="!isVideoPlay"
            size="2rem"
            @click="videoStatus"
          ></Icon>
          <Icon icon="pause"
            v-show="isVideoPlay"
            size="2rem"
            @click="videoStatus"
          ></Icon>
        </div>
        <div class="flex gap-3 items-center sound-control">
          <Icon :icon="isVolumeMuted ? 'volume_muted' :
                        volume > 0.6 ? 'volume_high' :
                        volume > 0.3 ? 'volume_middle' : 'volume_low'"
            classes="cursor-pointer"
            size="2rem"
            @click="muteToggle"
          ></Icon>
          <input type="range"
            v-model="volume"
            :style="`background-size: ${volume * 100}% 100%;`"
            max="1"
            min="0"
            step="0.01"
            @input="volumechange"
          />
        </div>
        <div class="text-white">
          <time>{{secondToTime(currentTime)}}</time>
          <span> / </span>
          <time>{{secondToTime(videoData.second)}}</time>
        </div>
      </div>
    </div>
    <div class="pt-5 px-5">
      <h2 class="text-2xl">{{videoData.title}}</h2>
      <div class="flex gap-1 mt-3 items-center">
        <p>조회수 {{videoData.count}}회</p>
        <icon icon="dot"
          size="1rem"
        ></icon>
        <p>{{timeComparison(videoData.regist_at)}}</p>
      </div>
      <p>{{videoData.subject}}</p>
    </div>
  </div>
</template>
