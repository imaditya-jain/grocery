import mongoose, { Document, Types, Model } from "mongoose";
import slugify from "slugify";

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

export interface IPosts extends Document {
    _id: Types.ObjectId;
    title: string;
    excerpt: string;
    media: Media;
    content: string;
    slug: Slug;
    seo: SEO;
}

const postSchema = new mongoose.Schema(
    {
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
                unique: true,
            },
        },
        seo: {
            metaTitle: {
                type: String,
                required: true,
            },
            metaDescription: {
                type: String,
                required: true,
            },
        },
        isPublished: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

postSchema.pre("save", function (next) {
    if (this.isModified("title")) {
        this.slug = { current: slugify(this.title, { lower: true, strict: true }) };
    }
    next();
});

const Post: Model<IPosts> = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
