<template>
  <button aria-label="Toggle Theme" class="icon-button" @click="toggle">
    <Moon v-show="isDark" />
    <Sun v-show="!isDark" />
  </button>
</template>

<script setup>
import { useToggle } from '@vueuse/core'
import { isDark } from '../composables/dark'
import Moon from './icons/Moon.vue'
import Sun from './icons/Sun.vue'

const toggle = useToggle(isDark)
</script>
