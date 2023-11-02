export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook("page:finish", () => {
        const users = useUsers();
        console.log("testing plugin")
        if (localStorage.admin && window.location.pathname == '/userlist' ) {
            users.getUsers()
        }
    });
});
