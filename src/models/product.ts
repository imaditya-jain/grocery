import mongoose, { Schema, Document, Model } from "mongoose";

// Schema Definitions
const SeoSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    keywords: { type: [String], required: true },
    canonicalUrl: String,
    ogTitle: String,
    ogDescription: String,
    ogImage: String,
    twitterCard: String,
    twitterTitle: String,
    twitterDescription: String,
    twitterImage: String,
});

const VariantAttributeSchema = new Schema({
    name: { type: String, required: true },
    options: { type: [String], required: true },
});

const VariantCombinationSchema = new Schema({
    combination: { type: Map, of: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    sku: { type: String, required: true },
    imageUrl: String,
});

const ReviewSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true },
    comment: String,
    createdAt: { type: Date, default: Date.now },
});

const ShippingInfoSchema = new Schema({
    weight: Number,
    dimensions: {
        length: Number,
        width: Number,
        height: Number,
    },
    originCountry: String,
});

const ProductSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        brand: { type: String, required: true },
        basePrice: { type: Number, required: true },
        sku: { type: String, required: true },
        stock: { type: Number, required: true },
        images: { type: [String], required: true },
        variantAttributes: [VariantAttributeSchema],
        variantCombinations: [VariantCombinationSchema],
        reviews: [ReviewSchema],
        averageRating: { type: Number, default: 0 },
        totalReviews: { type: Number, default: 0 },
        seo: SeoSchema,
        meta: {
            views: { type: Number, default: 0 },
            sales: { type: Number, default: 0 },
            wishlistCount: { type: Number, default: 0 },
        },
        shippingInfo: ShippingInfoSchema,
        isFeatured: { type: Boolean, default: false },
        tags: [String],
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

// Middleware for stock calculation
ProductSchema.pre("save", function (next) {
    const product = this as unknown as IProduct;

    if (product.variantCombinations && product.variantCombinations.length > 0) {
        product.stock = product.variantCombinations.reduce((total, variant) => {
            if (!variant.combination || typeof variant.stock !== "number" || typeof variant.price !== "number") {
                throw new Error("Invalid variant combination data.");
            }
            return total + variant.stock;
        }, 0);
    }

    next();
});

// TypeScript Interfaces
interface ISeo {
    title: string;
    description: string;
    keywords: string[];
    canonicalUrl?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    twitterCard?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
}

interface IVariantAttribute {
    name: string;
    options: string[];
}

interface IVariantCombination {
    combination: Record<string, string>; // Example: { color: "Red", size: "M" }
    price: number;
    stock: number;
    sku: string;
    imageUrl?: string;
}

interface IReview {
    userId: mongoose.Types.ObjectId;
    rating: number;
    comment?: string;
    createdAt?: Date;
}

interface IShippingInfo {
    weight?: number;
    dimensions?: {
        length?: number;
        width?: number;
        height?: number;
    };
    originCountry?: string;
}

interface IProduct extends Document {
    name: string;
    description: string;
    category: string;
    brand: string;
    basePrice: number;
    sku: string;
    stock: number;
    images: string[];
    variantAttributes?: IVariantAttribute[];
    variantCombinations?: IVariantCombination[];
    reviews?: IReview[];
    averageRating?: number;
    totalReviews?: number;
    seo?: ISeo;
    meta?: {
        views?: number;
        sales?: number;
        wishlistCount?: number;
    };
    shippingInfo?: IShippingInfo;
    isFeatured?: boolean;
    tags?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

const Product: Model<IProduct> =
    mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
