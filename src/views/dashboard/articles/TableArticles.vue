<template>
  <div>
    <!-- search input -->
    <div class="custom-search d-flex justify-content-between">
      <div
        class="d-flex align-items-start"
      >
        <b-button
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          v-b-modal.modal-article
          variant="primary"
          @click="openModalArticle"
        >
          Nuevo
        </b-button>
      </div>
      <b-form-group>
        <div class="d-flex align-items-center">
          <label class="mr-1">Buscar</label>
          <b-form-input
            v-model="searchTerm"
            placeholder="......."
            type="text"
            class="d-inline-block"
          />
        </div>
      </b-form-group>
    </div>

    <!-- table -->
    <vue-good-table
      mode="remote"
      :columns="columns"
      :rows="rows"
      :rtl="direction"
      class="vgt-table condensed"
      :search-options="{
        enabled: true,
        externalQuery: searchTerm }"
      :pagination-options="{
        enabled: true,
        perPage: serverParams.perPage
      }"
      :total-rows="totalRecords"
      @on-page-change="onPageChange"
      @on-per-page-change="onPerPageChange"
      @on-column-filter="onColumnFilter"
    >
      <div
        slot="emptystate"
        class="text-center p-2"
      >
        <small>
          No se encontraron resultados
        </small>
      </div>
      <template
        slot="table-row"
        slot-scope="props"
      >

        <!-- Column: Status -->
        <span v-if="props.column.field === 'activo'">
          <b-badge :variant="props.row.activo ? 'light-success' : 'light-danger'">
            {{ props.row.activo ? 'Activo' : 'Desactivo' }}
          </b-badge>
        </span>

        <!-- Column: Action -->
        <span v-else-if="props.column.field === 'action'">
          <span>
            <b-dropdown
              variant="link"
              toggle-class="text-decoration-none"
              no-caret
            >
              <template v-slot:button-content>
                <feather-icon
                  icon="MoreVerticalIcon"
                  size="16"
                  class="text-body align-middle mr-25"
                />
              </template>
              <b-dropdown-item>
                <feather-icon
                  icon="Edit2Icon"
                  class="mr-50"
                />
                <span>Editar</span>
              </b-dropdown-item>
              <b-dropdown-item>
                <feather-icon
                  icon="TrashIcon"
                  class="mr-50"
                />
                <span>Eliminar</span>
              </b-dropdown-item>
            </b-dropdown>
          </span>
        </span>

        <!-- Column: Common -->
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>

      <!-- pagination -->
      <template
        slot="pagination-bottom"
        slot-scope="props"
      >
        <div class="d-flex justify-content-between flex-wrap">
          <div class="d-flex align-items-center mb-0 mt-1">
            <span class="text-nowrap ">
              Listar
            </span>
            <b-form-select
              v-model="serverParams.perPage"
              :options="['3','5','10']"
              class="mx-1"
              @input="(value)=>props.perPageChanged({currentPerPage:value})"
            />
            <span class="text-nowrap"> registros por página</span>
          </div>
          <div>
            <b-pagination
              :value="1"
              :total-rows="totalRecords"
              :per-page="serverParams.perPage"
              first-number
              last-number
              align="right"
              prev-class="prev-item"
              next-class="next-item"
              class="mt-1 mb-0"
              @input="(value)=>props.pageChanged({currentPage:value})"
            >
              <template #prev-text>
                <feather-icon
                  icon="ChevronLeftIcon"
                  size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                  icon="ChevronRightIcon"
                  size="18"
                />
              </template>
            </b-pagination>
          </div>
        </div>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import { inject } from '@vue/composition-api'
import {
  BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem, VBModal, BButton, BBadge,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'

export default {
  name: 'TableArticles',
  components: {
    VueGoodTable,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BDropdown,
    BDropdownItem,
    BButton,
    BBadge,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      dir: false,
      columns: [
        {
          label: 'Acción',
          field: 'action',
          width: '85px',
        },
        {
          label: 'Nombre',
          field: 'nombre',
          tdClass: 'align-middle',
        },
        {
          label: 'Tipo',
          field: 'nombreTipoProducto',
          tdClass: 'align-middle',
        },
        {
          label: 'Unidad',
          field: 'nombreGrupoUnidad',
          tdClass: 'align-middle',
        },
        {
          label: 'Precio Venta',
          field: 'precioVenta',
          tdClass: 'align-middle text-right',
          formatFn: value => `S/. ${value.toFixed(2)}`,
        },
        {
          label: 'Precio min. Venta',
          field: 'precioMinimoVenta',
          tdClass: 'align-middle text-right',
          formatFn: value => `S/. ${value.toFixed(2)}`,
        },
        {
          label: 'Stock min.',
          field: 'stockMinimo',
          tdClass: 'align-middle text-right',
        },
        {
          label: 'Stock max.',
          field: 'stockMaximo',
          tdClass: 'align-middle text-right',
        },
        {
          label: 'Estado',
          field: 'activo',
          tdClass: 'align-middle text-center',
        },
      ],
      searchTerm: '',
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
  setup() {
    const articles = inject('articles')
    const serverParams = inject('serverParams')
    const totalRecords = inject('totalRecords')
    const onPerPageChange = inject('onPerPageChange')
    const onPageChange = inject('onPageChange')
    const onColumnFilter = inject('onColumnFilter')
    const getDataProductTypes = inject('getDataProductTypes')
    const productTypes = inject('productTypes')
    const getDataUnitGroup = inject('getDataUnitGroup')
    const unitGroup = inject('unitGroup')

    const openModalArticle = async () => {
      const { data: dataProductTypes } = await getDataProductTypes()
      const { data: dataUnitGroup } = await getDataUnitGroup()
      productTypes.value = dataProductTypes
      unitGroup.value = dataUnitGroup
    }

    return {
      rows: articles,
      serverParams,
      totalRecords,
      onPerPageChange,
      onPageChange,
      onColumnFilter,
      openModalArticle,
    }
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-good-table.scss';
  th span,
  td span {
    font-size: 12px !important;
  }
  [dir] .vgt-table.condensed td, [dir] .vgt-table.condensed th.vgt-row-header {
    padding: 0.1em 0.4em;
  }
</style>
