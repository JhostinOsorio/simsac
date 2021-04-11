import axiosIns from '@/libs/axios'

export default {
  namespaced: true,
  state: {
    user: (() => localStorage.getItem('_secret') || { usuario: null })(),
  },
  mutations: {
    handleLogin(state, payload) {
      localStorage.setItem('_secret', JSON.stringify(payload))
      axiosIns.defaults.headers.common.Authorization = `Bearer ${payload.token}`
      state.user = payload
    },
  },
  actions: {
    handleLogin({ commit }, payload) {
      commit('handleLogin', payload)
    },
  },
}
