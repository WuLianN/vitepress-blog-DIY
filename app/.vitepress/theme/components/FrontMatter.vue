<template>
  <div class="front-matter w-11/12 lg:max-w-screen-md">
    <img class="img" :src="frontmatter.image" alt />
    <div class="p">{{ frontmatter.title }}</div>
    <div class="p">{{ date }}</div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  frontmatter: {
    type: Object,
  },
})

const date = computed(() => {
  const json_date = new Date(props.frontmatter.date).toJSON()
  return json_date.split('T')[0]
})
</script>

<style scoped>
.front-matter {
  position: relative;
  margin: 0 auto 30px auto;
  padding: 30px 30px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  border-radius: 5%;
  box-shadow: 0 0 4px 3px rgba(0, 0, 0, 0.05);
}

.img {
  position: relative;
  width: 100%;
  height: auto;
}

.p {
  height: 50px;
  text-align: center;
  line-height: 50px;
  position: relative;
  top: 30px;
}
</style>
