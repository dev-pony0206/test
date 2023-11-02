import { defineStore } from 'pinia';

export const useMainStore = defineStore('mainStore', () => {
  const users = ref([{name:"sdf",score:67,age:33,editing:false}])
  const admin:any = ref({})
  const page = ref(1)
  const totalPages = ref(0)
  const pageStatus = ref(true)

  return { users, admin, page, totalPages, pageStatus }
})
