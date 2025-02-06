"use client"

import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { BlogLayout, ShopLayout, SEOHead } from '@/components'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { fetchPostHandler } from '@/lib/features/post.features'
import { toast } from 'react-toastify'

const SingleBlog = () => {
    const dispatch = useAppDispatch()
    const params = useParams()

    const slug = typeof params.slug === 'string' ? params.slug : '';

    const { post, error, message, loading } = useAppSelector((state) => state.post)

    useEffect(() => {
        if (slug) {
            dispatch(fetchPostHandler(slug))
        }
    }, [slug, dispatch])

    useEffect(() => {
        if (message && !loading) {
            if (error) {
                toast.error(message)
            }
        }
    }, [message, loading, error])

    return (
        <>
            <ShopLayout>
                {
                    post && <>
                        <SEOHead title={post?.title || "Loading..."} description={post?.seo?.metaDescription || "Read our latest blog post"} />
                        <BlogLayout page='detailed' posts={[]} limit={0} content={post.content} featuredImage={post?.media?.featuredImage} title={post?.title} />
                    </>
                }
            </ShopLayout>
        </>
    )
}

export default SingleBlog