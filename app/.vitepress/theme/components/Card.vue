<template>
  <div class="card" @click="goDetail(data.regularPath)">
    <div class="header">{{ data.frontMatter.title }}</div>
    <div class="main">
      <div class="main-box text-sm h-20 lg:text-base lg:h-24">
        {{ data.excerpt }}
      </div>
      <img
        class="main-box-img w-20 h-20 lg:w-24 lg:h-24"
        v-if="data.frontMatter.image"
        :src="data.frontMatter.image"
        alt=""
      />
    </div>

    <slot name="tag"> </slot>
    <slot name="date"> </slot>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vitepress'

const router = useRouter()

const props = defineProps({
  data: Object,
})

const goDetail = (path) => {
  path && router.go(path)
}
</script>

<style scoped>
.card {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  border-bottom: 1px solid rgb(229, 229, 229);
  cursor: pointer;
}

.header {
  margin: 0 0 10px 0;
  font-weight: bold;
  font-size: 18px;
}

.main {
  display: flex;
  flex-flow: row nowrap;
  margin: 0 0 10px 0;
}

.main-box {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

.main-box-img {
  margin: 0 0 0 20px;
}

.footer {
  padding: 0 0 10px 0;
}
</style>
