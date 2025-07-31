"use client"

import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { BlogLayout } from '@/components'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { fetchPostsHandler } from '@/lib/features/post.features'
import { toast } from 'react-toastify'

const ShopBLOGSection = () => {
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch()
    const { posts, totalPages, currentPage, message, loading, error } = useAppSelector((state) => state.post);

    useEffect(() => {
        const page = searchParams.get("page");

        if (page) {
            dispatch(fetchPostsHandler(page));
        } else {
            dispatch(fetchPostsHandler('1'));
        }
    }, [searchParams, dispatch])

    useEffect(() => {
        if (message && !loading) {
            if (error) {
                toast.error(message)
            }
        }
    }, [error, message, loading])

    return (
        <>
            <BlogLayout page='archive' posts={posts} limit={10} totalPages={totalPages} current_page={currentPage} title='' content='' featuredImage='' />
        </>
    )
}

export default ShopBLOGSection