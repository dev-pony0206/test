export default defineNuxtRouteMiddleware((to,from) => {
    if (!localStorage.admin && to.path !== '/' && to.path !== '/signup') {
        return navigateTo({ name: "index" }); 
    }
});
