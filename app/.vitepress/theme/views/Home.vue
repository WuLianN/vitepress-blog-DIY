<template>
  <div class="home">
    <LatestArticle :pages="pages" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useSiteData } from 'vitepress'
import lodash from 'lodash'
import LatestArticle from '../components/LatestArticle.vue'

const siteData = useSiteData()

const pages = ref([])

const pageList = siteData.value.themeConfig.pages

const queryList = {
  page: 0,
  limit: 5,
}

pages.value.push(...pageList.slice(queryList.page, queryList.limit))

const handleScroll = () => {
  const scrollTop = Math.floor(document.documentElement.scrollTop)
  const scrollHeight = Math.floor(document.documentElement.scrollHeight)
  const clientHeight = Math.floor(document.documentElement.clientHeight)

  if (scrollHeight - scrollTop <= clientHeight + 10) {
    let { page, limit } = queryList

    page++

    if (pages.value.length < pageList.length) {
      const sliceData = pageList.slice(page * limit, (page + 1) * limit)

      pages.value.push(...sliceData)
    } else {
      console.log('not more !')
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
.home {
  width: 100%;
}
</style>
