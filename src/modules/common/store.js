import {defineStore} from 'pinia';

export const commonStore = defineStore('common', {
  state: () => ({
    loading: false,
    numberActiveRequests: 0
  }),
  getters: {
    isLoading: state => state.loading,
  },
  actions: {
    ADD_REQUEST() {
      this.numberActiveRequests++
      this.loading = true
    },
    REMOVE_REQUEST() {
      this.numberActiveRequests--
      if (this.numberActiveRequests < 0) this.numberActiveRequests = 0
      if (this.numberActiveRequests === 0) this.loading = false
    }
  },
});
