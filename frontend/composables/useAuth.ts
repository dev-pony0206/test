import { jwtDecode } from "jwt-decode";
import { storeToRefs } from 'pinia';

import { useMainStore } from '~/store/main'

export const useAuth = () => {
    const cookie = useCookie("token");
    const config = useRuntimeConfig()
    const main = useMainStore()
    const { admin } = storeToRefs(main)

    const signup = async (formData: any) => {
        try {
            // const router = useRouter();
            // router.push({ path: "/" });
            const data = await $fetch(`${config.public.apiBase}/signup/signup`, {
                method: "POST",
                body: formData,
            });
            if (data) {
                const router = useRouter();
                router.push({ path: "/" });
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    const signIn = async (email: string, password: string) => {
        try {
            // const router = useRouter();
            // router.push({ path: "/userlist" });
            const data: { token: string } = await $fetch(`${config.public.apiBase}/login`, {
                method: "POST",
                body: {
                    email,
                    password,
                },
            });
            if (data) {
                const decoded: any = jwtDecode(data.token);
                console.log('decoded =>', decoded)
                admin.value = decoded.admin
                localStorage.setItem('admin', JSON.stringify(data.token));
                cookie.value = data.token;
                const router = useRouter();
                router.push({ path: "/userlist" });
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    const logout = () => {
        admin.value = {}
        cookie.value = null;
        localStorage.removeItem("admin");
        const router = useRouter();
        router.push({ path: "/" });
    };

    return {
        signup,
        signIn,
        logout,
    };
};
