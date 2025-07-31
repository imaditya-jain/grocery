import mongoose, { Document, Types, Model } from "mongoose";
import slugify from "slugify";

interface IVariant {
    attributes: Map<string, string>;
    stock: number;
    price: number;
    image?: string;
}

interface SEO {
    metaTitle: string,
    metaDescription: string
}

interface MEDIA {
    image: string
}

interface SLUG {
    current: string
}

export interface IProduct extends Document {
    _id: Types.ObjectId;
    name: string;
    slug: SLUG;
    price: number,
    inventory: number,
    description?: string;
    variants: IVariant[] | null;
    media?: MEDIA;
    seo: SEO;
    createdAt: Date;
    updatedAt: Date;
}

const variantSchema = new mongoose.Schema<IVariant>({
    attributes: { type: Map, of: String, required: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
});

const productSchema = new mongoose.Schema<IProduct>(
    {
        name: { type: String, required: true },
        description: { type: String },
        price: { type: Number, required: true },
        inventory: { type: Number, required: true },
        variants: {
            type: [variantSchema],
            default: null,
        },
        media: {
            image: { type: String, default: "https://firebasestorage.googleapis.com/v0/b/todo---react-and-firebase.appspot.com/o/uploads%2F1738179538207-placeholder-images-image_large.jpg?alt=media&token=508711cf-2b97-475d-b9c1-0e57ec97f288" }
        },
        slug: {
            current: { type: String, unique: true, }
        },
        seo: {
            metaTitle: { type: String },
            metaDescription: { type: String }
        }
    },
    { timestamps: true }
);

productSchema.pre("save", function (next) {
    if (this.isModified("name")) {
        this.slug = this.slug || {};
        this.slug.current = slugify(this.name, { lower: true, strict: true });
    }

    next();
});

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);

export default Product;
