import { SET_AUTH, SET_USER } from "@/store/mutations-type";

export default {
  namespaced: true,
  state: {
    isAuthenticated: false,
    user: null,
  },
  mutations: {
    [SET_AUTH](state, data) {
      state.isAuthenticated = data;
    },
    [SET_USER](state, data) {
      state.user = data;
    },
  },
  getters: {
    getUserAttribute: (state) => (attr) => state.user ? state.user[attr] : "",
  },
  actions: {
    async login({ commit, dispatch }, credentials) {
      const { token } = await this.$api.auth.login(credentials);
      this.$jwt.saveToken(token);
      this.$api.auth.setAuthHeader();
      commit(SET_AUTH, true);
      dispatch("getMe");
    },
    async logout({ commit }, sendRequest = true) {
      if (sendRequest) {
        await this.$api.auth.logout();
      }
      this.$jwt.destroyToken();
      this.$api.auth.setAuthHeader();
      commit(SET_AUTH, false);
      commit(SET_USER, null);
    },
    async getMe({ commit, dispatch }) {
      try {
        const data = await this.$api.auth.getMe();
        commit(SET_USER, data);
      } catch {
        dispatch("logout", false);
      }
    },
  },
};
