"use client"

import Image from 'next/image'
import React from 'react'

interface singlePostPropsTypes {
    featuredImage: string,
    title: string
}

const SingleBlogHero: React.FC<singlePostPropsTypes> = ({ featuredImage, title }) => {
    return (
        <>
            <section>
                <div className="container">
                    <div className='flex flex-col gap-5'>
                        <h1 className='font-[700] text-[1.5rem] md:text-[2rem] leading-10'>{title}</h1>
                        <Image fill src={featuredImage} alt={title} className='img-fluid !static' />
                    </div>
                </div>
            </section>
        </>
    )
}

export default SingleBlogHero