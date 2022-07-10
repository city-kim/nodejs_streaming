<script setup lang="ts">
import Header from '@/layout/Header.vue'
import Aside from './layout/Aside.vue'

</script>

<template>
<Header class="w-full fixed top-0 left-0 border-b border-gray-300 bg-white z-10"></Header>
<Aside class="w-[240px] h-[calc(100%_-_60px)] fixed top-[60px] left-0 bg-white z-10"></Aside>
<div class="h-full mt-[60px] ml-[240px]">
  <router-view class="h-full"/>
</div>
</template>

