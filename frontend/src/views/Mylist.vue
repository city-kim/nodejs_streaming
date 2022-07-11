<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import text_converter from '@/helper/text_converter'
import Icon from '@/components/util/Icon.vue'

const store = useStore();
const videoList = computed(() => store.getters['MyList/videoList'])

function removeVideo (key: string) {
  store.dispatch('MyList/removeVideo', key)
}

onMounted(() => {
  store.dispatch('MyList/getVideoList')
})
</script>

<template>
  <div class="pt-5 px-3">
    <div class="bg-white">
      <h2 class="p-5 text-3xl font-bold">나의 콘텐츠 목록</h2>
      <div class="flex w-full mt-3 py-3 px-5 border-y border-gray-300">
        <div class="w-1/12">
          <input type="checkbox"/>
        </div>
        <div class="w-1/2">동영상</div>
        <div class="w-1/4">날짜</div>
        <div class="w-1/4">조회수</div>
      </div>
      <div class="flex px-5 border-b border-gray-300 hover:bg-gray-100"
        v-for="list in videoList"
        :key="list.key"
      >
        <div class="w-1/12">
          <input type="checkbox"/>
        </div>
        <div class="flex w-1/2 py-1 items-center">
          <div>
            <router-link :to="{name: 'mylist.modify', params: {key: list.key}}">
              <figure class="relative">
                <img class="w-40"
                  :src="`http://localhost:3000/api/thumbnail?key=${list.key}`"
                />
                <figcaption class="px-1 border-0 rounded-sm absolute right-2 bottom-1 bg-stone-900 text-gray-50">{{text_converter.secondToTime(list.second)}}</figcaption>
              </figure>
            </router-link>
          </div>
          <div class="ml-5">
            <h3 class="text-lg"
              :class="[list.title ? 'text-black' : 'text-gray-400']"
            >{{list.title ? list.title : '제목없음'}}</h3>
            <h3 class="text-base"
              :class="[list.title ? 'text-gray-800' : 'text-gray-300']"
            >{{list.subject ? list.subject : '설명없음'}}</h3>
          </div>
          <div class="flex pl-5 gap-3">
            <router-link :to="{name: 'mylist.modify', params: {key: list.key}}">
              <Icon icon="pencil_square"
                size="1.5rem"
                classes="fill-gray-500 hover:fill-black"
              ></Icon>
            </router-link>
            <router-link :to="{name: 'watch', params: {key: list.key}}">
              <Icon icon="play_fill"
                size="1.5rem"
                classes="fill-gray-500 hover:fill-black"
              ></Icon>
            </router-link>
            <button type="button"
              @click="removeVideo(list.key)"
            >
              <Icon icon="trash"
                size="1.5rem"
                classes="fill-gray-500 hover:fill-black"
              ></Icon>
            </button>
          </div>
        </div>
        <div class="flex w-4/12 items-center">
          {{list.regDate}}
        </div>
        <div class="flex w-3/12 items-center">
          {{list.count}}
        </div>
      </div>
    </div>
  </div>
</template>

