export const state = () => ({
  users: [],
  errors: []
})

export const mutations = {
  SET_USER_DATA(state, payload) {
    state.users = payload
  },
  SET_ERRORS(state, payload) {
    state.errors = payload
  }
}

export const actions = {
  getUserData({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.get('/users').then((response) => {
        commit('SET_USER_DATA', response.data.data)
        resolve()
      })
    })
  },
  storeUserData({ dispatch, commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/users', payload)
      .then(() => {
        dispatch('getUserData')
        resolve()
      })
      .catch((error) => {
        commit('SET_ERRORS', error.response.data)
      })
    })
  }
}
