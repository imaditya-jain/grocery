"use client"

import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { ShopLayout } from '@/components'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { fetchPostsHandler } from '@/lib/features/post.features'
import { toast } from 'react-toastify'
import { PostArchiveSection } from '@/sections'

const Blog = () => {
    const dispatch = useAppDispatch()
    const { posts, error, loading, message } = useAppSelector((state) => state.post)
    const params = useParams()

    const page = typeof params.pageNo === 'string' ? params.pageNo : '1';

    useEffect(() => {
        dispatch(fetchPostsHandler(page))
    }, [dispatch, page])

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
                <PostArchiveSection posts={posts} limit={10} />
            </ShopLayout>
        </>
    )
}

export default Blog