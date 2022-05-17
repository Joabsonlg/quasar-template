<template>
  <q-page class="q-pa-sm">
    <q-card class="q-mt-sm">
      <q-card-section>
        <div class="text-h6">Admin page</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="row q-col-gutter-md">
          <div class="col-md-12">
            <q-list bordered class="rounded-borders">
              <q-item-label header>Items</q-item-label>
            </q-list>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import {useAuthStore} from 'src/stores/all.js'
import {computed} from "vue";

const authStore = useAuthStore()

const userToken = computed(() => authStore.getUserToken)

// This request is to be intercepted when the token is invalid
authStore.GET_USER(userToken.value.access)
</script>
