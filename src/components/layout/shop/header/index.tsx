import React from 'react'
import Topbar from './topbar.header'
import TopHeader from './header.header'
import Navigation from './navigation.header'

const Header = () => {
    return (
        <>
            <header className="bg-white border-b-[1px]">
                <Topbar />
                <TopHeader />
                <Navigation />
            </header>
        </>
    )
}

export default Header