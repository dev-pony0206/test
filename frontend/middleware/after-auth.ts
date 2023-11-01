export default defineNuxtRouteMiddleware((to,from) => {
    const cookie = useCookie('token')
    if (!cookie.value && to.path !== '/' && to.path !== '/signup') {
        return navigateTo({ name: "index" }); 
    }
});
