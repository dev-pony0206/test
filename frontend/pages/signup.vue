<script lang="ts" setup>
definePageMeta({
    // middleware:["only-signup"]
});
import type { SignupAdmin } from "~/types";

const signupUser: SignupAdmin = {
    username: "",
    email: "",
    password: "",
    photo: null,
};

const avatarUrl = () => useState<any>("url", () => "_nuxt/assets/image/userAccount.png");

const url = avatarUrl();

const file = ref();

const chooseFile = () => {
    signupUser.photo = file.value.files[0];
    url.value = URL.createObjectURL(signupUser.photo);
};

const submit = () => {
    const formData = new FormData();
    formData.append("username", signupUser.username);
    formData.append("email", signupUser.email);
    formData.append("password", signupUser.password);
    formData.append("avatar", signupUser.photo);
    // const signup = useAuth();
    // signup.signup(formData);
    url.value = "_nuxt/assets/image/userAccount.png";
};
</script>

<template>
    <div class="flex items-center justify-between px-80 bg-slate-800 h-screen">
        <div class="font-display text-7xl shadow-md text-yellow-600">Test</div>
        <div class="border-4 border-purple-900 rounded-3xl p-12 bg-blue-900">
            <form class="font-display space-y-4 > * w-80" @submit.prevent="submit">
                <p class="text-white text-center text-5xl pb-4">Sign up</p>
                <div class="relative">
                    <div class="flex justify-center">
                        <input
                            type="file"
                            class="w-36 h-36 rounded-full border opacity-0 z-10"
                            @change="chooseFile"
                            ref="file"
                        />
                    </div>
                    <div class="w-full absolute top-0">
                        <img :src="url" class="w-36 h-36 rounded-full border mx-auto" />
                    </div>
                </div>
                <label for="name" class="text-white text-2xl">Name</label>
                <input class="block w-full h-10 rounded-xl" type="text" name="name" v-model="signupUser.username" />
                <label for="email" class="text-white text-2xl">Email</label>
                <input class="block w-full h-10 rounded-xl" type="email" name="email" v-model="signupUser.email" />
                <label for="password" class="text-white text-2xl">Password</label>
                <input
                    class="block w-full h-10 rounded-xl"
                    type="password"
                    name="password"
                    v-model="signupUser.password"
                />
                <label for="confirm_password" class="text-white text-2xl">Confirm Password</label>
                <input class="block w-full h-10 rounded-xl" type="password" name="confirm_password" />
                <button type="submit" class="text-white bg-purple-900 w-full border rounded-xl h-10">Sign up</button>
            </form>
        </div>
    </div>
</template>
