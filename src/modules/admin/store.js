import {defineStore} from 'pinia';

export const adminStore = defineStore('admin', {
  state: () => ({
    users: [],
  }),
  getters: {},
  actions: {},
});
