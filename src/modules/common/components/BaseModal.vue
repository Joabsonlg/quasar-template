<template>
  <q-dialog :model-value="modalActive" :persistent="persistent" v-bind="$attrs" :full-width="fullWidth">
    <q-card :dark="dark" class="full-width">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ title }}</div>
        <q-space/>
        <q-btn v-close-popup dense flat icon="close" round/>
      </q-card-section>
      <q-card-section>
        <slot/>
      </q-card-section>
      <q-card-actions align="right" v-if="actionsConfig?.showCloseAndSave">
        <q-btn v-close-popup :color="actionsConfig.close.color" :label="actionsConfig.close.label" flat/>
        <q-btn :color="actionsConfig.save.color" :label="actionsConfig.save.label" :loading="loading" flat
               type="submit"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "BaseModal",
  props: {
    title: {
      type: String,
      default: 'Base Modal'
    },
    dark: {
      type: Boolean,
      default: false
    },
    modalActive: {
      type: Boolean,
      default: false
    },
    persistent: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    actionsConfig: {
      type: Object,
    },
    fullWidth: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    return {}
  }
}
</script>

<style scoped>

</style>
