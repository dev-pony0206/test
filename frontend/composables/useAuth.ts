export const useAuth = () => {
    const authorized = useAuthorized();
    const cookie = useCookie("token");
    const config = useRuntimeConfig()

    const signup = async (formData: any) => {
        try {
            const data: { id: string } = await $fetch(`${config.public.apiBase}/admin-signup/signup`, {
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
            const data: { accessToken: string } = await $fetch(`${config.public.apiBase}/admin-login/login`, {
                method: "POST",
                body: {
                    email,
                    password,
                },
            });
            if (data) {
                // localStorage.setUser()
                authorized.value = true;
                cookie.value = data.accessToken;
                const router = useRouter();
                router.push({ path: "/admin" });
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    const logout = () => {
        // setUser(null);
        cookie.value = null;
        localStorage.removeItem("user");
        const router = useRouter();
        router.push({ path: "/" });
    };

    return {
        signup,
        signIn,
        logout,
    };
};
