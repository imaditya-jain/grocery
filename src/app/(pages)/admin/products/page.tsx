"use client"

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AdminLayout } from '@/components'
import { ProductManagerSec } from '@/sections'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { toast } from 'react-toastify'
import { clearState } from '@/lib/slices/products.slice'
import { deleteProduct, fetchProducts } from '@/lib/features/product.features'

const Details = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const { products, error, loading, message } = useAppSelector((state) => state.product)

    useEffect(() => {
        dispatch(fetchProducts({}))
    }, [dispatch])

    useEffect(() => {
        if (message && !loading) {
            if (error) {
                toast.error(message)
                setTimeout(() => {
                    dispatch(clearState())
                }, 1000)
            } else if (!error) {
                toast.success(message)
                dispatch(fetchProducts({}))
            }
        }
    }, [message, error, loading, dispatch])

    const handleDelete = (id: string) => {
        dispatch(deleteProduct(id))
    }

    const handleEdit = (slug: string) => {
        router.push(`/admin/products/details/${slug}`)
    }

    return (
        <>
            <AdminLayout>
                {
                    products && <>
                        <section>
                            <div className="flex flex-col gap-4 p-0 md:p-4">
                                <div className="flex justify-between items-center">
                                    <h2 className="font-[600] text-[20px] md:text-[24px]">Products</h2>
                                    <button
                                        className="dark-outline-btn"
                                        onClick={() => router.push("/admin/products/create")}
                                    >
                                        Add Product
                                    </button>
                                </div>
                                <div>
                                    <ProductManagerSec products={products} handleDelete={handleDelete} handleEdit={handleEdit} />
                                </div>
                            </div>
                        </section>
                    </>
                }
            </AdminLayout>
        </>
    )
}

export default Details