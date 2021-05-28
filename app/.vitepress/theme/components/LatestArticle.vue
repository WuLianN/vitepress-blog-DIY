<template>
  <div class="flex flex-col items-center justify-around">
    <div
      class="lastest-title text-left text-green-500 text-lg w-11/12 md:w-160"
    >
      最新文章
    </div>
    <div
      class="
        lasteset-box
        flex flex-col
        justify-between
        border-2
        shadow-xl
        rounded-2xl
        w-11/12
        h-52
        md:w-160
        md:h-60
      "
      v-for="(item, index) in pages"
      :key="index"
    >
      <Card :data="item">
        <template #tag>
          <div class="absolute bottom-2 left-0">
            <button
              class="
                mr-6
                p-0.5
                text-white text-sm
                rounded-sm
                bg-green-500
                active:bg-green-700
                ring-4 ring-green-500 ring-opacity-50
              "
              v-for="item in item.frontMatter.tag"
              :key="item"
              @click.stop="goTag(item)"
            >
              {{ item }}
            </button>
          </div>
        </template>

        <template #date>
          <div class="absolute bottom-0 right-0 text-sm lg:text-base">
            {{ item.frontMatter.date }}
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import Card from './Card.vue'
import { defineProps } from 'vue'
import { useRouter } from 'vitepress'

const props = defineProps({
  pages: Array,
})

const router = useRouter()

const goTag = (tag) => {
  router.go(`/tag#${tag}`)
}
</script>

<style scoped>
.lastest-title {
  margin: 20px 0;
}

.lasteset-box {
  padding: 20px;
  margin: 0 0 20px 0;
}
</style>
