import Layout from './Layout.vue'
import './styles/tailwind.css'
import './styles/nprogress.css'
import './styles/code.css'
import './styles/vars.css'
import './styles/custom-blocks.css'
import 'vitepress/dist/client/theme-default/styles/layout.css'
import 'vitepress/dist/client/theme-default/styles/sidebar-links.css'

export default {
  Layout,
  NotFound: () => 'custom 404', // <- this is a Vue 3 functional component
  enhanceApp({ app, router, siteData }) {
    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData`` is a `ref`` of current site-level metadata.
  },
}
