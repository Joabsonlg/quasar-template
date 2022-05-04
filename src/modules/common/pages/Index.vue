<template>
  <q-page class="q-pa-sm">
    <q-card class="q-mt-sm">
      <q-card-section>
        <div class="text-h6">Componentes básicos</div>
        <div class="text-subtitle2">by Joabson Arley</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="row q-col-gutter-md">
          <div class="col-md-6">
            <q-list bordered class="rounded-borders">
              <q-item-label header>Inputs</q-item-label>
              <div v-for="item in inputTypes" :key="item.type">
                <q-separator/>
                <q-item>
                  <q-item-section>
                    <BaseInput :label="item.type" :type="item.type" v-model="item.value"/>
                  </q-item-section>
                </q-item>
              </div>
            </q-list>
          </div>
          <div class="col-md-6">
            <q-list bordered class="rounded-borders">
              <q-item-label header>Modais</q-item-label>
              <div v-for="(item, index) in modalTypes" :key="item.type">
                <q-separator/>
                <q-item>
                  <q-item-section>
                    <q-btn @click="toggleModal(index)">Toogle modal</q-btn>
                    <BaseModal v-model="item.active" :actionsConfig="actionsConfig">
                      <h1>Exemple Modal</h1>
                    </BaseModal>
                  </q-item-section>
                </q-item>
              </div>
            </q-list>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import {defineAsyncComponent, defineComponent, reactive, ref} from 'vue'

export default defineComponent({
  name: "Init Material",
  components: {
    BaseModal: defineAsyncComponent(() => import('../components/BaseModal.vue')),
    BaseInput: defineAsyncComponent(() => import("../components/form/BaseInput.vue"))
  },
  setup() {
    const inputTypes = reactive([
      {
        type: 'text',
        value: ref('Input Text')
      },
      {
        type: 'email',
        value: ref('input@mail.com')
      },
      {
        type: 'password',
        value: ref('Input Password')
      },
      {
        type: 'number',
        value: ref('')
      },
      {
        type: 'tel',
        value: ref('Input Tel')
      },
      {
        type: 'url',
        value: ref('Input Url')
      },
      {
        type: 'search',
        value: ref('Input Search')
      }
    ])
    const modalTypes = reactive([
      {
        type: 'simple',
        active: ref(false)
      }
    ])
    const toggleModal = (index) => modalTypes[index].active = !modalTypes[index].active
    const actionsConfig = {
      close: {
        label: 'Fechar',
        color: 'primary'
      },
      save: {
        label: 'Salvar',
        color: 'primary'
      }
    }
    return {inputTypes, modalTypes, toggleModal, actionsConfig}
  }
})
</script>
