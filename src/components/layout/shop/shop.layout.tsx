import React from 'react'
import Header from './header'

const ShopLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <main className='bg-[#f5f0f0]'>
                {children}
            </main>
        </>
    )
}

export default ShopLayout