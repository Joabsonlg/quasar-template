<template>
  <q-card :dark="dark" class="q-mx-xl" style="width: 100%" v-bind="$attrs">
    <q-card-section class="row items-center q-pb-none">
      <div :class="`text-h6 ${dark ? 'text-white' : 'text-dark'}`">
        {{ title }}
      </div>
    </q-card-section>
    <q-card-section>
      <slot />
    </q-card-section>
    <q-card-actions v-if="actionsConfig?.showCloseAndSave" align="right">
      <q-btn
        v-close-popup
        :color="actionsConfig.close.color"
        :label="actionsConfig.close.label"
        flat
      />
      <q-btn
        :color="actionsConfig.save.color"
        :label="actionsConfig.save.label"
        :loading="loading"
        flat
        type="submit"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "BaseModal",
  props: {
    title: {
      type: String,
      default: "Base Modal",
    },
    dark: {
      type: String,
      default: "dark",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    actionsConfig: {
      type: Object,
    },
  },
};
</script>
