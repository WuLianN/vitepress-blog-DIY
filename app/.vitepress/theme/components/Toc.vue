<template>
  <div class="toc fixed invisible xl:visible left-12 2xl:left-24">
    <div>
      <div class="first-li" v-for="(item, index) in catelog" :key="index">
        <a
          :href="`#${item.slug}`"
          :title="item.title"
          @click="selectedLevel2(index)"
          :ref="setLevel2Ref"
        >
          {{ item.slug }}</a
        >
        <div>
          <div class="second-li" v-for="i in item.children" :key="i.slug">
            <a
              :href="`#${i.slug}`"
              :title="i.title"
              @click="selectedLevel3(i.slug)"
              :ref="setLevel3Ref"
              >{{ i.slug }}</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, onUnmounted } from 'vue'
import lodash from 'lodash'

const props = defineProps({
  headers: {
    type: Array,
  },
})

const { headers } = props

const headlines = []
let catelog = ref([])

// 获取目录的数据结构
const getCatelog = () => {
  if (headers && headers.length > 0) {
    headers.forEach((item) => {
      if (item.level === 2) {
        catelog.value.push({
          slug: item.slug,
          title: item.title,
          children: [],
        })
      } else if (item.level === 3) {
        catelog.value.length > 0 &&
          catelog.value[catelog.value.length - 1].children.push(item)
      }

      headlines.push(document.querySelector(`#${item.slug}`))
    })
  }
}

let debounce

onMounted(() => {
  getCatelog()

  debounce = lodash.debounce(handleScroll, 100, {
    leading: false,
    trailing: true,
  })

  window.addEventListener('scroll', debounce)
})

onUnmounted(() => {
  window.removeEventListener('scroll', debounce)
})

const level2Refs = []
const level3Refs = []

const setLevel2Ref = (el) => {
  if (el) {
    level2Refs.push(el)
  }
}

const setLevel3Ref = (el) => {
  if (el) {
    level3Refs.push(el)
  }
}

const selectedLevel2 = (index) => {
  removeAllActive(level2Refs, level3Refs)
  level2Refs[index].classList.add('active')

  // 点击目录，延迟0.5s后，滑动滚动条才允许更改active
  clickEffect(500)
}

const selectedLevel3 = (slug) => {
  const currentArr = level3Refs.filter((item) => item.innerText === slug)
  removeAllActive(level2Refs, level3Refs)

  currentArr[0].classList.add('active')

  clickEffect(500)
}

const removeAllActive = (level2, level3) => {
  level2.forEach((item) => {
    item.classList.remove('active')
  })

  level3.forEach((item) => {
    item.classList.remove('active')
  })
}

let hasClickCatelog = false

const handleScroll = () => {
  !hasClickCatelog && scroll2ChangeActive()
}

const clickEffect = (time) => {
  hasClickCatelog = true
  setTimeout(() => {
    hasClickCatelog = false
  }, time)
}

const scroll2ChangeActive = () => {
  const currentHeadline = headlines.find(
    (item) => Math.floor(item.getBoundingClientRect().top) > 130
  )

  // console.log(currentHeadline)

  const aCollection = document.getElementsByTagName('a')

  removeAllActive(level2Refs, level3Refs)

  if (currentHeadline) {
    const currentHeadlineIndex = headlines.findIndex(
      (item) => item.id === currentHeadline.id
    )

    if (currentHeadlineIndex && currentHeadlineIndex !== 0) {
      let lastCurrentHeadlineIndex = currentHeadlineIndex - 1

      const lastLevelTitle = headers[lastCurrentHeadlineIndex].title

      const currentLevel = [...aCollection].find(
        (item) => item.title === lastLevelTitle
      )

      currentLevel && currentLevel.classList.add('active')
    }
  } else {
    const currentLevel = [...aCollection].find(
      (item) => item.title === headers[headers.length - 1].title
    )

    currentLevel && currentLevel.classList.add('active')
  }
}
</script>

<style scoped>
.toc {
  width: 200px;
  top: 200px;
  border-radius: 5%;
  box-shadow: 0 0 4px 3px rgba(0, 0, 0, 0.05);
  background: white;
}

.first-li {
  padding: 3px 10px;
  font-weight: bold;
  font-size: 18px;
}

.second-li {
  text-indent: 20px;
  padding: 2px 0;
  font-weight: normal;
  font-size: 16px;
}

a {
  display: block;
  width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-decoration: none !important;
  color: black !important;
}

a:hover {
  background: rgba(243, 244, 246);
}

.active {
  color: rgb(16, 185, 129) !important;
  background: rgba(243, 244, 246);
}
</style>
