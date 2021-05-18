const getPages = require('./theme/utils/pages')

const getConfig = async () => {
  const config = {
    title: '夜深_静悟',
    description: '夜深_静悟的博客',
    head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
    base: '/',
    themeConfig: {
      repo: 'WuLianN/vitepress-blog-DIY',
      nav: [
        { text: '首页', link: '/' },
        { text: '编程', link: '/tech' },
        { text: '美女', link: '/beauty' },
      ],
      pages: await getPages(),
    },
  }

  return config
}

module.exports = getConfig()
