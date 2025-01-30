"use client"

import { Grid2 } from '@mui/material'
import Image from 'next/image'
import React from 'react'

interface singlePostPropsTypes {
    featuredImage: string,
    excerpt: string,
    title: string
}

const SingleBlogHero: React.FC<singlePostPropsTypes> = ({ featuredImage, excerpt, title }) => {
    return (
        <>
            <section>
                <div className="container px-4 py-4 md:px-0 md:py-4">
                    <Grid2 container justifyContent={'flex-end'} spacing={2} alignItems={'center'} direction={{ xs: 'column-reverse', md: 'row' }}>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <div className='flex flex-col gap-5'>
                                <h1 className='font-[700] text-[2rem] md:text-[2.5rem] leading-10'>{title}</h1>
                                <p>{excerpt}</p>
                            </div>
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 5.5 }}>
                            <Image src={featuredImage} alt={title} />
                        </Grid2>
                    </Grid2>
                </div>
            </section>
        </>
    )
}

export default SingleBlogHero