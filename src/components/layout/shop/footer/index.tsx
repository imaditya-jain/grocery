import { Copyright } from '@mui/icons-material'
import { Grid2 } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <>
            <footer className='pt-8 pb-4'>
                <div className='container'>
                    <Grid2 container justifyContent={'center'}>
                        <Grid2 size={11} container spacing={2}>
                            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                                <div className='flex flex-col gap-4'>
                                    <div>
                                        <h4 className='font-[700] text-[20px]'>Quick Links</h4>
                                    </div>
                                    <div>
                                        <ul>
                                            <li><Link href="/" legacyBehavior><a className='link'>Home</a></Link></li>
                                            <li><Link href="/blog" legacyBehavior><a className='link'>Blog</a></Link></li>
                                            <li><Link href="/shop" legacyBehavior><a className='link'>Shop</a></Link></li>
                                            <li><Link href="/contact-us" legacyBehavior><a className='link'>Contact Us</a></Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                                <div className='flex flex-col gap-4'>
                                    <div>
                                        <h4 className='font-[700] text-[20px]'>Quick Links</h4>
                                    </div>
                                    <div>
                                        <ul>
                                            <li><Link href="/" legacyBehavior><a className='link'>Home</a></Link></li>
                                            <li><Link href="/blog" legacyBehavior><a className='link'>Blog</a></Link></li>
                                            <li><Link href="/shop" legacyBehavior><a className='link'>Shop</a></Link></li>
                                            <li><Link href="/contact-us" legacyBehavior><a className='link'>Contact Us</a></Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                                <div className='flex flex-col gap-4'>
                                    <div>
                                        <h4 className='font-[700] text-[20px]'>Quick Links</h4>
                                    </div>
                                    <div>
                                        <ul>
                                            <li><Link href="/" legacyBehavior><a className='link'>Home</a></Link></li>
                                            <li><Link href="/blog" legacyBehavior><a className='link'>Blog</a></Link></li>
                                            <li><Link href="/shop" legacyBehavior><a className='link'>Shop</a></Link></li>
                                            <li><Link href="/contact-us" legacyBehavior><a className='link'>Contact Us</a></Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                                <div className='flex flex-col gap-4'>
                                    <div>
                                        <h4 className='font-[700] text-[20px]'>Quick Links</h4>
                                    </div>
                                    <div>
                                        <ul>
                                            <li><Link href="/" legacyBehavior><a className='link'>Home</a></Link></li>
                                            <li><Link href="/blog" legacyBehavior><a className='link'>Blog</a></Link></li>
                                            <li><Link href="/shop" legacyBehavior><a className='link'>Shop</a></Link></li>
                                            <li><Link href="/contact-us" legacyBehavior><a className='link'>Contact Us</a></Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </Grid2>
                            <Grid2 size={12} className="border-[#aeaeae] border-t-[1px] pt-4">
                                <p className='text-center'><small><Copyright />{new Date().getFullYear()} | All rights reserved.</small></p>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </div>
            </footer >
        </>
    )
}

export default Footer