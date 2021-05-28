<template>
  <div class="docs">
    <Toc v-if="headers" :headers="headers" />
    <div class="content w-screen lg:max-w-screen-md">
      <FrontMatter :frontmatter="frontmatter" />
      <Content />
      <Comment />
    </div>
  </div>
</template>

<script setup>
import Toc from '../components/Toc.vue'
import FrontMatter from '../components/FrontMatter.vue'
import Comment from '../components/Comment.vue'

import { usePageData } from 'vitepress'

const pageData = usePageData()
const { headers, frontmatter } = pageData.value
</script>

<style scoped>
.docs {
  width: 100%;
}

.content {
  margin: 0 auto;
  padding: 30px 30px;
}
</style>
