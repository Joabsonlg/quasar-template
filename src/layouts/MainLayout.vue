<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          class="md-and-up-hide"
        />

        <q-toolbar-title>
          {{ $t("System Name") }}
        </q-toolbar-title>

        <div class="xs-hide sm-hide">
          <q-btn
            flat
            dense
            no-caps
            :label="$t('Home')"
            @click="goToSection('heroSection')"
            class="q-mx-sm"
          />
          <q-btn
            flat
            dense
            no-caps
            :label="$t('Features')"
            @click="goToSection('features')"
            class="q-mx-sm"
          />
          <q-btn
            flat
            dense
            no-caps
            :label="$t('About')"
            @click="goToSection('about')"
            class="q-mx-sm"
          />
          <q-btn
            dense
            label="Login"
            to="/login"
            v-if="!isAuthenticated"
            flat
            class="q-px-sm q-ml-md"
          />
          <q-btn
            flat
            dense
            label="Dashboard"
            v-if="isAuthenticated"
            to="/admin"
          />
          <q-btn
            flat
            dense
            label="Logout"
            v-if="isAuthenticated"
            @click="logout"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>
        <q-item clickable @click="navigate('heroSection')">
          <q-item-section>
            <q-item-label>{{ $t("Home") }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="navigate('features')">
          <q-item-section>
            <q-item-label>{{ $t("Features") }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="navigate('about')">
          <q-item-section>
            <q-item-label>{{ $t("About") }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-if="!isAuthenticated" to="/login">
          <q-item-section>
            <q-item-label>Login</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-if="isAuthenticated" to="/admin">
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-if="isAuthenticated" @click="logout">
          <q-item-section>
            <q-item-label>Logout</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
      <q-toolbar
        class="flex flex-center text-white"
        style="border-top: 2px solid #0cbcbc; background-color: #263238"
      >
        <div class="q-pa-md q-gutter-sm flex">
          <q-btn
            round
            type="a"
            href="https://www.instagram.com/joabson_arley/"
            class="bg-primary text-white"
            icon="fab fa-instagram"
            target="_blank"
          />
          <q-btn
            round
            type="a"
            href="https://github.com/joabsonlg/"
            class="bg-primary text-white"
            icon="fab fa-github"
            target="_blank"
          />
          <q-btn
            round
            type="a"
            href="#"
            class="bg-primary text-white"
            icon="fab fa-twitter"
          />
          <q-btn
            round
            type="a"
            href="#"
            class="bg-primary text-white"
            icon="email"
          />
          <q-btn
            round
            type="a"
            href="#"
            class="bg-primary text-white"
            icon="fas fa-heart"
          />
          <q-select
            v-model="locale"
            :options="langs"
            dark
            dense
            borderless
            emit-value
            map-options
            options-dense
            class="q-ml-lg"
          >
            <template v-slot:prepend>
              <q-icon name="flag" />
            </template>
          </q-select>
        </div>
      </q-toolbar>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useAuthStore } from "stores/all";
import { goToSection } from "src/support/helpers/scroll";
import { useI18n } from "vue-i18n";
import { saveToLocalStorage } from "src/support/helpers/storage";

const $authStore = useAuthStore();

const langs = [
  {
    label: "Português-BR",
    value: "pt-BR",
  },
  {
    label: "English",
    value: "en-US",
  },
];

const { locale } = useI18n({ useScope: "global" });

const leftDrawerOpen = ref(false);

const isAuthenticated = computed(() => $authStore.isAuthenticated);

const navigate = (section: string) => {
  leftDrawerOpen.value = false;
  setTimeout(() => {
    goToSection(section);
  }, 250);
};
const toggleLeftDrawer = () => (leftDrawerOpen.value = !leftDrawerOpen.value);
const logout = () => {
  $authStore.SIGN_OUT();
};
watch(locale, (newLocale) => {
  saveToLocalStorage("locale", newLocale);
});
</script>
