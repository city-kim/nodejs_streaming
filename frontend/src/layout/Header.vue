<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import Icon from '@/components/util/Icon.vue'
import router from '@/router'
import toast from '@/helper/toast'

const store = useStore()
const searchBar = ref<HTMLDivElement | null>(null) // 검색바
const keyword = ref('') // 검색값
const inputFocus = ref(false) // 인풋 포커스 여부
const searchList = computed(() => store.getters['Home/searchList']) // 검색된 리스트들
const searchListStyle = ref('') // 검색리스트 스타일 지정
const windowSize = computed(() => store.getters['Ui/windowSize'])
const breakPoint = computed(() => store.getters['Ui/breakPoint']) // window size

watch(windowSize, () => {
  // window resize시 searchListStyle을 업데이트함
  if (searchBar.value) {
    searchListStyle.value = `width: ${searchBar.value.clientWidth}px; top: ${searchBar.value.offsetHeight}px; left: ${searchBar.value.offsetLeft}px;`
  }
})

function focusOn () {
  // 포커스가 on 된다면
  inputFocus.value = true
  if (searchBar.value) {
    searchListStyle.value = `width: ${searchBar.value.clientWidth}px; top: ${searchBar.value.offsetHeight}px; left: ${searchBar.value.offsetLeft}px;`
  }
}

function focusOut () {
  // 포커스 아웃 0.1초 지연
  setTimeout(() => {
    inputFocus.value = false
  }, 150);
}

function updateAside () {
  // 사이드바의 상태를 업데이트해준다
  store.commit('Ui/UPDATE_ASIDE')
}

function getSearchList () {
  // 검색리스트 자동완성
  store.dispatch('Home/getSearchList', keyword.value)
}

function search (text?: string) {
  // 검색하기
  inputFocus.value = false
  if (text) {
    // 값이 있다면 업데이트하고 검색
    keyword.value = text
  }
  store.dispatch('Home/getSearchList', keyword.value)
  .then((res) => {
    router.push({name: 'search'})
  })
  .catch((err) => {
    toast.wakeup({
      title: '실패',
      contents: '검색에 실패하였습니다.'
    })
  })
}
</script>

<template>
<div>
  <div class="flex px-4 py-2 gap-8 items-center justify-between">
    <div class="flex md:min-w-[240px]">
      <button type="button"
        @click="updateAside"
      >
        <Icon icon="list"
          size="2rem"
        ></Icon>
      </button>
      <img class="ml-4 px-4 py-3 cursor-pointer" src="https://via.placeholder.com/97x20"/>
    </div>
    <div class="flex-auto max-w-screen-md relative"
      ref="searchBar"
    >
      <div :class="{'border border-gray-600 rounded': inputFocus}">
        <div class="flex overflow-hidden"
          :class="{'border border-gray-600 rounded ml-12': !inputFocus}"
        >
          <div class="px-4 items-center justify-center"
            :class="[inputFocus ? 'flex' : 'hidden']"
          >
            <Icon icon="search"
              size="1rem"
            ></Icon>
          </div>
          <input class="flex-auto px-2 py-2 outline-0"
            v-model="keyword"
            type="text"
            placeholder="검색"
            @focus="focusOn"
            @focusout="focusOut"
            @input="getSearchList()"
          />
          <button class="px-4 border-l border-gray-600"
            type="button">
            <Icon icon="search"
              size="1rem"
            ></Icon>
          </button>
        </div>
      </div>
    </div>
    <div class="flex gap-6 items-center">
      <!-- <icon icon="bell"
        size="1.5rem"
      ></icon>
      <router-link to="#">
        <img class="w-10 rounded-full"
          src="~@/assets/person.jpg"
        />
      </router-link> -->
    </div>
  </div>
  
  <div class="py-4 fixed z-20 border-t border-gray-300 rounded bg-white drop-shadow-md"
    :style="searchListStyle"
    v-show="inputFocus && searchList.length > 0"
  >
    <div class="flex py-2 hover:bg-gray-200"
      v-for="list in searchList"
      @click.stop="search(list.title)"
    >
      <div class="flex px-4 items-center justify-center">
        <Icon icon="search"
          size="1rem"
        ></Icon>
        <span class="pl-6">{{list.title}}</span>
      </div>
    </div>
  </div>
</div>
</template>