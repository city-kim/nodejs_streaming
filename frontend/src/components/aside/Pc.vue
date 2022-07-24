<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { urls } from '@/helper/aside'
import Icon from '@/components/util/Icon.vue'
import type { asideUiType } from '@/store/modules/Ui'

const store = useStore()

const pcShort = computed<asideUiType>(() => store.getters['Ui/asideUi'].pcShort) // pc 사이드바 작게하기

</script>

<template>
<div>
  <div class="flex flex-col h-[calc(100%_-_60px)] pt-4 fixed top-[60px] left-0 bg-white z-10"
    :class="[pcShort ? 'w-[80px]' : 'w-[240px] gap-4 px-4']"
  >
    <nav>
      <router-link
        v-for="list in urls.publicLink"
        v-slot="{ href, isActive }"
        :to="list.link"
      >
        <li class="flex w-full py-2 hover:bg-gray-200 items-center"
          :class="[{'bg-gray-200': isActive && !pcShort}, pcShort ? 'flex-col text-sm': 'px-2']"
        >
          <icon :icon="list.icon"
            :classes="pcShort ? '' : 'mr-4'"
          />
          {{list.name}}
        </li>
      </router-link>
    </nav>
    <nav class="flex flex-col gap-2"
      :class="{'pt-4 border-t border-gray-300': !pcShort}"
    >
      <router-link
        v-for="list in urls.privateLink"
        v-slot="{ href, isActive }"
        :to="list.link"
      >
        <li class="flex w-full py-2 hover:bg-gray-200 items-center"
          :class="[{'bg-gray-200': isActive && !pcShort}, pcShort ? 'flex-col text-sm': 'px-2']"
        >
          <icon :icon="list.icon"
            :classes="pcShort ? '' : 'mr-4'"
          />
          {{list.name}}
        </li>
      </router-link>
    </nav>
    <a class="mt-auto py-2 text-sm text-gray-200"
      href="https://github.com/nkdevil"
      target="_blank"
    >Copyright 2022. Kim Chan Tae</a>
  </div>
</div>
</template>