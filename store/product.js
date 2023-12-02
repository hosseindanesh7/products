export const state = () => ({
  categoriesList: [],
  merchantsList: [],
})
export const getters = {}
export const mutations = {
  SET_CATEGORIES(state, data) {
    state.categoriesList = data
  },
  SET_MERCHANTS(state, data) {
    state.merchantsList = data
  },
}
export const actions = {
  async getCategories({ state, commit }) {
    if (!state.categoriesList.length) {
      const response = await this.$axios.$get('/categories')
      commit('SET_CATEGORIES', response.data)
    }
  },
  async getMerchants({ state, commit }) {
    if (!state.merchantsList.length) {
      const response = await this.$axios.$get('/merchants')
      commit('SET_MERCHANTS', response.data)
    }
  },
}
