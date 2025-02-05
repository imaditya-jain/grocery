import React from 'react'
import { SingleBlogHero } from '@/sections'
import { Grid2 } from '@mui/material'
import { PostArchiveSection } from '@/sections'
import Post from '@/types/post.types'

interface BlogLayoutProps {
    content: string
    title: string,
    featuredImage: string,
    page: string
    posts: Post[],
    limit: number
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ content, title, featuredImage, page, posts, limit }) => {
    return (
        <>
            <section className='pt-6'>
                <div className='container'>
                    <Grid2 container justifyContent={'center'}>
                        <Grid2 size={11} container spacing={{ xs: 2, md: 3 }} direction={{ xs: 'column-reverse', md: 'row' }}>
                            <Grid2 size={{ xs: 12, md: 3 }}>
                                <img src="/assets/images/left-banner-1.jpg" style={{ width: "100%" }} />
                            </Grid2>
                            <Grid2 size={{ xs: 12, md: 9 }}>
                                {
                                    page !== 'archive' ? <>
                                        <SingleBlogHero title={title} featuredImage={featuredImage} />
                                        <div className='post-content' dangerouslySetInnerHTML={{ __html: content }} />
                                    </> : <>
                                        <PostArchiveSection posts={posts} limit={limit} />
                                    </>
                                }
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </div>
            </section>
        </>
    )
}

export default BlogLayout