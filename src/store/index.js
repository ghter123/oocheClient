import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null,
    token: '',
    wxUserInfo: null,
    entryUrl: '',
    router: []
  },
  mutations: {
    updateUser(state, user) {
      state.user = user
    },
    updateRouter(state, router) {
      state.router = router
    },
    updatewxUserInfo(state, wxUserInfo) {
      state.wxUserInfo = wxUserInfo
    },
    updateToken(state, token) {
      state.token = token
    },
    updateEntryUrl(state, entryUrl) {
      state.entryUrl = entryUrl
    }
  }
})

export default store
