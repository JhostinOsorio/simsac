<template>
  <div>
    <modal-article />
    <modal-search-article />
    <b-card>
      <table-articles />
    </b-card>
  </div>
</template>

<script>
import { ref, provide } from '@vue/composition-api'
import { BCard } from 'bootstrap-vue'
import ModalArticle from './ModalArticle.vue'
import ModalSearchArticle from './ModalSearchArticle.vue'
import TableArticles from './TableArticles.vue'
import useArticles from './useArticles'

export default {
  name: 'Articles',
  components: {
    BCard,
    ModalArticle,
    ModalSearchArticle,
    TableArticles,
  },
  setup() {
    const loadingArticles = ref(false)
    const articles = ref([])
    const initialArticle = {
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
      features: [],
    }
    const article = ref({ ...initialArticle })
    const productTypes = ref([])
    const unitGroup = ref([])
    const inventoryUnit = ref([])
    const unitSale = ref([])
    const allFeatures = ref([])
    const allValuesByFeature = ref([])

    const resetArticle = () => {
      article.value = { ...initialArticle }
    }
    const serverParams = ref({
      columnFilters: {
        field: '',
        value: '',
      },
      page: 1,
      perPage: 10,
    })
    const totalRecords = ref(0)
    const {
      getArticles, getProductTypes, getUnitGroup, getUnitsByGroup, getFeatures, getValuesByFeature,
    } = useArticles()

    const getDataArticles = async () => {
      loadingArticles.value = true
      const { data, error } = await getArticles(serverParams.value)
      if (error) {
        console.log('error')
      } else {
        articles.value = data
        totalRecords.value = 32 // data.length * 5
      }
      loadingArticles.value = false
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

    const getDataFeatures = async () => {
      const info = await getFeatures()
      return info
    }

    const getDataValuesByFeature = async featureId => {
      const info = await getValuesByFeature(featureId)
      return info
    }

    const updateParams = newProps => {
      serverParams.value = { ...serverParams.value, ...newProps }
    }

    const onPerPageChange = params => {
      updateParams({ perPage: Number(params.currentPerPage) })
      console.log(serverParams.value)
      getDataArticles()
    }

    const onPageChange = params => {
      updateParams({ page: Number(params.currentPage) })
      console.log(serverParams.value)
      getDataArticles()
    }

    getDataArticles()

    provide('articles', articles)
    provide('loadingArticles', loadingArticles)
    provide('totalRecords', totalRecords)
    provide('article', article)
    provide('resetArticle', resetArticle)
    provide('serverParams', serverParams)
    provide('onPerPageChange', onPerPageChange)
    provide('onPageChange', onPageChange)
    provide('getDataProductTypes', getDataProductTypes)
    provide('productTypes', productTypes)
    provide('getDataUnitGroup', getDataUnitGroup)
    provide('unitGroup', unitGroup)
    provide('getDataUnitsByGroup', getDataUnitsByGroup)
    provide('inventoryUnit', inventoryUnit)
    provide('unitSale', unitSale)
    provide('getDataFeatures', getDataFeatures)
    provide('allFeatures', allFeatures)
    provide('getDataValuesByFeature', getDataValuesByFeature)
    provide('allValuesByFeature', allValuesByFeature)
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
</style>
