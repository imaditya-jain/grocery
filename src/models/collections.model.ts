import mongoose, { Document, Model, Types, Query, UpdateQuery } from 'mongoose';
import slugify from "slugify";

export interface ICollection extends Document {
    name: string;
    slug: string;
    description?: string;
    parent?: Types.ObjectId;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}

const collectionsSchema = new mongoose.Schema<ICollection>({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        unique: true
    },
    description: {
        type: String,
        default: ""
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection',
        default: null
    },
    image: {
        type: String,
        default: ""
    }
}, { timestamps: true })


collectionsSchema.pre('save', function (next) {
    if (this.isModified("name")) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});

function autoUpdateSlug(this: Query<ICollection, ICollection>, next: () => void) {
    const update = this.getUpdate() as UpdateQuery<ICollection>;

    if (!update) return next();

    const name = update.name ?? update.$set?.name;

    if (typeof name === 'string') {
        const newSlug = slugify(name, { lower: true, strict: true });

        if (update.$set) {
            update.$set.slug = newSlug;
        } else {
            update.$set = { slug: newSlug };
        }
    }

    next();
}

collectionsSchema.pre('findOneAndUpdate', autoUpdateSlug);
collectionsSchema.pre('updateOne', autoUpdateSlug);

const Collections: Model<ICollection> = mongoose.models.Collections || mongoose.model('Collections', collectionsSchema)

export default Collections