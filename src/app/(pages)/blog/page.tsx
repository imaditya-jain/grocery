"use client"

import React, { useEffect } from 'react'
import { BlogLayout, ShopLayout } from '@/components'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { fetchPostsHandler } from '@/lib/features/post.features'
import { toast } from 'react-toastify'


const Blog = () => {
    const dispatch = useAppDispatch()
    const { posts, error, loading, message } = useAppSelector((state) => state.post)

    useEffect(() => {
        dispatch(fetchPostsHandler('1'))
    }, [dispatch])

    useEffect(() => {
        if (message && !loading) {
            if (error) {
                toast.error(message)
            }
        }
    }, [error, message, loading])

    return (
        <>
            <ShopLayout>
                <BlogLayout page='archive' posts={posts} limit={10} title='' content='' featuredImage='' />
            </ShopLayout>
        </>
    )
}

export default Blog