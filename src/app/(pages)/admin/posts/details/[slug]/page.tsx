"use client"

import React, { useEffect } from 'react'
import { Container, Grid } from '@mui/material';
import { useRouter, useParams } from 'next/navigation'
import { AdminLayout, CreatePostForm } from '@/components'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { toast } from 'react-toastify';
import { clearState } from '@/lib/slices/user.slice';
import { fetchPostHandler } from '@/lib/features/post.features'

const DetailPostPage = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const params = useParams();
    const { post, message, loading, error } = useAppSelector((state) => state.post)

    const slug = typeof params.slug === 'string' ? params.slug : '';

    useEffect(() => {
        if (slug) {
            dispatch(fetchPostHandler(slug));
        }

    }, [slug, dispatch]);

    useEffect(() => {
        if (message && !loading) {
            if (!post && error) {
                toast.error(message)
                dispatch(clearState())
                router.back()
            } else if (post && !error) {
                toast.success(message)
                router.push('/admin/posts/')
            }
            dispatch(clearState())
        }
    }, [post, loading, message, error, router, dispatch])

    return (
        <>
            <AdminLayout>
                <section>
                    <Container className='!p-0'>
                        <Grid container>
                            <Grid size={{ xs: 12, md: 10 }}>
                                {
                                    post && Object.keys(post).length > 0 && !loading && !error ? <div className='flex flex-col gap-6 py-4'>
                                        <div>
                                            <h2 className='font-[600] text-[20px] md:text-[24px]'>Edit Post</h2>
                                        </div>
                                        <div>
                                            <CreatePostForm isEdit={true} post={post} />
                                        </div>
                                    </div> : <p>We are fetching data. Loading...</p>
                                }

                            </Grid>
                        </Grid>
                    </Container>
                </section>
            </AdminLayout>
        </>
    )
}

export default DetailPostPage