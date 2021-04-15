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
        no-close-on-esc
        no-close-on-backdrop
      >

        <b-tabs>

          <b-tab title="Articulo">

            <b-row>

              <!-- SKU -->
              <b-col
                cols="12"
                md="3"
              >
                <b-form-group
                  label-for="SKU"
                  label="SKU"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="SKU"
                    rules="required"
                  >
                    <b-form-input
                      id="SKU"
                      v-model="article.sku"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <!-- Product Type -->
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
                    label-for="productType"
                    label="Tipo Producto"
                    :state="errors.length > 0 ? false:null"
                  >
                    <v-select
                      id="productType"
                      v-model="article.productType"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      label="nombre"
                      :options="productTypes"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </validation-provider>
              </b-col>

              <!-- Article Name -->
              <b-col
                cols="12"
                lg="8"
              >
                <b-form-group
                  label="Articulo"
                  label-for="articleName"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="nombre"
                    rules="required"
                  >
                    <b-form-input
                      id="articleName"
                      v-model="article.articleName"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <!-- Stock -->
              <b-col
                cols="6"
                sm="3"
                lg="2"
                align-self="center"
              >
                <b-form-group
                  label-for="stock"
                  class="form-group-checkbox"
                >
                  <b-form-checkbox
                    id="stock"
                    v-model.number="article.stock"
                  >
                    Stock
                  </b-form-checkbox>
                </b-form-group>
              </b-col>

              <!-- Service -->
              <b-col
                cols="6"
                sm="3"
                lg="2"
                align-self="center"
              >
                <b-form-group
                  label-for="service"
                  class="form-group-checkbox"
                >
                  <b-form-checkbox
                    id="service"
                    v-model="article.service"
                  >
                    Servicio
                  </b-form-checkbox>
                </b-form-group>
              </b-col>

              <!-- Unit Group -->
              <b-col
                cols="12"
                sm="6"
                lg="4"
              >
                <validation-provider
                  #default="{ errors }"
                  name="grupo unidad"
                  rules="required"
                >
                  <b-form-group
                    label="Grupo Unidad"
                    label-for="unitGroup"
                    :state="errors.length > 0 ? false:null"
                  >
                    <v-select
                      id="unitGroup"
                      v-model="article.unitGroup"
                      :reduce="unit => unit._id"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      label="nombre"
                      :options="unitGroup"
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

              <!-- Inventory Unit -->
              <b-col
                cols="12"
                sm="6"
                lg="4"
              >
                <validation-provider
                  #default="{ errors }"
                  name="unidad inventario"
                  rules="required"
                >
                  <b-form-group
                    label="Unidad Inventario"
                    label-for="inventoryUnit"
                    :state="errors.length > 0 ? false:null"
                  >
                    <v-select
                      id="inventoryUnit"
                      v-model="article.inventoryUnit"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      label="nombre"
                      :options="inventoryUnit"
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

              <!-- Unit Sale -->
              <b-col
                cols="12"
                sm="6"
                lg="4"
              >
                <validation-provider
                  #default="{ errors }"
                  name="unidad venta"
                  rules="required"
                >
                  <b-form-group
                    label="Unidad Venta"
                    label-for="unitSale"
                    :state="errors.length > 0 ? false:null"
                  >
                    <v-select
                      id="unitSale"
                      v-model="article.unitSale"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      label="nombre"
                      :options="unitSale"
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

              <!-- Purchase Price -->
              <b-col
                cols="12"
                sm="6"
                lg="3"
              >
                <b-form-group
                  label="Precio Compra"
                  label-for="purchasePrice"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="precio compra"
                    rules="required"
                  >
                    <b-form-input
                      id="purchasePrice"
                      v-model.number="article.purchasePrice"
                      type="number"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <!-- Sale Price -->
              <b-col
                cols="12"
                sm="6"
                lg="3"
              >
                <b-form-group
                  label="Precio Venta"
                  label-for="salePrice"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="precio venta"
                    rules="required"
                  >
                    <b-form-input
                      id="salePrice"
                      v-model.number="article.salePrice"
                      type="number"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <!-- Minimum Sale Price -->
              <b-col
                cols="12"
                sm="6"
                lg="3"
              >
                <b-form-group
                  label="Precio min. Venta"
                  label-for="minimumSalePrice"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="precio min. venta"
                    rules="required"
                  >
                    <b-form-input
                      id="minimumSalePrice"
                      v-model.number="article.minimumSalePrice"
                      type="number"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <!-- Minimum Stock -->
              <b-col
                cols="12"
                sm="6"
                lg="3"
              >
                <b-form-group
                  label="Stock min."
                  label-for="minimumStock"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="stock min."
                    rules="required"
                  >
                    <b-form-input
                      id="minimumStock"
                      v-model.number="article.minimumStock"
                      type="number"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <!-- Maximum Stock -->
              <b-col
                cols="12"
                sm="6"
                lg="3"
              >
                <b-form-group
                  label="Stock Max."
                  label-for="maximumStock"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="stock max."
                    rules="required"
                  >
                    <b-form-input
                      id="maximumStock"
                      v-model.number="article.maximumStock"
                      type="number"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

            </b-row>

          </b-tab>

          <b-tab title="Características">

            <b-row>

              <b-col
                cols="12"
                lg="5"
              >
                <b-form-group
                  label-for="feature"
                  label="Característica"
                >
                  <v-select
                    id="feature"
                    v-model="featureSelected"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    label="nombre"
                    :options="allFeatures"
                    :clearable="false"
                    @option:selected="selectedFeature"
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
                </b-form-group>
              </b-col>

              <b-col
                cols="12"
                md="8"
                lg="5"
              >
                <b-form-group
                  label-for="valueFeature"
                  label="Valor"
                >
                  <v-select
                    id="valueFeature"
                    v-model="valueSelected"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    label="nombre"
                    :options="allValuesByFeature"
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
                </b-form-group>
              </b-col>

              <b-col
                cols="12"
                md="4"
                lg="2"
                align-self="center"
              >
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  variant="primary"
                  class="btn-icon"
                  block
                  @click="addFeature()"
                >
                  <feather-icon
                    icon="PlusCircleIcon"
                    class="mr-50"
                  />
                  <span class="align-middle">Agregar</span>
                </b-button>
              </b-col>

              <b-col
                cols="12"
                class="mt-2 mt-md-1 mt-lg-0"
              >
                <vue-good-table
                  :columns="columns"
                  :rows="article.features"
                  max-height="300px"
                  style-class="vgt-table condensed table-feature"
                  :rtl="direction"
                >
                  <div
                    slot="emptystate"
                    class="text-center p-2"
                  >
                    <small>No hay características</small>
                  </div>
                  <template
                    slot="table-row"
                    slot-scope="props"
                  >
                    <span v-if="props.column.field === 'action'">
                      <b-button
                        variant="danger"
                        size="sm"
                        @click="removeFeature(props.row)"
                      >
                        Remover
                      </b-button>
                    </span>
                  </template>
                </vue-good-table>
              </b-col>

            </b-row>

          </b-tab>

        </b-tabs>

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
  BCol, BForm, BTabs, BTab, BFormGroup, BFormInput, BModal, BFormCheckbox, BButton,
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required } from '@validations'
import vSelect from 'vue-select'
import { ref, inject } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'

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
    BTabs,
    BTab,
    VueGoodTable,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      required,
      columns: [
        {
          label: 'Acción',
          field: 'action',
          width: '120px',
        },
        {
          label: 'Característica',
          field: 'feature',
        },
        {
          label: 'Valor',
          field: 'value',
        },
      ],
      rows: [
        {
          id: 1,
          feature: 'Color',
          value: 'Rojo',
        },
        {
          id: 2,
          feature: 'Páginas',
          value: '123',
        },
      ],
    }
  },
  computed: {
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true
        return this.dir
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false
      return this.dir
    },
  },
  created() {
    extend('required', {
      message: 'Este campo es requerido',
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
      this.resetArticle()
      this.inventoryUnit = []
      this.unitSale = []
      this.closeForm()
    },
    closeForm() {
      this.$bvModal.hide('modal-article')
    },
  },
  setup(props, context) {
    const article = inject('article')
    const resetArticle = inject('resetArticle')
    const productTypes = inject('productTypes')
    const unitGroup = inject('unitGroup')
    const inventoryUnit = inject('inventoryUnit')
    const unitSale = inject('unitSale')
    const getDataUnitsByGroup = inject('getDataUnitsByGroup')
    const allFeatures = inject('allFeatures')
    const getDataValuesByFeature = inject('getDataValuesByFeature')
    const allValuesByFeature = inject('allValuesByFeature')

    const featureSelected = ref(null)
    const valueSelected = ref(null)

    const selectedUnitGroup = async ({ _id }) => {
      article.value.inventoryUnit = null
      article.value.unitSale = null
      const { data } = await getDataUnitsByGroup(_id)
      inventoryUnit.value = data
      unitSale.value = data
    }

    const selectedFeature = async ({ _id }) => {
      valueSelected.value = null
      const { data } = await getDataValuesByFeature(_id)
      allValuesByFeature.value = data
    }

    const addFeature = () => {
      if (!featureSelected.value || !valueSelected.value) {
        context.root.$bvToast.toast('Debe seleccionar una característica y su valor', {
          title: 'Característica',
          variant: 'warning',
          solid: true,
        })
      } else {
        context.root.$bvToast.toast('Se agrego una nueva característica', {
          title: 'Característica',
          variant: 'success',
          solid: true,
        })
        const { _id: featureId, nombre: feature } = featureSelected.value
        const { _id: valueId, nombre: value } = valueSelected.value
        article.value.features = [
          ...article.value.features,
          {
            feature,
            featureId,
            value,
            valueId,
          },
        ]
        featureSelected.value = null
        valueSelected.value = null
      }
    }

    const removeFeature = row => {
      
    }

    return {
      article,
      resetArticle,
      productTypes,
      unitGroup,
      inventoryUnit,
      unitSale,
      selectedUnitGroup,
      allFeatures,
      selectedFeature,
      allValuesByFeature,
      featureSelected,
      valueSelected,
      addFeature,
      removeFeature,
    }
  },
}
</script>

<style lang="scss">
  .form-group-checkbox {
    margin-top: .5rem;
  }
  #modal-article {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
    .modal-dialog {
      @media screen and (min-width: 576px) {
        max-width: 700px;
        width: 90%;
      }
    }
    .modal-lg {
      @media screen and (min-width: 992px) {
        max-width: 1000px;
        width: 90%;
      }
    }
  }
  [dir] .vgt-table.condensed.table-feature td, [dir] .vgt-table.condensed.table-feature th.vgt-row-header {
    padding: .35em .75em !important;
  }
</style>
