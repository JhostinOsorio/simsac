<template>
  <validation-observer
    ref="modal-article"
    v-slot="{ handleSubmit }"
  >
    <b-form @submit.prevent="handleSubmit(sendForm)">
      <b-modal
        id="modal-article"
        ok-only
        ok-title="Accept"
        modal-class="modal-primary"
        centered
        title="Registrar Articulo"
      >
        <b-row>

          <b-col cols="12">
            <b-form-group
              label="Nombre"
              label-for="name"
            >
              <validation-provider
                #default="{ errors }"
                name="nombre"
                rules="required"
              >
                <b-form-input
                  id="name"
                  v-model="name"
                  :state="errors.length > 0 ? false:null"
                  placeholder="Ingrese el nombre"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col cols="12">
            <b-form-group
              label="Tipo"
              label-for="tipo-producto"
            >
              <v-select
                v-model="selected"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="title"
                :options="['Oregano', 'Arroz']"
              />
            </b-form-group>
          </b-col>

        </b-row>
      </b-modal>
    </b-form>
  </validation-observer>
</template>

<script>
import {
  BRow,
  BCol, BForm, BFormGroup, BFormInput, BModal,
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required } from '@validations'
import vSelect from 'vue-select'

export default {
  name: 'ModalArticle',
  components: {
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
    BModal,
    ValidationObserver,
    ValidationProvider,
    vSelect,
  },
  data() {
    return {
      required,
      name: '',
      selected: '',
    }
  },
  created() {
    extend('required', {
      message: 'El campo {_field_} es requerido',
    })
  },
  methods: {
    sendForm() {
      console.log('Enviando Formulario')
    },
  },
  setup() {

  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
</style>
