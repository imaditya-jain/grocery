"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Path } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputFields, RTE } from "@/components";
import Post from "@/types/post.types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import storage from "@/config/firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createPostHandler, updatePostHandler } from "@/lib/features/post.features";
import { toast } from "react-toastify";
import { clearState } from "@/lib/slices/posts.slice";

interface PostCreateFormProps {
    isEdit: boolean;
    post: Post | null;
}

const CreatePostForm = ({ isEdit, post }: PostCreateFormProps) => {
    const { message, error, loading } = useAppSelector((state) => state.post)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (typeof window !== undefined) {
            setShow(true);
        }
    }, [show]);

    const schema = yup.object().shape({
        title: yup.string().required("Post title is required."),
        excerpt: yup.string().required("Post excerpt is required."),
        featuredImage: yup
            .mixed<FileList>()
            .test(
                "fileRequired",
                "An avatar is required",
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
        content: yup.string().required("Post content is required."),
        metaTitle: yup.string().required("Post meta title is required."),
        metaDescription: yup.string().required("Post meta description is required."),
    });

    type CreatePostFormValues = yup.InferType<typeof schema>;

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset
    } = useForm<CreatePostFormValues>({
        resolver: yupResolver(schema),
        mode: "onBlur",
        defaultValues: {
            title: post?.title || "",
            excerpt: post?.excerpt || "",
            metaTitle: post?.seo?.metaTitle || "",
            metaDescription: post?.seo?.metaDescription || "",
            content: post?.content || "",
        },
    });

    const fields = [
        { id: "cpf-1", type: "text" as const, name: "title", label: "Title", placeholder: "", multiline: false, rows: 1 },
        { id: "cpf-2", type: "text" as const, name: "excerpt", label: "Excerpt", placeholder: "", multiline: true, rows: 4 },
        { id: "cpf-3", type: "text" as const, name: "metaTitle", label: "Meta Title", placeholder: "", multiline: false, rows: 1 },
        { id: "cpf-4", type: "text" as const, name: "metaDescription", label: "Meta Description", placeholder: "", multiline: false, rows: 1 },
        { id: "cpf-5", type: "file" as const, name: "featuredImage", label: "Featured Image", placeholder: "", multiline: false, rows: 1 },
    ];

    const handleCreatePost = async (data: CreatePostFormValues) => {
        let imgUrl = post?.media?.featuredImage || "";

        if (data.featuredImage && data.featuredImage instanceof FileList && data.featuredImage[0]) {
            const storageRef = ref(storage, `display-profile/${Date.now()}-${data.featuredImage[0].name}`);
            const snapshot = await uploadBytes(storageRef, data.featuredImage[0]);
            imgUrl = await getDownloadURL(snapshot.ref);
        }

        if (!isEdit) {
            const newData = {
                ...data,
                featuredImage: imgUrl,
            };

            dispatch(createPostHandler(newData));
        } else {
            if (post !== null) {
                const updatedData = {
                    ...data,
                    featuredImage: imgUrl,
                };

                dispatch(updatePostHandler({ id: post._id, data: updatedData }));
            }
        }
    };

    useEffect(() => {
        if (message && !loading) {
            if (error) {
                toast.error(message);
            } else {
                toast.success(message);
                router.push('/admin/posts/');
            }
            dispatch(clearState());
            reset();
        }
    }, [message, error, loading, dispatch, reset, router]);

    return (
        <>
            {show ? (
                <form onSubmit={handleSubmit(handleCreatePost)}>
                    <div>
                        {fields.map((field) => (
                            <InputFields<CreatePostFormValues>
                                key={field.id}
                                label={field.label}
                                name={field.name as Path<CreatePostFormValues>}
                                type={field.type}
                                placeholder={field.placeholder}
                                errors={errors}
                                register={register}
                                multline={field.multiline}
                                rows={field.rows}
                            />
                        ))}
                        <div>
                            <RTE<CreatePostFormValues>
                                name="content"
                                control={control}
                                label="Content"
                                defaultValue={post?.content || ""}
                                error={errors?.content && errors.content?.message}
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="w-full bg-[var(--color-primary)] p-3 text-white font-[600] rounded-md"
                        >
                            {isEdit ? "Update" : "Save"}
                        </button>
                    </div>
                </form>
            ) : null}
        </>
    );
};

export default CreatePostForm;
