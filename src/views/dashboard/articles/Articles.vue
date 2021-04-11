<template>
  <div>
    <modal-article />
    <b-card>
      <table-articles />
      <!-- <table-test /> -->
    </b-card>
  </div>
</template>

<script>
import { ref, provide } from '@vue/composition-api'
import { BCard } from 'bootstrap-vue'
import ModalArticle from './ModalArticle.vue'
import TableArticles from './TableArticles.vue'
import useArticles from './useArticles'
// import TableTest from './TableTest.vue'

export default {
  name: 'Articles',
  components: {
    BCard,
    TableArticles,
    ModalArticle,
    // TableTest,
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
    const { getArticles } = useArticles()

    const getData = async () => {
      const { data } = await getArticles(serverParams.value)
      articles.value = data
      totalRecords.value = data.length
    }

    const updateParams = newProps => {
      serverParams.value = { ...serverParams.value, newProps }
    }

    const onPerPageChange = params => {
      updateParams({ perPage: params.currentPerPage })
      getData()
    }

    const onPageChange = params => {
      updateParams({ page: params.currentPage })
      getData()
    }

    getData()
    // // load items is what brings back the rows from server
    // loadItems() {
    //   getFromServer(this.serverParams).then(response => {
    //      this.totalRecords = response.totalRecords;
    //      this.rows = response.rows;
    //   });
    // }

    provide('articles', articles)
    provide('totalRecords', totalRecords)
    provide('serverParams', serverParams)
    provide('onPerPageChange', onPerPageChange)
    provide('onPageChange', onPageChange)
  },
}
</script>

<style>

</style>
