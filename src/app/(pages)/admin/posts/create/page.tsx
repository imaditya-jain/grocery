import React from 'react'
import { Container, Grid } from '@mui/material';
import { AdminLayout, CreatePostForm } from '@/components'


const CreatePost = () => {
    return (
        <>
            <AdminLayout>
                <section>
                    <Container className='!p-0'>
                        <Grid container>
                            <Grid size={{ xs: 12, md: 10 }}>
                                <div className='flex flex-col gap-6 py-4'>
                                    <div>
                                        <h2 className='font-[600] text-[20px] md:text-[24px]'>Add New Post</h2>
                                    </div>
                                    <div>
                                        <CreatePostForm isEdit={false} post={null} />
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                </section>
            </AdminLayout>
        </>
    )
}

export default CreatePost