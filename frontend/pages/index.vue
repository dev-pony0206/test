<script lang="ts" setup>
import type { SignInAdmin } from "~/types";

const signInUser: SignInAdmin = {
    email: "",
    password: "",
};
const toSignup = () => {
    const router = useRouter();
    router.push({ path: "/signup" });
};
// const signIn = useAuth();
</script>

<template>
    <div class="flex items-center justify-between px-80 bg-slate-800 h-screen">
        <div class="font-display text-7xl shadow-md text-yellow-600">Test</div>
        <div class="border-4 border-purple-900 rounded-3xl p-12 bg-blue-900">
            <form
                class="font-display space-y-4 >* w-80"
                @submit.prevent=""
            >
                <p class="text-white text-center text-5xl pb-4">Sign in</p>
                <label for="email" class="text-white text-2xl">Email</label>
                <input
                    class="block w-full h-10 rounded-xl"
                    type="email"
                    v-on:input="(e:any)=>signInUser.email=e.target.value"
                />
                <label for="password" class="text-white text-2xl">Password</label>
                <input
                    class="block w-full h-10 rounded-xl"
                    type="password"
                    v-on:input="(e:any)=>signInUser.password=e.target.value"
                />
                <button type="submit" class="text-white bg-purple-900 w-full border rounded-xl h-10">Sign in</button>
                <button
                    type="button"
                    class="text-white block bg-purple-900 w-full border rounded-xl h-10"
                    @click.prevent="toSignup"
                >
                    Have a Account?
                </button>
            </form>
        </div>
    </div>
</template>
