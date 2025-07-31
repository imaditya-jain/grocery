"use client"

import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAppSelector } from '@/lib/hooks'

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const [show, setShow] = useState(false)
    const pathname = usePathname()
    const { user, loading, error } = useAppSelector(state => state.auth)
    const router = useRouter()

    useEffect(() => {
        if (typeof window !== undefined) {
            setShow(true)
        }
    }, [])

    useEffect(() => {
        if (pathname === "/auth/login/") {
            if (user && !loading && !error) {
                if (user?.role === "admin") {
                    router.push("/admin/dashboard")
                } else {
                    router.push("/")
                }
            }
        }
    }, [pathname, user, loading, error, router])

    return (
        <>
            {
                show ? <main>
                    <section className='bg-primary'>
                        <div className="container-fluid p-4 md:p-0 min-h-[100vh]  w-full flex items-center justify-center">
                            <div className='w-[100%] md:w-[30rem]'>
                                <div className='mt-6'>
                                    <h1 className='font-[600] uppercase text-[23px] md:text-[32px] text-center'>Welcome To ClassyShop</h1>
                                </div>
                                <div className='w-full bg-white p-6 rounded-lg my-6'>
                                    {children}
                                </div>
                            </div>
                        </div>
                    </section>
                </main > : null
            }
        </>
    )
}

export default Layout