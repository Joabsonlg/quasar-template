<template>
  <q-input dense outlined class="full-width" :label="label" :model-value="modelValue" v-bind="$attrs" lazy-rules :rules="getRules(type)"/>
</template>

<script>
import {defineComponent} from "vue";

const rules = {
    'text': () => [ val => val || 'Informe algum valor!'],
    'email': () => [ val => val || 'Informe um e-mail válido!'],
    'number': () => [ val => val || 'Informe um número válido!'],
    'password': () => [ val => val || 'Informe uma senha!'],
    'tel': () => [ val => val || 'Informe um telefone válido!'],
    'url': () => [ val => val || 'Informe uma URL válida!'],
    'search': () => [ val => val || 'Informe uma URL válida!']
  }

export default defineComponent({
  name: "BaseInput",
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  setup() {
    const getRules = (type) => rules[type] ? rules[type]() : []
    return {
      getRules
    }
  }
})
</script>

<style scoped>

</style>
