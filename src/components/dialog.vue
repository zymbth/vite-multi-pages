<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue'])

const visible = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})

function closeView() {
  visible.value = false
}
</script>

<template>
  <div v-if="visible" @click.self="closeView" class="view-container">
    <div class="view-inner">
      <span class="icon-close" @click="closeView">+</span>
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.view-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
}
.view-inner {
  position: relative;
  padding: 20px;
  margin: 15vh auto 50px;
  width: 500px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-sizing: content-box;
  .icon-close {
    font-size: 30px;
    position: absolute;
    top: 0px;
    right: 10px;
    z-index: 1;
    transform: rotate(45deg);
    cursor: pointer;
    &:hover {
      font-weight: 900;
    }
  }
}
</style>
