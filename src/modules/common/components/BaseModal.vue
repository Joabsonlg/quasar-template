<template>
  <q-dialog :persistent="persistent" v-bind="$attrs" :full-width="fullWidth">
    <q-card :dark="dark" class="full-width">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ title }}</div>
        <q-space />
        <q-btn v-close-popup dense flat icon="close" round />
      </q-card-section>
      <q-card-section>
        <slot />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "Base Modal",
  },
  dark: {
    type: Boolean,
    default: false,
  },
  persistent: {
    type: Boolean,
    default: true,
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
});
</script>
