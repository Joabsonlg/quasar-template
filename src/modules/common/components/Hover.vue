<template>
  <div @mouseout="isActive = false" @mouseover="isActive = true">
    <slot v-bind:hoverIsActive="isActive"></slot>
  </div>
</template>

<script>
import {ref} from 'vue'

export default {
  name: "Hover",
  setup() {
    const isActive = ref(false);
    return {
      isActive
    };
  }
}
</script>

<style scoped>
</style>
