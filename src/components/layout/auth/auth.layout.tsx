"use client"

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const pathname = usePathname()
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (typeof window !== undefined) {
            setShow(true)
        }
    }, [])

    return (
        <>
            {
                show ? <main>
                    <section className='bg-primary'>
                        <div className="container p-4 md:p-0 min-h-[100vh]  w-full flex items-center justify-center">
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