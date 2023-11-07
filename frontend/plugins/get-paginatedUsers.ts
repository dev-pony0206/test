export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook("page:finish", async () => {
        const users = useUsers();
        const cookie = useCookie('token')
        if (cookie.value && window.location.pathname == '/userlist') {
            await users.getUsers()
        }
    });
});
