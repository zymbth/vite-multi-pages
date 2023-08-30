<script setup>
import { ref } from 'vue'

const visible = ref(true)
const triggleCard = (show = !visible.value) => (visible.value = show)

defineExpose({ triggleCard })
</script>
<template>
  <div class="card" v-if="visible">
    <div class="close" @click="triggleCard(false)">x</div>
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
.card {
  display: inline-block;
  width: 300px;
  max-height: 600px;
  overflow-y: auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 12px;
  margin: 10px;
  position: relative;
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 20px;
    color: #000;
    font-weight: bold;
    &:hover {
      filter: opacity(0.7);
    }
  }
}
</style>
