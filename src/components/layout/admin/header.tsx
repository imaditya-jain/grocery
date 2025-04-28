"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Container, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { Menu, Logout } from "@mui/icons-material"
import { CustomDrawer, CustomPopover } from '@/components'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { logoutHandler } from '@/lib/features/auth.features'
import Sidebar from './sidebar'

const AdminLayout = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { isAuthenticated, user, error, message } = useAppSelector((state) => state.auth)
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const toggleMenuDrawer = (newOpen: boolean) => {
        setOpen(newOpen);
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const openPopover = Boolean(anchorEl);
    const id = open ? 'simple-popover' : '';

    const anchorOrigin = {
        vertical: 'bottom' as "top" | "bottom",
        horizontal: 'left' as "left" | "right" | "center",
    };

    const handleUserLogout = () => {
        dispatch(logoutHandler({}))
    }

    useEffect(() => {
        if (!user && !isAuthenticated && message && !error) {
            router.push('/auth/login')
        }
    }, [router, user, isAuthenticated, message, error])
    return (
        <>
            <header className="bg-[#222a2c] fixed top-0 left-0 right-0 z-50">
                <Container maxWidth="xl" className="flex items-center">
                    <div className="flex items-center gap-4 py-3">
                        <button onClick={() => setOpen(true)} className="block md:hidden"><Menu className="text-white" /></button>
                        <h3 className="text-white tracking-widest">CLASSYSHOP</h3>
                    </div>
                    <div className="grow" />
                    <div>
                        <button aria-describedby={id} onClick={handleClick} className='text-white'>{user && isAuthenticated && `${user?.firstName} ${user.lastName}` || user?.email}</button>
                        <CustomPopover open={openPopover} id={id?.toString()} anchorEl={anchorEl} handleClose={handleClose} anchorOrigin={anchorOrigin}>
                            <Box py={1} sx={{ width: 200 }}>
                                <List className="!p-0 !m-0">
                                    <ListItemButton onClick={handleUserLogout}>
                                        <ListItemIcon><Logout /></ListItemIcon>
                                        <ListItemText primary="Log Out" />
                                    </ListItemButton>
                                </List>
                            </Box>
                        </CustomPopover>
                    </div>
                </Container>
            </header>
            <CustomDrawer open={open} toggleDrawer={toggleMenuDrawer}><Sidebar /></CustomDrawer>
        </>
    )
}

export default AdminLayout