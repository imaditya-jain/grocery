import React from 'react'
import Header from './header'
import Footer from './footer'

const ShopLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <main style={{ minHeight: "76.6vh" }}>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default ShopLayout