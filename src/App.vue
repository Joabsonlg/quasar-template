<template>
  <router-view />
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, watch } from "vue";
import { useI18n } from "vue-i18n";
import { getFromLocalStorage } from "src/support/helpers/storage";
import { useCommonStore } from "stores/all";
import { input } from "src/support/utils/visual";
import { loader } from "src/support/helpers/loader";

export default defineComponent({
  name: "App",
  setup() {
    const { locale } = useI18n({ useScope: "global" });
    const localLanguage = getFromLocalStorage("locale");

    const store = useCommonStore();
    const isLoading = computed(() => store.isLoading);

    const app = getCurrentInstance();

    if (localLanguage && typeof localLanguage === "object")
      locale.value = "en-US";
    else locale.value = localLanguage;

    if (app) app.appContext.config.globalProperties.$input = input;

    watch(
      () => isLoading.value,
      (newVal) => {
        if (newVal) loader.show();
        else loader.hide();
      }
    );
  },
});
</script>
