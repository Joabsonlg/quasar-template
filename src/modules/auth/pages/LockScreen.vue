<template>
  <q-card class="q-mx-xl">
    <div class="row">
      <div class="col-0 col-sm-5 bg-primary rounded-left-borders">
        <div class="row q-ml-sm q-mt-sm">
          <div class="col-12 fredoka text-subtitle1">
            <router-link class="text-white" style="text-decoration: none" to="/"
              >meuPedido.com
            </router-link>
          </div>
        </div>
        <div
          class="row full-width q-px-xl q-pb-xl full-height flex flex-center"
        >
          <div>
            <div
              class="text-h4 text-uppercase text-white fredoka"
              style="min-width: 220px"
            >
              Opss!
            </div>
            <div class="text-white q-my-sm text-subtitle1">
              Sua sessão expirou. Informe sua senha senha para desbloquear.
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
              >meuPedido.com
            </router-link>
          </div>
        </div>
        <div class="row q-pa-sm-sm q-pa-md">
          <div class="col-12">
            <q-form @submit="submitForm">
              <q-card-section>
                <div class="q-mb-xl">
                  <div class="flex justify-center">
                    <div
                      class="text-h4 text-uppercase q-my-none text-weight-bold text-primary fredoka"
                    >
                      {{ user.username }}
                    </div>
                  </div>
                </div>
                <q-input
                  v-model="password"
                  :rules="[rules.required]"
                  :type="isPwd ? 'password' : 'text'"
                  lazy-rules
                  placeholder="Senha"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
              </q-card-section>
              <q-card-actions>
                <q-btn
                  :loading="loading"
                  class="text-capitalize full-width"
                  color="primary"
                  label="Desbloquear"
                  push
                  type="submit"
                ></q-btn>
                <div class="q-mt-sm">
                  <a class="text-primary" href="#" @click="signOut"
                    >Entrar com outro usuário</a
                  >
                </div>
              </q-card-actions>
            </q-form>
          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { handleErros } from "src/support/errors/handleErros";
import rules from "src/support/rules/fieldRules";
import { useAuthStore, useCommonStore } from "stores/all";

const commonStore = useCommonStore();
const authStore = useAuthStore();
const $route = useRoute();
const $router = useRouter();

const userLogged = computed(() => authStore.getUser);
const loading = computed(() => commonStore.isLoading);

const password = ref("");
const isPwd = ref("password");
const user = userLogged.value;

const submitForm = async () => {
  try {
    commonStore.ADD_REQUEST();
    await authStore.DO_LOGIN({
      username: user.username,
      password: password.value,
    });
    const to = $route.query.to;
    let rota = "";
    if (userLogged.value.user_type.includes("Admin")) {
      rota = to?.toString() || "/admin";
    } else if (userLogged.value.user_type.includes("Seller")) {
      rota = to?.toString() || "/shop";
    } else {
      rota = to?.toString() || "/";
    }
    await $router.push({ path: rota });
  } catch (error) {
    handleErros(error);
    commonStore.REMOVE_REQUEST();
  }
};

const signOut = () => {
  authStore.SIGN_OUT();
  $router.push("/login");
};
</script>
