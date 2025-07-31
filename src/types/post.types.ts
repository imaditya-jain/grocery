interface SEO {
    metaTitle: string;
    metaDescription: string;
}

interface Media {
    featuredImage: string;
}

interface Slug {
    current: string;
}

interface Post {
    _id: string
    title: string;
    excerpt: string;
    media: Media;
    content: string;
    slug: Slug;
    seo: SEO;
    isPublished: boolean
}

export default Post