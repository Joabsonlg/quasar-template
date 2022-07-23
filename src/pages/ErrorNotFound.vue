<template>
  <div class="fullscreen text-white text-center q-pa-md flex flex-center">
    <div>
      <div>
        <q-img src="src/assets/404.svg" alt="404" />
      </div>

      <div class="text-h2 text-primary fredoka" style="opacity: 0.6">
        {{ $t("Nothing") }}
      </div>

      <q-btn
        class="q-mt-xl fredoka"
        size="lg"
        color="primary"
        unelevated
        to="/"
        :label="$t('Home')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ErrorNotFound",
});
</script>
