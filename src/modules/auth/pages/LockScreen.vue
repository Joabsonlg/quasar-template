<template>
  <q-card class="q-mx-xl">
    <div class="row">
      <div class="col-0 col-sm-5 bg-primary rounded-left-borders">
        <div class="row q-ml-sm q-mt-sm">
          <div class="col-12 fredoka text-subtitle1">
            <router-link class="text-white" style="text-decoration: none" to="/">System name
            </router-link>
          </div>
        </div>
        <div class="row full-width q-px-xl q-pb-xl full-height flex flex-center">
          <div>
            <div class="text-h4 text-uppercase text-white fredoka" style="min-width: 220px">Opss!</div>
            <div class="text-white q-my-sm text-subtitle1">Sua sessão expirou. Informe sua senha senha para desbloquear.
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-7">
        <div class="row q-ml-sm q-mt-sm sm-and-up-hide">
          <div class="col-12 fredoka text-subtitle1">
            <router-link class="text-primary" style="text-decoration: none" to="/">System Name
            </router-link>
          </div>
        </div>
        <div class="row q-pa-sm-sm q-pa-md">
          <div class="col-12">
            <q-form @submit="submitForm">
              <q-card-section>
                <div class="q-mb-xl">
                  <div class="flex justify-center">
                    <div class="text-h4 text-uppercase q-my-none text-weight-bold text-primary fredoka">
                      {{ user.username }}
                    </div>
                  </div>
                </div>
                <q-input v-model="password" :rules="[rules.required, rules.minLength(6)]"
                         :type="isPwd ? 'password' : 'text'" lazy-rules
                         placeholder="Senha">
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
                <q-btn :loading="loading" class="text-capitalize full-width" color="primary" label="Desbloquear" push
                       type="submit"></q-btn>
                <div class="q-mt-sm">
                  <a class="text-primary" href="#" @click="signOut">Entrar com outro usuário</a>
                </div>
              </q-card-actions>
            </q-form>
          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup>
import {computed, ref} from 'vue'
import {useQuasar} from "quasar";
import {useRoute, useRouter} from "vue-router";
import {handleErros} from "src/support/errors/handleErros";
import rules from "src/support/rules/fieldRules"
import {useAuthStore, useCommonStore} from "stores/all";

const $authStore = useAuthStore()
const $commonStore = useCommonStore()

const $q = useQuasar()
const $route = useRoute()
const $router = useRouter()

//Computed
const userLogged = computed(() => $authStore.getUser)
const loading = computed(() => $commonStore.isLoading)

//Data
const password = ref('')
const isPwd = ref('password')
const user = userLogged.value

//Methods
const submitForm = async () => {
  try {
    $commonStore.ADD_REQUEST()
    await $authStore.DO_LOGIN({
      username: userLogged.value.username,
      password: password.value
    })
    const to = $route.query.to
    let rota = to || '/admin'
    $router.push({path: rota})
  } catch (error) {
    handleErros(error)
    $commonStore.REMOVE_REQUEST()
  }
}

const signOut = () => $authStore.SIGN_OUT().then(() => $router.push('/login'))
</script>

<style>
.bg-image {
  background-image: url("src/assets/wallpapers/wp1.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

[v-cloak] {
  display: none !important;
}
</style>
