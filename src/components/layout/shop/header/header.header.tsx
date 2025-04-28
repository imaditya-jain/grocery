"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import CustomDrawer from '../../../drawers/custom.drawers';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Badge, Box, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from "@mui/material"
import { ShoppingCart, CompareOutlined, FavoriteOutlined, Menu, Logout, } from "@mui/icons-material";
import { logoutHandler } from '@/lib/features/auth.features';
import { CustomPopover } from '@/components/';
import Search from './search.header';

const Header = () => {
    const router = useRouter()
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const { isAuthenticated, user, error, message } = useAppSelector((state) => state.auth)
    const [openMenuDrawer, setOpenMenuDrawer] = useState(false)
    const dispatch = useAppDispatch()

    const toggleMenuDrawer = (newOpen: boolean) => {
        setOpenMenuDrawer(newOpen);
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
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
            <div className="py-3 border-gray-300 border-b-[1px]">
                <Grid container justifyContent="center">
                    <Grid container spacing={2} size={11} alignItems="center">
                        <Grid size={{ xs: 1.5, md: 0 }} className="block md:hidden">
                            <IconButton onClick={() => setOpenMenuDrawer(true)}>
                                <Menu />
                            </IconButton>
                        </Grid>
                        <Grid size={{ xs: 5.5, md: 3 }} order={1}>
                            <Link href="/">
                                <Image
                                    src="/assets/images/logo.png"
                                    alt="logo"
                                    width={150}
                                    height={50}
                                    priority={true}
                                    className="max-w-full h-auto"
                                />
                            </Link>
                        </Grid>
                        <Grid size={{ xs: 12, md: 5 }} order={{ xs: 3, md: 2 }}>
                            <Search />
                        </Grid>
                        <Grid size={{ xs: 5, md: 4 }} order={{ xs: 2, md: 3 }}>
                            <ul className="flex items-center justify-end gap-1 sm:gap-3">
                                <li className="hidden sm:block">
                                    {
                                        !user && !isAuthenticated ? <>
                                            <Link
                                                href="/auth/login/"
                                                className="link transition text-[15px] font-[500]"
                                            >
                                                Login
                                            </Link>{" "}
                                            |{" "}
                                            <Link
                                                href="/auth/register/"
                                                className="link transition text-[15px] font-[500]"
                                            >
                                                Register
                                            </Link>
                                        </> : <>
                                            <button aria-describedby={id} onClick={handleClick}>{user && isAuthenticated && `${user?.firstName} ${user.lastName}` || user?.email}</button>
                                            <CustomPopover open={open} id={id?.toString()} anchorEl={anchorEl} handleClose={handleClose} anchorOrigin={anchorOrigin}>
                                                <Box py={1} sx={{ width: 200 }}>
                                                    <List className="!p-0 !m-0">
                                                        <ListItem className="!p-0 !m-0">
                                                            <ListItemButton onClick={handleUserLogout}>
                                                                <ListItemIcon><Logout /></ListItemIcon>
                                                                <ListItemText primary="Log Out" />
                                                            </ListItemButton>
                                                        </ListItem>
                                                    </List>
                                                </Box>
                                            </CustomPopover>
                                        </>
                                    }
                                </li>
                                <li>
                                    <Tooltip title="Compare">
                                        <IconButton aria-label="cart">
                                            <Badge badgeContent={4} color="secondary">
                                                <CompareOutlined className="text-[#1f1f1f] !text-[20px] md:!text-[25px]" />
                                            </Badge>
                                        </IconButton>
                                    </Tooltip>
                                </li>
                                <li>
                                    <Tooltip title="Wishlist">
                                        <IconButton aria-label="cart">
                                            <Badge badgeContent={4} color="secondary">
                                                <FavoriteOutlined className="text-[#1f1f1f] !text-[20px] md:!text-[25px]" />
                                            </Badge>
                                        </IconButton>
                                    </Tooltip>
                                </li>
                                <li>
                                    <Tooltip title="Cart">
                                        <IconButton aria-label="cart">
                                            <Badge badgeContent={4} color="secondary">
                                                <ShoppingCart className="text-[#1f1f1f] !text-[20px] md:!text-[25px]" />
                                            </Badge>
                                        </IconButton>
                                    </Tooltip>
                                </li>
                            </ul>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <CustomDrawer open={openMenuDrawer} toggleDrawer={toggleMenuDrawer}>Navigation</CustomDrawer>
        </>
    )
}

export default Header