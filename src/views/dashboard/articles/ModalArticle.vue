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
        size="lg"
      >
        <b-row>

          <b-col
            cols="12"
            md="3"
          >
            <b-form-group
              label-for="SKU"
            >
              <validation-provider
                #default="{ errors }"
                name="SKU"
                rules="required"
              >
                <b-form-input
                  id="SKU"
                  v-model="sendArticles.sku"
                  :state="errors.length > 0 ? false:null"
                  placeholder="SKU"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
            md="9"
          >
            <validation-provider
              #default="{ errors }"
              name="tipo producto"
              rules="required"
            >
              <b-form-group
                label-for="tipo-producto"
                :state="errors.length > 0 ? false:null"
              >
                <v-select
                  v-model="sendArticles.productType"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  label="nombre"
                  :options="productTypes"
                  placeholder="Tipo de producto"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>

          <b-col
            cols="12"
            lg="8"
          >
            <b-form-group
              label-for="name"
            >
              <validation-provider
                #default="{ errors }"
                name="nombre"
                rules="required"
              >
                <b-form-input
                  id="name"
                  v-model="sendArticles.articleName"
                  :state="errors.length > 0 ? false:null"
                  placeholder="Nombre del articulo"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col
            cols="3"
            lg="2"
          >
            <b-form-group
              label-for="stock"
              class="form-group-checkbox"
            >
              <b-form-checkbox
                v-model="sendArticles.stock"
              >
                Stock
              </b-form-checkbox>
            </b-form-group>
          </b-col>

          <b-col
            cols="3"
            lg="2"
          >
            <b-form-group
              label-for="service"
              class="form-group-checkbox"
            >
              <b-form-checkbox
                v-model="sendArticles.service"
              >
                Servicio
              </b-form-checkbox>
            </b-form-group>
          </b-col>

          <b-col
            cols="6"
            lg="4"
          >
            <validation-provider
              #default="{ errors }"
              name="grupo unidad"
              rules="required"
            >
              <b-form-group
                label-for="grupo-unidad"
                :state="errors.length > 0 ? false:null"
              >
                <v-select
                  v-model="sendArticles.unitGroup"
                  :reduce="unit => unit._id"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  label="nombre"
                  :options="unitGroup"
                  placeholder="Grupo unidad"
                  :clearable="false"
                  @option:selected="selectedUnitGroup"
                >
                  <template v-slot:no-options="{ search, searching }">
                    <template v-if="searching">
                      No se encontraron resultados de <em>{{ search }}</em>.
                    </template>
                    <template v-else>
                      Escriba para buscar.
                    </template>
                  </template>
                </v-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>

          <b-col
            cols="6"
            lg="4"
          >
            <validation-provider
              #default="{ errors }"
              name="unidad inventario"
              rules="required"
            >
              <b-form-group
                label-for="unidad-inventario"
                :state="errors.length > 0 ? false:null"
              >
                <v-select
                  v-model="sendArticles.inventoryUnit"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  label="nombre"
                  :options="inventoryUnit"
                  placeholder="Unidad inventario"
                >
                  <template v-slot:no-options="{ search, searching }">
                    <template v-if="searching">
                      No se encontraron resultados de <em>{{ search }}</em>.
                    </template>
                    <template v-else>
                      Escriba para buscar.
                    </template>
                  </template>
                </v-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>

          <b-col
            cols="6"
            lg="4"
          >
            <validation-provider
              #default="{ errors }"
              name="unidad venta"
              rules="required"
            >
              <b-form-group
                label-for="unidad-venta"
                :state="errors.length > 0 ? false:null"
              >
                <v-select
                  v-model="sendArticles.unitSale"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  label="nombre"
                  :options="unitSale"
                  placeholder="Unidad venta"
                >
                  <template v-slot:no-options="{ search, searching }">
                    <template v-if="searching">
                      No se encontraron resultados de <em>{{ search }}</em>.
                    </template>
                    <template v-else>
                      Escriba para buscar.
                    </template>
                  </template>
                </v-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>

          <b-col
            cols="6"
            lg="3"
          >
            <b-form-group
              label-for="price-buy"
            >
              <validation-provider
                #default="{ errors }"
                name="precio compra"
                rules="required"
              >
                <b-form-input
                  id="price-buy"
                  v-model="sendArticles.purchasePrice"
                  type="number"
                  :state="errors.length > 0 ? false:null"
                  placeholder="Precio Compra"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col
            cols="6"
            lg="3"
          >
            <b-form-group
              label-for="price-vending"
            >
              <validation-provider
                #default="{ errors }"
                name="precio venta"
                rules="required"
              >
                <b-form-input
                  id="price-vending"
                  v-model="sendArticles.salePrice"
                  type="number"
                  :state="errors.length > 0 ? false:null"
                  placeholder="Precio Venta"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col
            cols="6"
            lg="3"
          >
            <b-form-group
              label-for="price-min-vending"
            >
              <validation-provider
                #default="{ errors }"
                name="precio min. venta"
                rules="required"
              >
                <b-form-input
                  id="price-min-vending"
                  v-model="sendArticles.minimumSalePrice"
                  type="number"
                  :state="errors.length > 0 ? false:null"
                  placeholder="Precio min. Venta"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col
            cols="6"
            lg="3"
          >
            <b-form-group
              label-for="stock-min"
            >
              <validation-provider
                #default="{ errors }"
                name="stock min."
                rules="required"
              >
                <b-form-input
                  id="stock-min"
                  v-model="sendArticles.minimumStock"
                  type="number"
                  :state="errors.length > 0 ? false:null"
                  placeholder="Stock min."
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col
            cols="6"
            lg="3"
          >
            <b-form-group
              label-for="stock-max"
            >
              <validation-provider
                #default="{ errors }"
                name="stock max."
                rules="required"
              >
                <b-form-input
                  id="stock-max"
                  v-model="sendArticles.maximumStock"
                  type="number"
                  :state="errors.length > 0 ? false:null"
                  placeholder="Stock max."
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
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
            @click="handleSubmit(sendForm)"
          >
            Registrar
          </b-button>
        </template>

      </b-modal>
    </b-form>
  </validation-observer>
