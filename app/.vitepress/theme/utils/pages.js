const fs = require('fs')
const globby = require('globby')
const matter = require('gray-matter')
const removeMd = require('remove-markdown')

const rTime = (date) => {
  const json_date = new Date(date).toJSON()
  return json_date.split('T')[0]
}

const compareDate = (obj1, obj2) => {
  return obj1.frontMatter.date < obj2.frontMatter.date ? 1 : -1
}

const getPages = async () => {
  const paths = await globby(['**.md'], {
    ignore: ['node_modules'],
  })

  let pages = await Promise.all(
    paths.map(async (item) => {
      const mdContent = await fs.promises.readFile(item, 'utf-8')

      const { data, content } = matter(mdContent)

      data.date = data.date && rTime(data.date)

      const summaryLength = 350

      const sanitizedContent = content.trim().replace(/^#+\s+(.*)/, '')

      const excerpt =
        removeMd(sanitizedContent.slice(0, summaryLength)) + ' ...'

      return {
        frontMatter: data,
        regularPath: `${item.replace('app', '').replace('.md', '.html')}`,
        relativePath: item,
        excerpt: excerpt,
      }
    })
  )

  pages = pages.filter((item) => JSON.stringify(item.frontMatter) !== '{}')

  pages.sort(compareDate)

  return pages
}

module.exports = getPages
