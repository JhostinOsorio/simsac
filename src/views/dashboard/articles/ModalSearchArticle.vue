<template>
  <b-form @submit.prevent="sendForm">
    <b-modal
      id="modal-search-article"
      ok-only
      ok-title="Accept"
      modal-class="modal-primary"
      centered
      title="Buscar Articulo"
    >
      <b-row>

        <b-col
          cols="12"
        >
          <b-form-group
            label="Campo"
            label-for="field"
          >
            <v-select
              v-model="serverParams.columnFilters.field"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="title"
              :options="['Articulo', 'SKU']"
            />
          </b-form-group>
        </b-col>

        <!-- Value -->
        <b-col
          cols="12"
        >
          <b-form-group
            label="Valor"
            label-for="value"
          >
            <b-form-input
              id="articleName"
              v-model="serverParams.columnFilters.value"
            />
          </b-form-group>
        </b-col>

      </b-row>

      <template #modal-footer>
        <b-button
          type="button"
          variant="outline-primary"
          @click="closeForm"
        >
          Cerrar
        </b-button>
        <b-button
          type="submit"
          variant="primary"
        >
          Buscar
        </b-button>
      </template>

    </b-modal>
  </b-form>
</template>

<script>
import {
  BRow,
  BCol, BForm, BFormGroup, BFormInput, BModal, BButton,
} from 'bootstrap-vue'
import { inject } from '@vue/composition-api'
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
    BButton,
    vSelect,
  },
  data() {
    return {

    }
  },
  methods: {
    searchArticles() {

    },
    closeForm() {
      this.$bvModal.hide('modal-search-article')
    },
  },
  setup() {
    const serverParams = inject('serverParams')
    return {
      serverParams,
    }
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
</style>
