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
    const serverParams = ref({
      columnFilters: {

      },
      page: 1,
      perPage: 3,
    })
    const totalRecords = ref(0)
    const { getArticles, getTipoProducto } = useArticles()

    const getDataArticles = async () => {
      const { data } = await getArticles(serverParams.value)
      articles.value = data
      totalRecords.value = data.length
    }

    const getDataTipoProducto = async () => {
      const { data } = await getTipoProducto()
      console.log(data)
    }

    const updateParams = newProps => {
      serverParams.value = { ...serverParams.value, newProps }
    }

    const onPerPageChange = params => {
      console.log(params)
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
    provide('serverParams', serverParams)
    provide('onPerPageChange', onPerPageChange)
    provide('onPageChange', onPageChange)
    provide('onColumnFilter', onColumnFilter)
    provide('getDataTipoProducto', getDataTipoProducto)
  },
}
</script>

<style>

</style>
