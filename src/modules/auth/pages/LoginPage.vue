<template>
  <q-card class="q-ma-xl">
    <div class="row">
      <div class="col-0 col-sm-5 bg-primary rounded-left-borders xs-hide">
        <div class="row q-ml-sm q-mt-sm">
          <div class="col-12 fredoka text-subtitle1">
            <router-link class="text-white" style="text-decoration: none" to="/"
              >{{ $t("System Name") }}
            </router-link>
          </div>
        </div>
        <div
          class="row full-width q-px-xl q-pb-xl full-height flex flex-center"
        >
          <div class="">
            <div
              class="text-h4 text-uppercase text-white fredoka"
              style="min-width: 220px"
            >
              {{ $t("Welcome") }}!
            </div>
            <div class="text-white q-my-sm text-subtitle1">
              {{ $t("Enter credentials") }}!
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-7">
        <div class="row q-ml-sm q-mt-sm sm-and-up-hide">
          <div class="col-12 fredoka text-subtitle1">
            <router-link
              class="text-primary"
              style="text-decoration: none"
              to="/"
            >
              {{ $t("System Name") }}
            </router-link>
          </div>
        </div>
        <div class="row q-pa-sm-sm q-pa-md">
          <div class="col-12">
            <q-card-section>
              <div class="q-mb-xl">
                <div class="flex justify-center">
                  <div
                    class="text-h4 text-uppercase q-my-none text-weight-bold text-primary fredoka"
                  >
                    Login
                  </div>
                </div>
              </div>
              <q-form class="q-gutter-md" @submit="submitForm">
                <q-input
                  v-model="user.username"
                  :rules="[rules.required]"
                  :label="$t('username')"
                  lazy-rules
                  name="username"
                />
                <q-input
                  v-model="user.password"
                  :rules="[
                    rules.required,
                    (val) =>
                      val.length > 6 ||
                      'This field must have at least 6 characters!',
                  ]"
                  :label="$t('password')"
                  name="password"
                  type="password"
                />
                <div>
                  <q-btn
                    class="full-width fredoka"
                    color="primary"
                    :label="$t('Login')"
                    rounded
                    type="submit"
                  ></q-btn>
                  <div class="q-mt-lg">
                    <div class="q-mt-sm">
                      {{ $t("without account") }}
                      <router-link class="text-primary" to="/form">{{
                        $t("register")
                      }}</router-link>
                    </div>
                    <div class="q-mt-sm">
                      {{ $t("Forgotten Password? Click") }}
                      <router-link class="text-primary" to="/forgot-password"
                        >{{ $t("here") }}!</router-link
                      >
                    </div>
                  </div>
                </div>
              </q-form>
            </q-card-section>
          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import rules from "src/support/rules/fieldRules";
import { handleErros } from "src/support/errors/handleErros.js";
import { useAuthStore, useCommonStore } from "stores/all";

const authStore = useAuthStore();
const commonStore = useCommonStore();
const router = useRouter();
const route = useRoute();

const user = reactive({
  username: "",
  password: "",
});

const submitForm = async () => {
  try {
    commonStore.ADD_REQUEST();
    await authStore.DO_LOGIN(user);
    const to = route.query.to?.toString();
    await router.push(to || "/admin/dashboard");
    commonStore.REMOVE_REQUEST();
  } catch (error) {
    handleErros(error);
  }
};
</script>
