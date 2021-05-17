<template>
  <div class="tech">
    <Tags :tags="tags" />
  </div>
</template>

<script setup>
import { useRouter, useSiteData } from 'vitepress'
import { toRaw, onMounted } from 'vue'
import Tags from '../components/Tags.vue'

const siteData = useSiteData()

const pages = toRaw(siteData.value).themeConfig.pages

const getTags = () => {
  let tags = {}

  pages.forEach((item) => {
    const { tag } = item.frontMatter
    if (tag && tag.length > 0) {
      tag.forEach((i) => {
        if (tags[i]) {
          tags[i].push(item)
        } else {
          tags[i] = [item]
        }
      })
    }
  })

  return tags
}

const tags = getTags()

window.localStorage.setItem('tags', JSON.stringify(tags))
</script>

<style scoped>
.tech {
  width: 100%;
  height: calc(100vh - var(--header-height));
  overflow: auto;
  padding: 0 30px 0 30px;
}
</style>
