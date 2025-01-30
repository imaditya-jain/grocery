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
    image?: FileList | string; // Allow both FileList and string
}

export interface Product {
    _id: string;
    name: string;
    slug: Slug;
    description: string;
    media: Media;
    seo: Seo;
    variant: Variant[];
    createdAt: Date;
    updatedAt: Date;
}
