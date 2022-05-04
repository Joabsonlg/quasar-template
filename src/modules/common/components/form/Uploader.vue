<template>
  <q-card class="q-my-sm">
    <q-card-section class="bg-secondary q-pa-sm">
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="q-uploader__title text-white">Imagens</div>
        </div>
        <div class="col-auto">
          <q-btn
            color="white"
            flat
            icon="add_box"
            round
            @click="$refs.file.click()"
          />
        </div>
      </div>
      <div class="row" style="display: none">
        <div class="col-12">
          <input
            ref="file"
            multiple
            type="file"
            @change="onFileChange"
          />
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <div v-if="localImages.length > 0" class="row">
        <div class="col-12">
          <div class="q-uploader__list">
            <q-card v-for="(image, index) in localImages" class="q-my-sm">
              <q-img :src="image.url">
                <div class="absolute-bottom text-center">
                  <q-btn
                    color="white"
                    flat
                    icon="delete"
                    round
                    @click="removeImage(index)"
                  />
                </div>
              </q-img>
            </q-card>
          </div>
        </div>
      </div>
      <div v-else class="row">
        <div class="col-12">
          <p>Nenhuma imagem foi adicionada</p>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import {defineComponent, watch, reactive} from "vue";
import {useQuasar} from "quasar";

export default defineComponent({
  name: "BaseInput",
  props: {
    images: {
      type: Array,
      default: () => []
    },
    maxSize: {
      type: Number,
      default: 1
    },
    maximumQuantity: {
      type: Number,
      default: 3
    }
  },
  setup(props, {emit}) {
    let localImages = reactive([...props.images])
    watch(localImages, (value) => {
      emit('update:images', value)
    })
    watch(() => props.images, (value) => {
      localImages = value
    })

    const $q = useQuasar()

    const onFileChange = (e) => {
      const files = e.target.files
      if (files.length + localImages.length > props.maximumQuantity) {
        $q.notify({
          message: `Você não pode adicionar mais de ${props.maximumQuantity} imagens!`,
          color: 'negative',
          icon: 'error'
        })
        return
      }
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (file.size > props.maxSize * 1024 * 1024) {
          $q.notify({
            message: `As imagens devem ser menores ou igual a ${props.maxSize} MB!`,
            color: 'negative',
            icon: 'error'
          })
          continue
        }
        const reader = new FileReader()
        reader.onload = (e) => {
          const url = e.target.result
          localImages.push({
            id: undefined,
            url: url
          })
        }
        reader.readAsDataURL(file)
      }
    }

    const removeImage = (index) => {
      localImages.splice(index, 1)
    }

    return {localImages, onFileChange, removeImage}
  }
})
</script>

<style scoped>

</style>
