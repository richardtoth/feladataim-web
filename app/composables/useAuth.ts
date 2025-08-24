import type {LoginCredentials, RegisterData, User} from "~/types/auth";

export const useAuth = () => {
    const user = useState<User | null>('auth_user', () => null)
    const config = useRuntimeConfig()
    const router = useRouter()

    const getCsrfCookie = async () => {
        await $fetch('/sanctum/csrf-cookie', {
            baseURL: config.public.apiUrl,
            credentials: 'include',
        })
    }

    const login = async (credentials: LoginCredentials) => {
        await getCsrfCookie()
        await useCustomFetch('/login', {
            method: 'POST',
            body: credentials,
        })
        await fetchUser()
        if (user.value) {
            await router.push('/morning-planning')
        }
    }

    const register = async (data: RegisterData) => {
        await getCsrfCookie()
        await useCustomFetch('/register', {
            method: 'POST',
            body: data,
        })
        await fetchUser()
        if (user.value) {
            await router.push('/morning-planning')
        }
    }

    const logout = async () => {
        await useCustomFetch('/logout', { method: 'POST' })
        user.value = null
        console.log('User logged out')
        await router.push('/')
    }

    const fetchUser = async () => {
        try {
            const { data } = await useCustomFetch<User>('/user');
            user.value = data.value ?? null;
            console.log('user: ' + user.value)
        } catch {
            user.value = null;
            console.log('User not found')
        }
    }

    return {
        user,
        login,
        register,
        logout,
        fetchUser,
    }
}
