"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardMedia, Paper } from '@mui/material'


interface BlogCardProps {
    featuredImage: string,
    title: string,
    excerpt: string,
    slug: string
}

const BlogCard: React.FC<BlogCardProps> = ({ featuredImage, title, excerpt, slug }) => {
    const router = useRouter()
    return (
        <>
            <Card component={Paper} className='h-full cursor-pointer !shadow-none post-card' onClick={() => router.push(`/blog/${slug}`)}>
                <CardMedia image={featuredImage} component="img" alt={title} />
                <CardContent className='flex flex-col gap-2 !p-0'>
                    <h5 className='font-[700] text-[18px]'>{title}</h5>
                    <p>{excerpt}</p>
                </CardContent>
            </Card>
        </>
    )
}

export default BlogCard