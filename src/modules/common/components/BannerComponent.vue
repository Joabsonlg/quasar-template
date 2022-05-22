<template>
  <div :style="'background-image: url('+banner+')'" class="banner rounded-borders">
    <slot/>
  </div>
</template>

<script setup>
const props = defineProps({
  banner: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.banner {
  width: 100%;
  height: 250px;
  background-size: cover;
  background-position: center;
}
</style>
