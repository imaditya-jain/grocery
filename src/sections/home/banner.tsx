"use client"

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Box, Grid2 } from '@mui/material';

const Banner = () => {
    return (
        <>
            <section>
                <Box py={{ xs: 2, md: 4 }} px={{ xs: 2, md: 0 }} className="container">
                    <Grid2 container spacing={{ xs: 2, md: 4 }} justifyContent={'center'}>
                        <Grid2 size={{ xs: 12, md: 11 }} container>
                            <Grid2 size={{ xs: 12, md: 9 }}>
                                <Swiper autoplay={{ delay: 2500, disableOnInteraction: false, }} loop pagination={{ clickable: true }} navigation={true} modules={[Pagination, Navigation, Autoplay]} className="mySwiper">
                                    <SwiperSlide>
                                        <img src='/assets/images/h1.jpg' alt='hero' className='img-fluid w-full h-full rounded-md heroImg' />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img src='/assets/images/h2.jpg' alt='hero' className='img-fluid w-full h-full rounded-md heroImg' />
                                    </SwiperSlide>
                                </Swiper>
                            </Grid2>
                            <Grid2 size={{ xs: 12, md: 3 }} container spacing={{ xs: 2, md: 4 }}>
                                <Grid2 size={12}>
                                    <img src='/assets/images/h3.jpg' alt='hero' className='img-fluid w-full h-full rounded-md heroImg' />
                                </Grid2>
                                <Grid2 size={12}>
                                    <img src='/assets/images/h4.jpg' alt='hero' className='img-fluid w-full h-full rounded-md heroImg' />
                                </Grid2>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </Box>
            </section>
        </>
    )
}

export default Banner