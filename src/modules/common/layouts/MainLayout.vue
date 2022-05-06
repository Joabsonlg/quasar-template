<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white" elevated>
      <q-toolbar class="q-py-md">
        <q-btn
          aria-label="Menu"
          color="primary"
          dense
          flat
          icon="menu"
          round
          @click="toggleLeftDrawer"
          v-if="isSeller"
        />
        <div class="text-white fredoka text-h6">
          <router-link class="text-primary q-mx-lg" style="text-decoration: none" to="/">System Name
          </router-link>
        </div>
        <q-space/>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      behavior="mobile"
      bordered
      class="bg-dark text-white"
      v-if="isSeller"
      :width="200"
    >
      <q-list class="full-height">
        <q-item
          :clickable="false"
          :link="false"
          class="bg-primary q-mb-md"
        >
          <q-item-section>
            <q-item-label class="flex flex-center">
              <q-avatar>
                <img
                  :src="user.picture ? user.picture : 'https://avatars.dicebear.com/v2/female/bdec29aeba6e99da4b3feeaf7d51dee9.svg'">
              </q-avatar>
            </q-item-label>
            <q-item-label class="flex flex-center">
              <div class="text-white fredoka text-h6">
                {{ user.username ? user.username : 'Olá!' }}
              </div>
            </q-item-label>
          </q-item-section>
        </q-item>
        <seller-navigation-items v-if="isAuthenticated && isSeller" :shop_slug="shop.slug"/>
        <q-item active-class="q-item-no-link-highlighting" to="/Profile">
          <q-item-section avatar>
            <q-icon name="fas fa-user"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Minha Conta</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator v-if="!isAuthenticated" class="q-my-md" color="white"/>
        <q-item v-if="isAuthenticated" id="logout-button" active-class="q-item-no-link-highlighting" clickable
                @click="signOut">
          <q-item-section avatar>
            <q-icon name="fas fa-sign-out-alt"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Sair</q-item-label>
          </q-item-section>
        </q-item>
        <div v-if="!isAuthenticated" class="q-mx-md q-gutter-md">
          <q-btn
            class="full-width"
            color="primary"
            label="Login"
            to="/login"/>
          <q-btn
            class="full-width"
            color="transparent"
            label="Cadastro"
            to="/shop/register"/>
        </div>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view/>
    </q-page-container>
    <q-separator class="q-mt-lg"/>
    <div class="q-mt-md row">
      <div class="col-12 text-center q-pa-lg">

        <q-btn color="grey-8" dense flat icon="fab fa-github"></q-btn>
        <q-btn color="grey-8" dense flat icon="fab fa-facebook"></q-btn>
        <q-btn color="grey-8" dense flat icon="fab fa-twitter"></q-btn>
        <q-btn color="grey-8" dense flat icon="fab fa-instagram"></q-btn>
        <br/>

        <div class="text-body1 q-mt-sm text-grey-8 text-weight-bold">
          © 2020 Workflow, Inc. All rights reserved.
        </div>
      </div>
    </div>
  </q-layout>
</template>

<script setup>
import {computed, ref} from 'vue'
import {useQuasar} from 'quasar';
import {useRouter} from 'vue-router';
import {authStore} from "src/modules/auth/store";

const $q = useQuasar()
const $router = useRouter()

const $store = authStore()

const leftDrawerOpen = ref(false)

const isAuthenticated = computed(() => $store.isAuthenticated)
const user = computed(() => $store.getUser)

const signOut = () => $store.SIGN_OUT()
const toggleLeftDrawer = () => leftDrawerOpen.value = !leftDrawerOpen.value
</script>

<style scoped>
.link-menu {
  text-decoration: none;
  margin-right: 1rem;
  font-size: 1rem;
}
</style>
