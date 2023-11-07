import { defineStore } from 'pinia';

export const useMainStore = defineStore('mainStore', () => {
    const users = ref([])
    const allUsers = ref([])
    const admin: any = ref({})
    const page = ref(1)
    const totalPages = ref(1)
    const pageStatus = ref(true)

    return { users, admin, page, totalPages, pageStatus, allUsers }
})