</template>

<script>
import {
  BRow,
  BCol, BForm, BFormGroup, BFormInput, BModal, BFormCheckbox, BButton,
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required } from '@validations'
import vSelect from 'vue-select'
import { inject } from '@vue/composition-api'

export default {
  name: 'ModalArticle',
  components: {
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
    BModal,
    BFormCheckbox,
    BButton,
    ValidationObserver,
    ValidationProvider,
    vSelect,
  },
  data() {
    return {
      required,
    }
  },
  created() {
    extend('required', {
      message: 'El campo {_field_} es requerido',
    })
  },
  methods: {
    sendForm() {
      this.$swal({
        title: 'El articulo se registro con éxito',
        text: 'Da click en el botón!',
        icon: 'success',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
      })
      this.resetSendArticles()
      this.inventoryUnit = []
      this.unitSale = []
      this.closeForm()
    },
    closeForm() {
      this.$bvModal.hide('modal-article')
    },
  },
  setup() {
    const sendArticles = inject('sendArticles')
    const resetSendArticles = inject('resetSendArticles')
    const productTypes = inject('productTypes')
    const unitGroup = inject('unitGroup')
    const inventoryUnit = inject('inventoryUnit')
    const unitSale = inject('unitSale')
    const getDataUnitsByGroup = inject('getDataUnitsByGroup')

    const selectedUnitGroup = async ({ _id }) => {
      const { data } = await getDataUnitsByGroup(_id)
      inventoryUnit.value = data
      unitSale.value = data
    }

    return {
      sendArticles,
      resetSendArticles,
      productTypes,
      unitGroup,
      inventoryUnit,
      unitSale,
      selectedUnitGroup,
    }
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  .form-group-checkbox {
    margin-top: .5rem;
  }
</style>
