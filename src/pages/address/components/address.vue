<script setup>
const props = defineProps({
  data: { type: Object, default: {} },
})
</script>
<template>
  <h1>{{ data.name }}</h1>
  <hr />
  <p>省: {{ data.province }}</p>
  <p>市: {{ data.city }}</p>
  <p>区: {{ data.area }}</p>
  <p>地址: {{ data.address }}</p>
</template>
