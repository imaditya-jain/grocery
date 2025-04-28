import IconBox from '@/components/cards/icon-box.cards'
import { Copyright, Send } from '@mui/icons-material'
import { Container, Grid } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    const services = [
        { id: 'footer-service-1', title: 'Free Shipping', description: "For all Orders Over $100", icon: '/assets/images/delivery.svg' },
        { id: 'footer-service-2', title: '30 Days Returns', description: "For an Exchange Product", icon: '/assets/images/return.svg' },
        { id: 'footer-service-3', title: 'Secured Payment', description: "Payment Cards Accepted", icon: '/assets/images/wallet.svg' },
        { id: 'footer-service-4', title: 'Special Gifts', description: "Our First Product Order", icon: '/assets/images/gift.svg' },
        { id: 'footer-service-5', title: 'Support 24/7', description: "Contact us Anytime", icon: '/assets/images/1.svg' }
    ]
    return (
        <>
            <footer className='border-t-[1px]'>
                <Container maxWidth="xl" className='!px-4'>
                    <div className='py-8 border-b-[2px]'>
                        <Grid container justifyContent='center'>
                            <Grid size={{ xs: 12, md: 11 }} container justifyContent={'center'}>
                                {
                                    services && Array.isArray(services) && services.length > 0 && services.map(service => <Grid key={service.id} size={{ xs: 6, sm: 4, md: 2.4 }}>
                                        <IconBox title={service.title} description={service.description} icon={service.icon} textAlign='center' iconAlign='center' />
                                    </Grid>)
                                }
                            </Grid>
                        </Grid>
                    </div>
                    <div className='py-8 border-b-[2px]'>
                        <Grid container justifyContent='center'>
                            <Grid size={{ xs: 12, md: 11 }} container spacing={2} justifyContent='center'>
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <div className='flex flex-col gap-6'>
                                        <div>
                                            <h4 className='font-[700] text-[20px]'>Contact Us</h4>
                                        </div>
                                        <div className='flex flex-col gap-4'>
                                            <address className='font-[400] text-[14] text-[#666]'>Classyshop - Mega Super Store
                                                507-Union Trade Centre
                                                France</address>
                                            <p><Link href="mailto:sales@yourcompany.com" legacyBehavior><a className='link font-[400] text-[14] text-[#666]'>sales@yourcompany.com</a></Link></p>
                                            <p><Link href="tel:+919876543210" legacyBehavior><a className='link font-[400] text-[14] text-[#666]'>(+91) 9876-543-210</a></Link></p>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <div className='flex flex-col gap-4'>
                                        <div>
                                            <h4 className='font-[700] text-[20px]'>Products</h4>
                                        </div>
                                        <div>
                                            <ul>
                                                <li><Link href="#" legacyBehavior><a className='link font-[400] text-[14] text-[#666]'>Price Drop</a></Link></li>
                                                <li><Link href="#" legacyBehavior><a className='link font-[400] text-[14] text-[#666]'>New Product</a></Link></li>
                                                <li><Link href="#" legacyBehavior><a className='link font-[400] text-[14] text-[#666]'>Best Sales</a></Link></li>
                                                <li><Link href="#" legacyBehavior><a className='link font-[400] text-[14] text-[#666]'>Contact Us</a></Link></li>
                                                <li><Link href="#" legacyBehavior><a className='link font-[400] text-[14] text-[#666]'>Sitemap</a></Link></li>
                                                <li><Link href="#" legacyBehavior><a className='link font-[400] text-[14] text-[#666]'>Stores</a></Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <div className='flex flex-col gap-4'>
                                        <div>
                                            <h4 className='font-[700] text-[20px]'>Our Company</h4>
                                        </div>
                                        <div>
                                            <ul>
                                                <li><Link href="#" legacyBehavior><a className='link font-[400] text-[14] text-[#666]'>Delivery</a></Link></li>
                                                <li><Link href="#" legacyBehavior><a className='link font-[400] text-[14] text-[#666]'>Legal Notice</a></Link></li>
                                                <li><Link href="#" legacyBehavior><a className='link font-[400] text-[14] text-[#666]'>Terms and Conditions of Use</a></Link></li>
                                                <li><Link href="#" legacyBehavior><a className='link font-[400] text-[14] text-[#666]'>About Us</a></Link></li>
                                                <li><Link href="#" legacyBehavior><a className='link font-[400] text-[14] text-[#666]'>Secure Payment</a></Link></li>
                                                <li><Link href="#" legacyBehavior><a className='link font-[400] text-[14] text-[#666]'>Login</a></Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <div className='flex flex-col gap-4'>
                                        <div>
                                            <h4 className='font-[700] text-[20px]'>Subscribe to newsletter</h4>
                                        </div>
                                        <div className='flex flex-col gap-4'>
                                            <p className='font-[400] text-[14] text-[#666]'>Subscribe to our latest newsletter to get news about special discounts.</p>
                                            <div className='newsletter'>
                                                <input type="email" name="email" id="email" placeholder='Email' />
                                                <button type="submit"><Send /></button>
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                    <div className='py-2'>
                        <p className='text-center text-[12px]'><Copyright className='text-[12px]' /> {new Date().getFullYear()} | All Rights Reserved.</p>
                    </div>
                </Container>
            </footer >
        </>
    )
}

export default Footer