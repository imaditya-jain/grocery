"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { createProduct, updateProduct } from "@/lib/features/product.features";
import { useState, useEffect } from "react";
import { TextField, Button, IconButton } from "@mui/material";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import Image from "next/image";
import { RTE } from "@/components";
import { toast } from "react-toastify";
import storage from "@/config/firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Product, Variant } from "@/types/product.types";

interface ProductFormProps {
    product?: Product | null;
    isEdit: boolean;
}

const ProductForm = ({ product, isEdit }: ProductFormProps) => {
    const { error: stateError, message, loading } = useAppSelector((state) => state.product);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const schema = yup.object({
        name: yup.string().required("Product name is required"),
        price: yup.number().positive().required("Price is required"),
        inventory: yup.number().integer().min(0).required("Inventory is required"),
        description: yup.string().optional(),
        image: yup
            .mixed<FileList>()
            .test(
                "fileRequired",
                "An image is required",
                (value) => isEdit || (value && value instanceof FileList && value.length > 0)
            )
            .test(
                "fileType",
                "Only image files are allowed",
                (value) =>
                    isEdit ||
                    (value &&
                        value instanceof FileList &&
                        ["image/jpeg", "image/png"].includes(value[0]?.type))
            )
            .test(
                "fileSize",
                "File size must be less than 2MB",
                (value) =>
                    isEdit ||
                    (value && value instanceof FileList && value[0]?.size <= 2 * 1024 * 1024)
            ),
        seo: yup.object({
            metaTitle: yup.string().required("Meta title is required"),
            metaDescription: yup.string().required("Meta description is required"),
        }),
        variants: yup.array(
            yup.object({
                attributes: yup.string().required("Attributes are required"),
                stock: yup.number().integer().min(0).required("Stock is required"),
                price: yup.number().positive().required("Variant price is required"),
                image: yup
                    .lazy((value) => {
                        if (value instanceof FileList) {
                            return yup
                                .mixed<FileList>()
                                .test(
                                    "fileType",
                                    "Only image files are allowed",
                                    (value) =>
                                        value && ["image/jpeg", "image/png"].includes(value[0]?.type)
                                )
                                .test(
                                    "fileSize",
                                    "File size must be less than 2MB",
                                    (value) => value && value[0]?.size <= 2 * 1024 * 1024
                                );
                        } else if (typeof value === "string") {
                            return yup.string().optional();
                        } else {
                            return yup.mixed().optional();
                        }
                    })
                    .optional(),
            })
        )

    });


    type ProductFormValues = yup.InferType<typeof schema>;

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<ProductFormValues>({
        resolver: yupResolver(schema),
        mode: "onBlur",
        defaultValues: {
            name: "",
            price: 0,
            inventory: 0,
            description: "",
            seo: { metaTitle: "", metaDescription: "" },
            variants: [],
        },
    });

    const { fields, append, remove } = useFieldArray({ control, name: "variants" });

    useEffect(() => {
        if (product) {
            const mappedVariants = product?.variants && Array.isArray(product?.variants)
                ? product.variants.map((variant: Variant) => ({
                    ...variant,
                    attributes: Object.entries(variant.attributes)
                        .map(([key, value]) => `${key}:${value}`)
                        .join(", "),
                }))
                : [];

            reset({
                ...product,
                variants: mappedVariants,
            });

            if (product.media?.image) {
                setImagePreview(product.media.image);
            }
        }
    }, [product, reset]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImagePreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const onSubmit = async (data: ProductFormValues) => {
        const formattedData = {
            ...data,
            variants: (data.variants || []).map((variant) => ({
                ...variant,
                attributes: variant.attributes
                    .split(",")
                    .map((attr) => attr.trim())
                    .reduce((acc, attr) => {
                        const [key, value] = attr.split(":");
                        acc[key.trim()] = value?.trim() || "";
                        return acc;
                    }, {} as Record<string, string>),
                image: variant.image instanceof FileList ? variant.image[0] : variant.image,
            })),
        };

        let imgUrl = product?.media?.image || "";

        if (data.image && data.image instanceof FileList && data.image[0]) {
            const storageRef = ref(storage, `products/${Date.now()}-${data.image[0].name}`);
            const snapshot = await uploadBytes(storageRef, data.image[0]);
            imgUrl = await getDownloadURL(snapshot.ref);
        }

        const media = { image: imgUrl };
        const newData = { ...formattedData, media };

        if (isEdit && product && product._id) {
            dispatch(updateProduct({ id: product._id.toString(), data: newData }));
        } else {
            dispatch(createProduct(newData));
        }

        reset();
        setImagePreview(null);
    };

    useEffect(() => {
        if (message && !loading) {
            if (stateError) {
                toast.error(message);
            } else {
                toast.success(message);
                router.push('/admin/products/');
            }
        }
    }, [stateError, message, loading, router]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <TextField label="Product Name" fullWidth {...register("name")} error={!!errors.name} helperText={errors.name?.message} />
            <TextField label="Price" type="number" fullWidth {...register("price")} error={!!errors.price} helperText={errors.price?.message} />
            <TextField label="Inventory" type="number" fullWidth {...register("inventory")} error={!!errors.inventory} helperText={errors.inventory?.message} />

            <TextField label="Meta Title" fullWidth {...register("seo.metaTitle")} error={!!errors.seo?.metaTitle} helperText={errors.seo?.metaTitle?.message} />
            <TextField label="Meta Description" fullWidth {...register("seo.metaDescription")} error={!!errors.seo?.metaDescription} helperText={errors.seo?.metaDescription?.message} />

            <RTE<ProductFormValues>
                name="description"
                control={control}
                label="Content"
                defaultValue={product?.description || ""}
                error={errors?.description?.message}
            />
            <input type="file" {...register("image")} onChange={handleImageUpload} />
            {imagePreview && <Image src={imagePreview} alt="Preview" width={100} height={100} />}

            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Variants</h3>
                {fields.map((field, index) => (
                    <div key={field.id} className="border p-3 space-y-2">
                        <TextField
                            label="Attributes (color:red, size:M)"
                            fullWidth
                            defaultValue={field.attributes}
                            {...register(`variants.${index}.attributes` as const)}
                            error={!!errors.variants?.[index]?.attributes}
                            helperText={errors.variants?.[index]?.attributes?.message}
                        />
                        <TextField
                            label="Stock"
                            type="number"
                            fullWidth
                            defaultValue={field.stock}
                            {...register(`variants.${index}.stock` as const)}
                            error={!!errors.variants?.[index]?.stock}
                            helperText={errors.variants?.[index]?.stock?.message}
                        />
                        <TextField
                            label="Price"
                            type="number"
                            fullWidth
                            defaultValue={field.price}
                            {...register(`variants.${index}.price` as const)}
                            error={!!errors.variants?.[index]?.price}
                            helperText={errors.variants?.[index]?.price?.message}
                        />
                        <IconButton onClick={() => remove(index)}>
                            <AiOutlineDelete className="text-red-500" />
                        </IconButton>
                    </div>
                ))}
                <Button onClick={() => append({ attributes: "", stock: 0, price: 0 })}>
                    <AiOutlinePlus className="mr-2" /> Add Variant
                </Button>
            </div>
            <button
                type="submit"
                className="w-full bg-[var(--color-primary)] p-3 text-white font-[600] rounded-md"
            >
                {isEdit ? "Update" : "Register"}
            </button>
        </form>
    );
};

export default ProductForm;
