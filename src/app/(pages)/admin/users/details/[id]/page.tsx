"use client"

import React, { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation';
import { AdminLayout, RegistrationForm } from '@/components'
import { Container, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchUser } from '@/lib/features/user.features';
import { toast } from 'react-toastify';
import { clearState } from '@/lib/slices/user.slice';

const UserDetails = () => {
    const router = useRouter()
    const params = useParams();
    const dispatch = useAppDispatch();
    const { user, message, error, loading } = useAppSelector((state) => state.user)

    const id = typeof params.id === 'string' ? params.id : '';

    useEffect(() => {
        if (id) {
            dispatch(fetchUser(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (message && !loading) {
            if (!user && error) {
                toast.error(message)
                dispatch(clearState())
                router.back()
            } else if (user && !error) {
                toast.success(message)
                router.push('/admin/users/')
            }
            dispatch(clearState())
        }
    }, [user, loading, message, error, router, dispatch, id])

    return (
        <AdminLayout>
            <section>
                <Container className='!p-0'>
                    <Grid container>
                        <Grid size={{ xs: 12, md: 6 }}>
                            {
                                user && Object.keys(user).length > 0 && !loading && !error ? <div className='flex flex-col gap-6 py-4'>
                                    <div>
                                        <h2 className='font-[600] text-[20px] md:text-[24px]'>Edit User</h2>
                                    </div>
                                    <RegistrationForm page='/admin/users/create' user={user} isEdit={true} />
                                </div> : <p>We are fetching data. Loading...</p>
                            }

                        </Grid>
                    </Grid>
                </Container>
            </section>
        </AdminLayout>
    )
}

export default UserDetails;
