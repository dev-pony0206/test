<script lang="ts" setup>
import { useMainStore } from '~/store/main';
import { storeToRefs } from 'pinia';

const main = useMainStore()
const { admin }: any = storeToRefs(main)
const { pageStatus }: any = storeToRefs(main)

const auth = useAuth()

const goDashboard = () => {
    const router = useRouter()
    if (pageStatus.value == true) {
        router.push('/dashboard')
        pageStatus.value = false
        return
    }
    router.push('/userlist')
    pageStatus.value = true
}
const hiddenbutton = () => { return pageStatus.value == false ? "hidden" : "" }
</script>

<template>
    <div>
        <header>
            <nav class="w-full">
                <div class="flex w-full px-16 py-3 border-b-2 justify-between">
                    <div class="">
                        <img :src="admin.photo" class="" />
                    </div>
                    <div class="flex space-x-4 >* text-3xl">
                        <button class="bg-green-950 text-white rounded-md w-52" @click.prevent=""
                            :class="hiddenbutton()">ADD</button>
                        <button class="bg-amber-900 text-white rounded-md w-52" @click.prevent="goDashboard()">{{ pageStatus
                            == true ? "DASHBOARD" : "USERLIST" }}</button>
                        <button class="bg-red-950 text-white rounded-md w-52" @click.prevent="auth.logout()">LOGOUT</button>
                    </div>
                </div>
            </nav>
        </header>

        <main>
            <slot />
        </main>
    </div>
</template>
