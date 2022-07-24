<script setup lang="ts">
const props = defineProps({
  row: {
    type: Number,
    default: 3
  },
  column: {
    type: Number,
    default: 4
  }
})
</script>
<template>
  <div class="flex flex-col w-full gap-10">
    <div class="w-full flex sm:grid justify-center"
      :class="`grid-cols-${column}`"
      v-for="n in row"
    >
      <div class="flex flex-col max-w-[360px] mx-3"
        v-for="n in column"
      >
        <div class="w-[360px] sm:w-full pt-[55%] SkeletonBox"></div>
        <div class="flex mt-3 px-5 items-center">
          <div class="p-5 rounded-full SkeletonBox"></div>
          <div class="w-11/12 ml-5">
            <div class="w-full max-h-12 p-2 SkeletonBox"></div>
            <div class="w-full max-h-12 mt-2 p-2 SkeletonBox"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>