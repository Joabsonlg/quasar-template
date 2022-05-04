<template>
  <router-view/>
</template>

<script>
import {defineComponent, computed, watch} from 'vue';
import {loader} from "src/support/helpers/loader";
import {useCommonStore} from "stores/all";

export default defineComponent({
  name: 'App',
  setup() {
    const store = useCommonStore()
    const isLoading = computed(() => store.isLoading)

    watch(() => isLoading.value, (newVal) => {
      if (newVal) loader.show()
      else loader.hide()
    })
  }
})
</script>
