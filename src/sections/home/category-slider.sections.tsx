"use client"

import React from "react";
import { Box, Grid } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";

const CategorySlider = () => {
    return (
        <section id="category_slider">
            <Grid container justifyContent="center">
                <Grid size={11}>
                    <Box py={2}>
                        <Swiper
                            effect="coverflow"
                            loop={true}
                            grabCursor
                            centeredSlides={true}
                            slidesPerView="auto"
                            coverflowEffect={{
                                rotate: 0,
                                stretch: 80,
                                depth: 200,
                                modifier: 1,
                                slideShadows: false,
                            }}
                            pagination={{ clickable: true }}
                            modules={[EffectCoverflow, Pagination]}
                        >
                            <SwiperSlide>
                                <Box sx={{ width: 300, height: 200, bgcolor: "primary.main", display: "flex", justifyContent: "center", alignItems: "center", color: "#fff" }}>
                                    1
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box sx={{ width: 300, height: 200, bgcolor: "secondary.main", display: "flex", justifyContent: "center", alignItems: "center", color: "#fff" }}>
                                    2
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box sx={{ width: 300, height: 200, bgcolor: "success.main", display: "flex", justifyContent: "center", alignItems: "center", color: "#fff" }}>
                                    3
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box sx={{ width: 300, height: 200, bgcolor: "error.main", display: "flex", justifyContent: "center", alignItems: "center", color: "#fff" }}>
                                    4
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box sx={{ width: 300, height: 200, bgcolor: "warning.main", display: "flex", justifyContent: "center", alignItems: "center", color: "#fff" }}>
                                    5
                                </Box>
                            </SwiperSlide>
                        </Swiper>
                    </Box>
                </Grid>
            </Grid>
        </section>
    );
};

export default CategorySlider;
