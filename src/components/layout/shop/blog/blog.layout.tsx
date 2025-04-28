import React from 'react'
import { SingleBlogHero } from '@/sections'
import { Grid } from '@mui/material'
import { PostArchiveSection } from '@/sections'
import Post from '@/types/post.types'
import Image from 'next/image'

interface BlogLayoutProps {
    content: string | undefined;
    title: string | undefined;
    featuredImage: string | undefined;
    page: string | undefined;
    posts: Post[] | undefined;
    limit: number | undefined;
    totalPages?: number;
    current_page?: number;
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ content, title, featuredImage, page, posts, limit, totalPages, current_page, }) => {
    return (
        <>
            <section className='pt-6'>
                <div className='container'>
                    <Grid container justifyContent={'center'}>
                        <Grid size={11} container spacing={{ xs: 2, md: 3 }} direction={{ xs: 'column-reverse', md: 'row' }}>
                            <Grid size={{ xs: 12, md: 3 }}>
                                <Image fill src="/assets/images/left-banner-1.jpg" alt="banner-1" className='!static !max-w-full !h-[auto]' />
                            </Grid>
                            <Grid size={{ xs: 12, md: 9 }}>
                                {
                                    page !== 'archive' && title && featuredImage && content ? <>
                                        <SingleBlogHero title={title} featuredImage={featuredImage} />
                                        <div className='post-content' dangerouslySetInnerHTML={{ __html: content }} />
                                    </> : posts && Array.isArray(posts) && posts.length > 0 && limit && <>
                                        <PostArchiveSection posts={posts} limit={limit} totalPages={totalPages || 0} current_page={current_page || 0} />
                                    </>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </section >
        </>
    )
}

export default BlogLayout