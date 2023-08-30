<script setup>
const props = defineProps({
  data: { type: Object, default: {} },
})
</script>
<template>
  <h1>{{ data.name }}</h1>
  <hr />
  <div class="person-info">
    <p><b>年龄:</b> {{ data.age }}</p>
    <p><b>性别:</b> {{ data.gender }}</p>
    <p><b>国家:</b> {{ data.country }}</p>
    <p><b>简介:</b> {{ data.intro }}</p>
  </div>
</template>
<style lang="scss" scoped>
.person-info {
  max-height: 300px;
  overflow: auto;
}
</style>
