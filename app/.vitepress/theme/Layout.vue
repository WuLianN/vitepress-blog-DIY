<template>
  <!-- 不要移除此处的class="theme"，这个控制sidebar-mask的display -->
  <div class="theme" :class="pageClasses">
    <div class="theme-bar">
      <NavBar v-if="showNavbar" @toggle="toggleSidebar" />
    </div>

    <template v-if="openSideBar">
      <div class="theme-bar">
        <SideBar :open="openSideBar" />
      </div>
    </template>

    <!-- TODO: make this button accessible -->
    <div class="sidebar-mask" @click="toggleSidebar(false)" />

    <div class="content">
      <ClientOnly>
        <!-- <keep-alive exclude="Docs"> -->
        <component :is="layout"></component>
        <!-- </keep-alive> -->
      </ClientOnly>
    </div>

    <BackToTop />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useSiteData, useSiteDataByRoute } from 'vitepress'
import NProgress from 'nprogress'

// components
import NavBar from './components/NavBar.vue'
import SideBar from './components/SideBar.vue'
import {
  isSideBarEmpty,
  getSideBarConfig,
} from 'vitepress/dist/client/theme-default/support/sideBar'
import Home from './views/Home.vue'
import Tech from './views/Tech.vue'
import Beauty from './views/Beauty.vue'
import Docs from './views/Docs.vue'
import Tag from './views/Tag.vue'
import NotFound from './views/NotFound.vue'
import BackToTop from './components/BackToTop.vue'

const routerConfig = {
  '/': () => Home,
  '/tech': () => Tech,
  '/beauty': () => Beauty,
  '/docs': () => Docs,
  '/tag': () => Tag,
}

const layout = computed(() => {
  const path = route.path
  const regExp = '\^/[a-zA-Z0-9]*'
  const routePath = path.match(regExp)[0]
  const whiteList = ['/README']

  if (routerConfig[routePath]) {
    return routerConfig[routePath]()
  }

  if (whiteList.includes(routePath)) {
    return routerConfig['/docs']()
  }

  return NotFound
})

// generic state
const route = useRoute()
const siteData = useSiteData()
const siteRouteData = useSiteDataByRoute()
const theme = computed(() => siteData.value.themeConfig)

// navbar
const showNavbar = computed(() => {
  const { themeConfig } = siteRouteData.value
  const { frontmatter } = route.data
  if (frontmatter.navbar === false || themeConfig.navbar === false) {
    return false
  }
  return (
    siteData.value.title ||
    themeConfig.logo ||
    themeConfig.repo ||
    themeConfig.nav
  )
})

// sidebar
const openSideBar = ref(false)

const showSidebar = computed(() => {
  const { frontmatter } = route.data

  if (frontmatter.home || frontmatter.sidebar === false) {
    return false
  }

  const { themeConfig } = siteRouteData.value

  return !isSideBarEmpty(
    getSideBarConfig(themeConfig.sidebar, route.data.relativePath)
  )
})

const toggleSidebar = (to) => {
  openSideBar.value = typeof to === 'boolean' ? to : !openSideBar.value
}

const routerChange = () => {
  // 关闭 siderbar
  toggleSidebar(false)

  NProgress.configure({ showSpinner: false })
  NProgress.start()
  NProgress.done()
}

// close the sidebar when navigating to a different location
watch(route, routerChange)
// TODO: route only changes when the pathname changes
// listening to hashchange does nothing because it's prevented in router

// page classes
const pageClasses = computed(() => {
  return [
    {
      'no-navbar': !showNavbar.value,
      'sidebar-open': openSideBar.value,
      'no-sidebar': !showSidebar.value,
    },
  ]
})
</script>

<style scoped>
/** 解决 gitalk 的组件的覆盖 */
.theme-bar {
  position: relative;
  z-index: 100;
}

.content {
  position: relative;
  top: var(--header-height);
  left: 0;
  /* background: #f4f5f5; */
  padding: 1rem 0 var(--header-height) 0;
}
</style>
