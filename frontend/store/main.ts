import { defineStore } from 'pinia';

export const useMainStore = defineStore('mainStore', () => {
    const users = ref([{ name: "aaa", score: 67, age: 33, editing: false },
    { name: "bbb", score: 34, age: 53, editing: false },
    { name: "ccc", score: 65, age: 35, editing: false },
    { name: "ddd", score: 77, age: 24, editing: false },
    { name: "eee", score: 63, age: 41, editing: false },])
    const admin: any = ref({})
    const page = ref(1)
    const totalPages = ref(1)
    const pageStatus = ref(true)

    return { users, admin, page, totalPages, pageStatus }
})
