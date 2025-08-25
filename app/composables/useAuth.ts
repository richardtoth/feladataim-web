import type {LoginCredentials, RegisterData, User} from "~/types/auth";

export const useAuth = () => {
    const authenticatedUser = useState<User | null>('auth_user', () => null)
    const router = useRouter()

    const setUserData = (user: User | null) => {
        authenticatedUser.value = user ?? null;
    };

    const clearUserData = () => {
        authenticatedUser.value = null;
    };

    const getCsrfCookie = async () => {
        await useCustomRequest('/sanctum/csrf-cookie', {})
    }

    const login = async (credentials: LoginCredentials) => {
        await getCsrfCookie()
        await useCustomRequest('/login', {
            method: 'POST',
            body: credentials,
        })
        const user = await useCustomRequest<User>('/user')
        setUserData(user)
        await router.push('/morning-planning')
    }

    const register = async (data: RegisterData) => {
        await getCsrfCookie()
        await useCustomRequest('/register', {
            method: 'POST',
            body: data,
        })
        const user = await useCustomRequest<User>('/user')
        setUserData(user)
        await router.push('/morning-planning')
    }

    const logout = async () => {
        await useCustomRequest('/logout', {method: 'POST'})
        clearUserData()
        console.log('User logged out')
        await router.push('/')
    }

    const fetchUser = async () => {
        try {
            const {data} = await useCustomFetch<User>('/user')
            const userData = data.value ?? null
            if (userData) {
                setUserData(userData)
            }
        } catch {
            clearUserData()
        }
    }

    return {
        authenticatedUser,
        login,
        register,
        logout,
        fetchUser,
    }
}
