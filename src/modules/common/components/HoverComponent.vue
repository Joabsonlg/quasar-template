<template>
  <div @mouseout="isActive = false" @mouseover="isActive = true">
    <slot v-bind:hoverIsActive="isActive"></slot>
  </div>
</template>

<script setup>
import {ref} from "vue";

const isActive = ref(false)
</script>
