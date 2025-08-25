export function useCustomRequest<T>(
    url: string,
    options: FetchOptions = {}
) {
    return useNuxtApp().$customFetch<T>(url, {
        ...options,
    })
}