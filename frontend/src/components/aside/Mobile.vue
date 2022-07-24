<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { urls } from '@/helper/aside'
import Icon from '@/components/util/Icon.vue'
import type { asideUiType } from '@/store/modules/Ui'

const store = useStore()

const mobileOpen = computed<asideUiType>(() => store.getters['Ui/asideUi'].mobileOpen) // 모바일 사이드바 열기

function updateAside () {
  // 사이드바의 상태를 업데이트해준다
  store.commit('Ui/UPDATE_ASIDE')
}

</script>

<template>
<div>
  <div v-show="mobileOpen">
    <div class="w-full h-full fixed left-0 top-0 bg-black/50 z-10">
      <div class="flex flex-col w-[240px] h-full bg-white">
        <div class="flex px-4 py-2">
          <button type="button"
          >
            <Icon icon="list"
              size="2rem"
              @click="updateAside"
            ></Icon>
          </button>
          <img class="ml-4 px-4 py-3 cursor-pointer" src="https://via.placeholder.com/97x20"/>
        </div>
        <div class="flex flex-col gap-4 pt-4 px-4">
          <nav>
            <router-link
              v-for="list in urls.publicLink"
              v-slot="{ href, isActive }"
              :to="list.link"
            >
              <li class="flex w-full p-2 mr-4 hover:bg-gray-200 items-center">
                <icon :icon="list.icon"
                  classes="mr-4"
                />
                {{list.name}}
              </li>
            </router-link>
          </nav>
          <nav class="flex flex-col gap-2 pt-4 border-t border-gray-300">
            <router-link
              v-for="list in urls.privateLink"
              v-slot="{ href, isActive }"
              :to="list.link"
            >
              <li class="flex w-full p-2 hover:bg-gray-200 items-center">
                <icon :icon="list.icon"
                  classes="mr-4"
                />
                {{list.name}}
              </li>
            </router-link>
          </nav>
        </div>
        <a class="mt-auto py-2 text-sm text-gray-200"
          href="https://github.com/nkdevil"
          target="_blank"
        >Copyright 2022. Kim Chan Tae</a>
      </div>
    </div>
  </div>
</div>
</template>