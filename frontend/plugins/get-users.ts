export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook("page:finish", () => {
        const authorized = useAuthorized();
        if (authorized.value || localStorage.user) {
            // posts.getPosts();
            // profile.getProfile();
        }
    });
});
