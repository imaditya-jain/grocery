"use client"

import React, { useEffect } from 'react'
import { Grid2 } from '@mui/material'
import { BlogCard, ShopLayout } from '@/components'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { fetchPostsHandler } from '@/lib/features/post.features'
import { toast } from 'react-toastify'

const Blog = () => {
    const dispatch = useAppDispatch()
    const { posts, error, loading, message } = useAppSelector((state) => state.post)

    useEffect(() => {
        dispatch(fetchPostsHandler({}))
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
                <section>
                    <div className="container pt-8">
                        <Grid2 container justifyContent={'center'}>
                            <Grid2 container size={{ xs: 12, md: 11 }} spacing={2}>
                                {
                                    posts && Array.isArray(posts) && posts.length > 0 ? <>
                                        {
                                            posts.map(post => <Grid2 key={post.title} size={{ xs: 12, sm: 6, md: 4 }} >
                                                <BlogCard title={post.title} excerpt={post.excerpt} featuredImage={post.media?.featuredImage} slug={post?.slug?.current} />
                                            </Grid2>)
                                        }
                                    </> : <></>
                                }
                            </Grid2>
                        </Grid2>
                    </div>
                </section>
            </ShopLayout>
        </>
    )
}

export default Blog