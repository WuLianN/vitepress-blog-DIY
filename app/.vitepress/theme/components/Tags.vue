<template>
  <div
    class="
      flex flex-col flex-wrap
      justify-around
      items-center
      md:flex-row
      md:justify-around
    "
  >
    <div
      class="
        tags-card
        relative
        w-11/12
        h-32
        mb-4
        rounded-3xl
        bg-gradient-to-br
        md:w-52
        md:h-40
        md:mb-12
        lg:w-72
        lg:h-44
        xl:w-96
        xl:h-48
      "
      v-for="(value, name) in tags"
      :key="name"
      @click="goTag(value, name)"
      :ref="setTagsRef"
    >
      <div
        class="
          tags-card-img
          w-full
          h-32
          flex
          justify-center
          items-center
          bg-cover
          text-white text-3xl
          md:w-52
          md:h-40
          lg:w-72
          lg:h-44
          xl:w-96
          xl:h-48
        "
        :ref="setImgRef"
      >
        {{ name }}
      </div>
    </div>

    <template v-if="tagsLength % 3 !== 0">
      <div
        v-for="i in replenish"
        :key="i"
        class="
          relative
          w-11/12
          h-32
          rounded-3xl
          bg-gradient-to-br
          md:w-52
          md:h-40
          lg:w-72
          lg:h-44
          xl:w-96
          xl:h-48
        "
      ></div>
    </template>
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue'
import { useRouter } from 'vitepress'
import lodash from 'lodash'
import circuitBboard from '../assets/svg/circuit-board.svg'
import dominos from '../assets/svg/dominos.svg'
import hideout from '../assets/svg/hideout.svg'
import iLikeFood from '../assets/svg/i-like-food.svg'
import jigsaw from '../assets/svg/jigsaw.svg'
import signal from '../assets/svg/signal.svg'
import skulls from '../assets/svg/skulls.svg'
import ticTacToe from '../assets/svg/tic-tac-toe.svg'
import topography from '../assets/svg/topography.svg'
import yyy from '../assets/svg/yyy.svg'

const props = defineProps({
  tags: {
    type: Object,
  },
})

const tagsLength = Object.keys(props.tags).length

const replenish = ref(0)

const getReplenishCount = () => {
  const padding = 60
  const window_Width = window.innerWidth - padding
  const card_width = document
    .querySelector('.tags-card')
    .getBoundingClientRect().width

  const n = Math.floor(window_Width / card_width)

  return n - (tagsLength % n)
}

onMounted(() => {
  replenish.value = getReplenishCount()
})

// 背景图片
const assetss = lodash.shuffle([
  circuitBboard,
  dominos,
  hideout,
  iLikeFood,
  jigsaw,
  signal,
  skulls,
  ticTacToe,
  topography,
  yyy,
])

let assetssIndex = 0
const setImgRef = (el) => {
  if (el) {
    // el.style.background = `url(/.vitepress/public/svg/${assetss[assetssIndex]})`
    el.style.background = `url(${assetss[assetssIndex]})`
    assetssIndex++

    if (assetssIndex >= assetss.length) {
      assetssIndex = 0
    }
  }
}

// 渐进色组合
const colors = [
  { from: 'from-purple-400', to: 'to-blue-500' },
  { from: 'from-purple-500', to: 'to-red-500' },
  { from: 'from-purple-500', to: 'to-black' },
  { from: 'from-cyan-600', to: 'to-teal-500' },
  { from: 'from-cyan-400', to: 'to-black' },
  { from: 'from-teal-400', to: 'to-blue-500' },
  { from: 'from-teal-400', to: 'to-black' },
  { from: 'from-pink-500', to: 'to-blue-500' },
  { from: 'from-pink-500', to: 'to-black' },
]

const setTagsRef = (el) => {
  if (el) {
    const random = Math.floor(Math.random() * colors.length)

    el.classList.add(colors[random].from)
    el.classList.add(colors[random].to)
  }
}

const router = useRouter()

const goTag = (value, name) => {
  router.go(`/tag#${name}`)
}
</script>

<style scoped>
.tags-card {
  cursor: pointer;
}

.tags-card-img {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 1.5rem;
  background-color: transparent;
}
</style>
