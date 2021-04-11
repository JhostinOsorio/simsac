<template>
  <div>
    <modal-article />
    <b-card>
      <table-articles />
    </b-card>
  </div>
</template>

<script>
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
  async created() {
    const { getArticles } = useArticles()
    await getArticles()
    // console.log(info)
  },
}
</script>

<style>

</style>
