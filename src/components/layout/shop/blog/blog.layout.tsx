import React from 'react'
import { SingleBlogHero } from '@/sections'
import { Grid2 } from '@mui/material'
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
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ content, title, featuredImage, page, posts, limit }) => {
    return (
        <>
            <section className='pt-6'>
                <div className='container'>
                    <Grid2 container justifyContent={'center'}>
                        <Grid2 size={11} container spacing={{ xs: 2, md: 3 }} direction={{ xs: 'column-reverse', md: 'row' }}>
                            <Grid2 size={{ xs: 12, md: 3 }}>
                                <Image fill src="/assets/images/left-banner-1.jpg" alt="banner-1" className='!static !max-w-full !h-[auto]' />
                            </Grid2>
                            <Grid2 size={{ xs: 12, md: 9 }}>
                                {
                                    page !== 'archive' && title && featuredImage && content ? <>
                                        <SingleBlogHero title={title} featuredImage={featuredImage} />
                                        <div className='post-content' dangerouslySetInnerHTML={{ __html: content }} />
                                    </> : posts && Array.isArray(posts) && posts.length > 0 && limit && <>
                                        <PostArchiveSection posts={posts} limit={limit} />
                                    </>
                                }
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </div>
            </section >
        </>
    )
}

export default BlogLayout