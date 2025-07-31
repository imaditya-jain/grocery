"use client"

import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface DocumentPropTypes {
    children: React.ReactNode
}

const Document: React.FC<DocumentPropTypes> = ({ children }) => {
    const pathname = usePathname()

    useEffect(() => {
        if (pathname.startsWith('/blog')) {
            document.body.classList.add('post')
        } else {
            document.body.classList.remove('post')
        }
    }, [pathname])
    return (
        <>{children}</>
    )
}

export default Document