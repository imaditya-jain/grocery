"use client";

import React from "react";
import dynamic from "next/dynamic";

const Slider = dynamic(() => import("react-slick").then((mod) => mod.default), { ssr: false });

interface Props {
    settings: {
        dots: boolean;
        infinite: boolean;
        speed: number;
        slidesToShow: number;
        slidesToScroll: number;
        initialSlide: number;
        responsive: Array<{
            breakpoint: number;
            settings: {
                slidesToShow: number;
                slidesToScroll: number;
                infinite?: boolean;
                dots?: boolean;
                initialSlide?: number;
            };
        }>;
    };
    children: React.ReactNode;
}





const CustomSlider: React.FC<Props> = ({ settings, children }) => {
    return (
        <>
            <div className="slider-container">
                <Slider {...settings}>
                    {children}
                </Slider>
            </div>
        </>
    )
}

export default CustomSlider