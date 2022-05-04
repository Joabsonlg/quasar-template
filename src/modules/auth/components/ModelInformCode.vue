<template>
  <q-dialog v-model="show" persistent class="model-code-verification">
    <q-card class="full-width">
      <q-form
        @submit="verifyCode"
        class="q-gutter-md"
      >
        <q-card-section>
          <div class="text-h6">Digite o código enviado para seu e-mail</div>
        </q-card-section>
        <q-card-section>
          <div class="row justify-around">
            <div class="col-2 q-pa-sm">
              <q-input filled v-model="code.n1" class="text-h2 text-center" mask="#"/>
            </div>
            <div class="col-2 q-pa-sm">
              <q-input v-model="code.n2" filled class="text-h2 text-center" mask="#"/>
            </div>
            <div class="col-2 q-pa-sm">
              <q-input filled v-model="code.n3" class="text-h2 text-center" mask="#"/>
            </div>
            <div class="col-2 q-pa-sm">
              <q-input filled v-model="code.n4" class="text-h2 text-center" mask="#"/>
            </div>
            <div class="col-2 q-pa-sm">
              <q-input filled v-model="code.n5" class="text-h2 text-center" mask="#"/>
            </div>
            <div class="col-2 q-pa-sm">
              <q-input filled v-model="code.n6" class="text-h2 text-center" mask="#"/>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup/>
          <q-btn flat label="Verificar" color="primary" type="submit" :loading="loading"/>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import {defineComponent, ref, reactive, watch} from "vue";
import {useQuasar} from 'quasar'
import {showPositive, showNegative} from 'src/support/helpers/notification'
import {wait} from 'src/support/helpers/general'

export default defineComponent({
  name: "ModelAddProduct",
  props: {
    show_modal_inform_code: {
      required: true,
      default: false
    }
  },
  setup(props, {emit}) {
    const $q = useQuasar()
    const show = ref(props.show_modal_inform_code)
    const loading = ref(false)
    const code = reactive({
      n1: null,
      n2: null,
      n3: null,
      n4: null,
      n5: null,
      n6: null,
    })

    watch(show, (value) => {
      emit('update:show_modal_inform_code', value)
    })
    watch(() => props.show_modal_inform_code, (value) => {
      show.value = value
    })
    const verifyCode = async () => {
      loading.value = true
      await wait(1000).then(() => {
        showPositive('Produto Adicionado com sucesso!')
        loading.value = false
        show.value = false
      }).catch(() => {
        loading.value = false
        showNegative('Erro ao adicionar produto!')
      })
    }

    return {show, code, verifyCode, loading}
  }
})
</script>

<style>
.model-code-verification .q-field__native {
  text-align: center;
  color: transparent;
  text-shadow: 0 0 0 #000;
}
</style>
