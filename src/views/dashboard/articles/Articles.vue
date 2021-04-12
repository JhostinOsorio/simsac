<template>
  <div>
    <modal-article />
    <b-card>
      <table-articles />
    </b-card>
  </div>
</template>

<script>
import { ref, provide } from '@vue/composition-api'
import { BCard } from 'bootstrap-vue'
import ModalArticle from './ModalArticle.vue'
import TableArticles from './TableArticles.vue'
import useArticles from './useArticles'

export default {
  name: 'Articles',
  components: {
    BCard,
    TableArticles,
    ModalArticle,
  },
  setup() {
    const articles = ref([])
    const productTypes = ref([])
    const unitGroup = ref([])
    const inventoryUnit = ref([])
    const unitSale = ref([])
    const initialSendArticles = {
      sku: '',
      productType: null,
      articleName: '',
      stock: false,
      service: false,
      unitGroup: null,
      inventoryUnit: null,
      unitSale: null,
      purchasePrice: null,
      salePrice: null,
      minimumSalePrice: null,
      minimumStock: null,
      maximumStock: null,
    }
    const sendArticles = ref({ ...initialSendArticles })
    const resetSendArticles = () => {
      sendArticles.value = { ...initialSendArticles }
    }
    const serverParams = ref({
      columnFilters: {

      },
      page: 1,
      perPage: 3,
    })
    const totalRecords = ref(0)
    const {
      getArticles, getProductTypes, getUnitGroup, getUnitsByGroup,
    } = useArticles()

    const getDataArticles = async () => {
      const { data } = await getArticles(serverParams.value)
      articles.value = data
      totalRecords.value = data.length
    }

    const getDataProductTypes = async () => {
      const info = await getProductTypes()
      return info
    }

    const getDataUnitGroup = async () => {
      const info = await getUnitGroup()
      return info
    }

    const getDataUnitsByGroup = async groupId => {
      const info = await getUnitsByGroup(groupId)
      return info
    }

    const updateParams = newProps => {
      serverParams.value = { ...serverParams.value, newProps }
    }

    const onPerPageChange = params => {
      updateParams({ perPage: params.currentPerPage })
      getDataArticles()
    }

    const onPageChange = params => {
      updateParams({ page: params.currentPage })
      getDataArticles()
    }

    const onColumnFilter = params => {
      console.log(params)
    }

    getDataArticles()

    provide('articles', articles)
    provide('totalRecords', totalRecords)
    provide('sendArticles', sendArticles)
    provide('resetSendArticles', resetSendArticles)
    provide('serverParams', serverParams)
    provide('onPerPageChange', onPerPageChange)
    provide('onPageChange', onPageChange)
    provide('onColumnFilter', onColumnFilter)
    provide('getDataProductTypes', getDataProductTypes)
    provide('productTypes', productTypes)
    provide('getDataUnitGroup', getDataUnitGroup)
    provide('unitGroup', unitGroup)
    provide('getDataUnitsByGroup', getDataUnitsByGroup)
    provide('inventoryUnit', inventoryUnit)
    provide('unitSale', unitSale)
  },
}
</script>

<style>

</style>
