import mongoose, { Document, Types, Model } from "mongoose";
import slugify from 'slugify'

interface SEO {
    metaTitle: string,
    metaDescription: string
}

interface Media {
    featuredImage: string;
}

interface Slug {
    current: string
}


export interface IPosts extends Document {
    _id: Types.ObjectId;
    title: string;
    excerpt: string;
    media: Media
    content: string,
    slug: Slug,
    seo: SEO
}

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    excerpt: {
        type: String,
        trim: true,
        required: true,
    },

    media: {
        featuredImage: {
            type: String,
        },
    },
    content: {
        type: String,
        trim: true,
        required: true,
    },
    slug: {
        current: {
            type: String,
            required: true,
        }
    },
    seo: {
        metaTitle: {
            type: String,
            required: true,
        },
        metaDescription: {
            type: String,
            required: true,
        }
    }
}, { timestamps: true })

postSchema.pre('save', async function (next) {
    let baseSlug = slugify(this.title, { lower: true, strict: true });

    // Check if a post with the generated slug already exists
    const existingPost = await mongoose.models.Post.findOne({ 'slug.current': baseSlug });

    if (existingPost) {
        let copyNumber = 2;
        let newSlug;

        do {
            newSlug = `${baseSlug}-copy-${copyNumber}`;
            copyNumber++;
        } while (await mongoose.models.Post.findOne({ 'slug.current': newSlug }));

        baseSlug = newSlug;
    }

    this.slug = { current: baseSlug };

    next();
})

const Post: Model<IPosts> = mongoose.models.Post || mongoose.model('Post', postSchema)

export default Post