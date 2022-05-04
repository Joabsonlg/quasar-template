<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="pt-0-important bg-auth">
      <q-page>
        <div class="row" style="height: 100vh">
          <div class="col-12 flex content-center justify-center">
            <router-view/>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import {useQuasar} from "quasar";

const $q = useQuasar()
$q.dark.set(false)
</script>


<style scoped>
.wave {
  position: fixed;
  height: 100%;
  left: 0;
  bottom: 0;
  z-index: 0;
}

.login-image {
  z-index: 1;
}

.bg-auth {
  backgroud-color: #F0F4F3;
  background-image: url("src/assets/login/bg-auth.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
