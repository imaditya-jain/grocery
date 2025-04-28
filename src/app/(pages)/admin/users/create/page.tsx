"use client"

import React, { useEffect } from 'react'
import { AdminLayout, RegistrationForm } from '@/components'
import { useRouter } from 'next/navigation'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { toast } from "react-toastify"
import { clearState } from "@/lib/slices/auth.slice"
import { Container, Grid } from '@mui/material';

const CreateUser = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { message, error } = useAppSelector((state) => state.auth)

    useEffect(() => {
        if (message) {
            if (error) {
                toast.error(message)
                dispatch(clearState())
            } else {
                toast.success(message)
                dispatch(clearState())
                setTimeout(() => {
                    router.push('/admin/users')
                })
            }
        }
    }, [error, message, dispatch, router])
    return (
        <><AdminLayout>
            <section>
                <Container className='!p-0'>
                    <Grid container>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <div className='flex flex-col gap-6 py-4'>
                                <div>
                                    <h2 className='font-[600] text-[20px] md:text-[24px]'>Add New User</h2>
                                </div>
                                <RegistrationForm page='/admin/users/create' isEdit={false} user={null} />
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </section>
        </AdminLayout></>
    )
}

export default CreateUser