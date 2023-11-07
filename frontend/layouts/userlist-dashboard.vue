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
</script>

<template>
    <div>
        <header>
            <nav class="w-full">
                <div class="flex w-full px-16 py-3 border-b-2 justify-between">
                    <div class="flex justify-center items-center">
                        <img :src="admin.photo" class="w-10 h-10 mr-4 rounded-full" />
                        <p class="text-2xl font-bold">{{ admin.name }}</p>
                    </div>
                    <div class="flex space-x-4 >* text-3xl">
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
