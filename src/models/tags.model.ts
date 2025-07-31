import mongoose, { Document, Model } from "mongoose";
import slugify from "slugify";

interface SLUG {
    current: string
}

export interface ITags extends Document {
    name: string;
    slug: SLUG;
    description?: string;
    usageCount?: number;
    createdAt: Date;
    updatedAt: Date;
}

const tagsSchema = new mongoose.Schema<ITags>({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    slug: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    usageCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

tagsSchema.pre('save', function (next) {
    if (this.isModified("slug")) {
        this.slug = this.slug || {};
        this.slug.current = slugify(this.name, { lower: true, strict: true });
    }

    next()
})

const Tags: Model<ITags> = mongoose.models.Tags || mongoose.model('Tags', tagsSchema)

export default Tags