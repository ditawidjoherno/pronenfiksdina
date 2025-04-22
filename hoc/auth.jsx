import { deleteCookie, getCookie } from '@/lib/cookieFunction'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import jwt from "jsonwebtoken"
import { isTokenExpired } from '@/lib/tokenFunction'

export default function withAuth(WrappedComponent, LoadingComponent) {
    const WithAuth = (props) => {
        const router = useRouter()
        const [loading, setLoading] = useState(true)
        const cookie = process.env.NEXT_PUBLIC_COOKIE_NAME

        useEffect(() => {
            const data = getCookie(cookie);
            console.log(cookie)
            console.log(data)
            if (!data) {
                router.push('/')
            } else {
                const decodedToken = jwt.decode(data)
                console.log(cookie)
                console.log(decodedToken)
                if (!decodedToken) {
                    router.push('/')
                } else {
                    const isExpired = isTokenExpired(data);
                    console.log(isExpired)
                    if (isExpired) {
                        deleteCookie(cookie)
                        router.push("/")
                    }
                }
                setLoading(false)
            }
        }, [router])

        if (loading) {
            return <LoadingComponent />
        }

        return <WrappedComponent {...props} />
    }

    WithAuth.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`

    return WithAuth
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}