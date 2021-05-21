<template>
  <transition name="fade">
    <svg
      v-if="show"
      class="go-to-top"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 49.484 28.284"
      @click="scrollToTop"
    >
      <g transform="translate(-229 -126.358)">
        <rect
          fill="currentColor"
          width="35"
          height="5"
          rx="2"
          transform="translate(229 151.107) rotate(-45)"
        />
        <rect
          fill="currentColor"
          width="35"
          height="5"
          rx="2"
          transform="translate(274.949 154.642) rotate(-135)"
        />
      </g>
    </svg>
  </transition>
</template>

<script setup>
import lodash from 'lodash'
import { defineProps, ref, computed, onMounted } from 'vue'

const props = defineProps({
  threshold: {
    type: Number,
    default: 100,
  },
})

let scrollTop = ref(null)

const show = computed(() => scrollTop.value > props.threshold)

onMounted(() => {
  scrollTop.value = getScrollTop()
  window.addEventListener(
    'scroll',
    lodash.debounce(() => {
      scrollTop.value = getScrollTop()
    }, 100)
  )
})

const getScrollTop = () => {
  return (
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  )
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  scrollTop.value = 0
}
</script>

<style scoped>
.go-to-top {
  cursor: pointer;
  position: fixed;
  bottom: 2rem;
  right: 2.5rem;
  width: 2rem;
  color: #3eaf7c;
  z-index: 1;
}
.go-to-top:hover {
  color: #3eaf7c;
  opacity: 0.5;
}
@media (max-width: 959px) {
  .go-to-top {
    display: none;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
