import { defineStore } from 'pinia'

export const useMainStore = defineStore('mainStore', () => {
  const users = ref([])
  
  return { users }
})
