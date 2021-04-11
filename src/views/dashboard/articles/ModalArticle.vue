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
        title="Primary Modal"
      >
        <b-row>
          <!-- username -->
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
  },
  data() {
    return {
      required,
      name: '',
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
}
</script>

<style>

</style>
