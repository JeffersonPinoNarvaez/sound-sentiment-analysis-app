import { createStore } from 'vuex'

const store = createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
    theme: 'light',
    userToken: null,
  },
  getters: {
    isAuth: state => !!state.userToken,
    getUserToken: state => state.userToken,
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
    setUserToken(state, token) {
      state.userToken = token;
      localStorage.setItem('userToken', token); // Save token to localStorage
    },
    removeUserToken(state) {
      state.userToken = null;
      localStorage.removeItem('userToken'); // Remove token from localStorage
    },
    setAuthentication(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    checkAuthentication(context) {
      const isAuthenticated = !!localStorage.getItem('authToken');
      context.commit('setAuthentication', isAuthenticated);
    }
  },
  actions: {
    loginUser({ commit }, token) {
      commit('setUserToken', token);
    },
    logoutUser({ commit }) {
      commit('removeUserToken');
    },
    checkAuthentication({ commit }) {
      const isAuthenticated = !!localStorage.getItem('userToken');
      commit('setAuthentication', isAuthenticated);
    },
  },

  modules: {},
})

store.dispatch('checkAuthentication'); // Dispatch the checkAuthentication action during store initialization

export default store;
