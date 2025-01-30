import { Grid2 } from '@mui/material'
import React from 'react'

interface BlogLayoutProps {
    content: string
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ content }) => {
    return (
        <>
            <section className='mt-6'>
                <div className='container'>
                    <Grid2 container justifyContent={'center'}>
                        <Grid2 size={11} container spacing={{ xs: 2, md: 3 }} direction={{ xs: 'column-reverse', md: 'row' }}>
                            <Grid2 size={{ xs: 12, md: 4 }}></Grid2>
                            <Grid2 size={{ xs: 12, md: 8 }}>
                                <div className='post-content' dangerouslySetInnerHTML={{ __html: content }} />
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </div>
            </section>
        </>
    )
}

export default BlogLayout