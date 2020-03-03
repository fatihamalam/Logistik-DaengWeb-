export const state = () => ({
  users: [],
  data: [],
  errors: [],
  page: 1
})

export const mutations = {
  SET_USER_DATA(state, payload) {
    state.users = payload
  },
  SET_ERRORS(state, payload) {
    state.errors = payload
  },
  SET_PAGE(state, payload) {
    state.page = payload
  },
  SET_DATA(state, payload) {
    state.data = payload
  }
}

export const actions = {
  getUserData({ commit, state }, payload) {
    let search = payload ? payload:''
    return new Promise((resolve, reject) => {
      this.$axios.get(`/users?q=${search}&page=${state.page}`).then((response) => {
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
  },
  getData({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.get(`/users/${payload}`)
      .then((response) => {
        commit('SET_DATA', response.data.data)
        resolve()
      })
    })
  },
  updateUserData({ dispatch, commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.put(`/users/${payload.id}`, payload)
      .then(() => {
        dispatch('getUserData')
        resolve()
      })
      .catch((error) => {
        commit('SET_ERRORS', error.response.data)
      })
    })
  },
  destroyUserData({ dispatch, commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.delete(`/users/${payload}`)
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
