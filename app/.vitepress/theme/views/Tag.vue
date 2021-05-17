<template>
  <div class="tag">
    <div
      class="tag-content w-full md:w-160 lg:w-200"
      v-for="(item, index) in tagData"
      :key="index"
    >
      <Card :data="item">
        <template #date>
          <div class="relative text-sm lg:text-base">
            {{ item.frontMatter.date }}
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import lodash from 'lodash'
import Card from '../components/Card.vue'

const { hash } = window.location

const tagName = hash.split('#').pop()

const tags = JSON.parse(window.localStorage.getItem('tags'))

const tagData = ref([])

const slice5 = tags && tags[decodeURI(tagName)].slice(0, 5)

tagData.value.push(...slice5)

const queryList = {
  page: 1,
  limit: 5,
}

const handleScroll = () => {
  const scrollTop = Math.floor(document.documentElement.scrollTop)
  const scrollHeight = Math.floor(document.documentElement.scrollHeight)
  const clientHeight = Math.floor(document.documentElement.clientHeight)

  if (scrollHeight - scrollTop <= clientHeight + 10) {
    let { page, limit } = queryList

    page++

    if (tagData.value.length < tags[decodeURI(tagName)].length) {
      const sliceData = tags[decodeURI(tagName)].slice(
        (page - 1) * limit,
        page * limit
      )

      tagData.value.push(...sliceData)
    }
  }
}

let debounce = lodash.debounce(handleScroll, 100, {
  leading: false,
  trailing: true,
})

onMounted(() => {
  window.addEventListener('scroll', debounce)
})

onUnmounted(() => {
  window.removeEventListener('scroll', debounce)
})
</script>

<style scoped>
.tag {
  width: 100%;
  height: calc(100vh - var(--header-height));
}

.tag-content {
  padding: 20px 20px 0 20px;
  margin: 0 auto 20px auto;
  background: white;
}
</style>
