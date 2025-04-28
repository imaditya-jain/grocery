"use client"

import React, { useEffect } from 'react'
import { AdminLayout, CreateProductForm } from '@/components'
import { Container, Grid } from '@mui/material';
import { useRouter, useParams } from 'next/navigation'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { toast } from 'react-toastify';
import { fetchProduct } from '@/lib/features/product.features';
import { clearState } from '@/lib/slices/products.slice';

const Details = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const params = useParams();
    const { product, message, loading, error } = useAppSelector((state) => state.product)

    const slug = typeof params.slug === 'string' ? params.slug : '';

    useEffect(() => {
        if (slug) {
            dispatch(fetchProduct(slug));
        }

    }, [slug, dispatch]);

    useEffect(() => {
        if (message && !loading) {
            if (!product && error) {
                toast.error(message)
                router.back()
            } else if (product && !error) {
                toast.success(message)
                router.push('/admin/products/')
            }
            dispatch(clearState())
        }
    }, [product, loading, message, error, router, dispatch])

    return (
        <>
            <AdminLayout>
                <section>
                    <Container className='!p-0'>
                        <Grid container>
                            <Grid size={{ xs: 12, md: 10 }}>
                                {
                                    product && Object.keys(product).length > 0 && !loading && !error ? <div className='flex flex-col gap-6 py-4'>
                                        <div>
                                            <h2 className='font-[600] text-[20px] md:text-[24px]'>Edit Post</h2>
                                        </div>
                                        <div>
                                            <CreateProductForm isEdit={true} product={product} />
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

export default Details