<template>
  <div>
    <b-card>
      <b-button
        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
        v-b-modal.modal-primary
        variant="outline-primary"
      >
        Primary
      </b-button>
      <table-articles />
    </b-card>
    <modal-article />
  </div>
</template>

<script>
import { BButton, BCard, VBModal } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import ModalArticle from './ModalArticle.vue'
import TableArticles from './TableArticles.vue'
import useArticles from './useArticles'

export default {
  name: 'Articles',
  components: {
    BButton,
    BCard,
    TableArticles,
    ModalArticle,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
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
