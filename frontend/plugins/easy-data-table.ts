import Vue3EasyDataTable from 'vue3-easy-data-table'

export default defineNuxtPlugin( ( nuxtApp ) => {
    nuxtApp.vueApp.component( 'EasyDataTable', Vue3EasyDataTable )
} )
