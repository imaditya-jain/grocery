import React from 'react'
import { Grid } from '@mui/material'
import { BlogCard, Pagination } from '@/components'
import Post from '@/types/post.types'

interface PostArchiveSectionPropTypes {
    posts: Post[];
    limit: number;
    totalPages: number;
    current_page: number;
}

const PostArchive: React.FC<PostArchiveSectionPropTypes> = ({ posts, limit, totalPages, current_page, }) => {
    return (
        <>
            <section>
                <div className="container">
                    <div className='mb-4'>
                        <h1 className='font-[700] text-[24px]'>Latest Posts</h1>
                    </div>
                    <Grid container spacing={4}>
                        {
                            posts && Array.isArray(posts) && posts.length > 0 ? <>
                                {
                                    posts.slice(0, limit).map(post => <Grid key={post.title} size={{ xs: 12, sm: 6, md: 4 }} >
                                        <BlogCard title={post.title} excerpt={post.excerpt} featuredImage={post.media?.featuredImage} slug={post?.slug?.current} />
                                    </Grid>)
                                }
                            </> : <></>
                        }
                    </Grid>
                    <div>
                        <Pagination totalPages={totalPages} currentPage={current_page} path='/blog/?page=' />
                    </div>
                </div>
            </section>
        </>
    )
}

export default PostArchive