<template>
  <div id="gitalk-container"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import Gitalk from 'gitalk'
import 'gitalk/dist/gitalk.css'

// 了解更多 👉 https://github.com/gitalk/gitalk/
// clientID & clientSecret 👉 https://github.com/settings/applications/new

onMounted(() => {
  const commentConfig = {
    enable: true,
    clientID: 'a175a2f1ef9565e7c27b',
    clientSecret: '82607297756e99e917c2048b89a430f4700c8b6c',
    repo: 'vitepress-blog-DIY',
    owner: 'WuLianN',
    admin: ['WuLianN'],
    githubID: 'WuLianN',
    id: decodeURI(window.location.pathname),
    language: 'zh-CN',
    distractionFreeMode: true,
  }
  const gitalk = new Gitalk(commentConfig)
  gitalk.render('gitalk-container')
})
</script>
