export default defineNuxtRouteMiddleware(async (to) => {
    const { authenticatedUser, fetchUser } = useAuth()

    const protectedRoutes = ['/overview', '/morning-planning', '/informations', '/todays-tasks']

    if (!authenticatedUser.value) {
        try {
            await fetchUser()
        } catch {
            authenticatedUser.value = null
        }
    }

    if (!authenticatedUser.value && protectedRoutes.includes(to.path)) {
        return navigateTo('/login')
    }

    const guestOnlyRoutes = ['/login', '/registration']
    if (authenticatedUser.value && guestOnlyRoutes.includes(to.path)) {
        return navigateTo('/morning-planning')
    }
})
