interface Slug {
    current: string;
}

interface Media {
    image: string;
}

interface Seo {
    metaTitle: string;
    metaDescription: string;
}

export interface Variant {
    attributes: string;
    stock: number;
    price: number;
}

export interface Product {
    _id: string;
    name: string;
    slug: Slug;
    description: string;
    media: Media;
    seo: Seo;
    variants: Variant[];
    createdAt: Date;
    updatedAt: Date;
}
