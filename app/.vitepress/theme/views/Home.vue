<template>
  <div class="home">
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
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useSiteData } from 'vitepress'
import lodash from 'lodash'
import Card from '../components/Card.vue'

const siteData = useSiteData()

const pages = ref([])

const pageList = siteData.value.themeConfig.pages

const queryList = {
  page: 0,
  limit: 5,
}

pages.value.push(...pageList.slice(queryList.page, queryList.limit))

const router = useRouter()

const goTag = (tag) => {
  router.go(`/tag#${tag}`)
}

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

.lastest-title {
  margin: 20px 0;
}

.lasteset-box {
  padding: 20px;
  background: white;
  margin: 0 0 20px 0;
}
</style>
