export default defineNuxtRouteMiddleware(async (to) => {
    const { user, fetchUser } = useAuth()

    const protectedRoutes = ['/overview', '/morning-planning', '/informations', '/todays-tasks']

    if (protectedRoutes.includes(to.path) && !user.value) {
        try {
            await fetchUser()
        } catch {
            user.value = null
        }
    }

    if (!user.value && protectedRoutes.includes(to.path)) {
        return navigateTo('/login')
    }

    const guestOnlyRoutes = ['/login', '/registration']
    if (user.value && guestOnlyRoutes.includes(to.path)) {
        return navigateTo('/morning-planning')
    }
})
