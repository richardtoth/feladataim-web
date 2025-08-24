// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    css: ['~/assets/css/main.css'],
    debug: true,

    modules: [
        '@nuxt/eslint',
        '@nuxt/scripts',
        '@nuxt/image',
        '@nuxt/ui',
    ],
    app: {
        pageTransition: {name: 'page', mode: 'out-in'}
    },
    runtimeConfig: {
        public: {
            apiUrl: process.env.PUBLIC_API_URL,
            baseUrl: process.env.PUBLIC_BASE_URL,
        }
    }
})