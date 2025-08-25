import type {ApiError} from "~/types/apiError";

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()
    const csrfToken = useCookie('XSRF-TOKEN')

    const $customFetch = $fetch.create({
        baseURL: config.public.apiUrl,
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            Referer: config.public.baseUrl,
        },
        onRequest({options}) {
            if (import.meta.server && nuxtApp.ssrContext?.event) {
                const cookies = nuxtApp.ssrContext.event.node.req.headers.cookie
                if (cookies) {
                    options.headers.set('cookie', cookies)
                }
            }
            if (csrfToken.value) {
                options.headers.set('X-XSRF-TOKEN', csrfToken.value)
            }
        },
        onResponse() {

        },
        async onResponseError({response}) {
            if (response.status === 401) {
                return
            }
            const toast = useToast()
            const errorData = response._data as ApiError

            toast.add({
                title: 'Hiba',
                description: errorData.message || 'Ismeretlen hiba történt',
                color: 'error',
            })
        },
    })

    return {
        provide: {
            customFetch: $customFetch,
        },
    }
})
