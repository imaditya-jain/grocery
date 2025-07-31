"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { deletePostHandler, fetchPostsHandler } from "@/lib/features/post.features";
import { clearState } from "@/lib/slices/posts.slice";
import { toast } from "react-toastify";
import CustomTab from "@/components/tabs/custom-tabs.tabs";
import { DraftPostsSec, PublishedPostsSec } from "@/sections";
import Post from "@/types/post.types";

const PostContent = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();

    const { posts, totalPages, currentPage, message, loading, error } = useAppSelector(
        (state) => state.post
    );

    const [selectedTab, setSelectedTab] = useState<number>(1);
    const [publishedPosts, setPublishedPosts] = useState<Post[]>([]);
    const [draftPosts, setDraftPosts] = useState<Post[]>([]);

    useEffect(() => {
        const page = searchParams.get("page") || "1";
        dispatch(fetchPostsHandler(page));
    }, [searchParams, dispatch]);

    useEffect(() => {
        if (message && !loading) {
            if (error) {
                toast.error(message);
            } else {
                toast.success(message);
                dispatch(fetchPostsHandler("1"));
            }
            dispatch(clearState());
        }
    }, [error, message, loading, dispatch]);

    useEffect(() => {
        if (posts?.length) {
            setPublishedPosts(posts.filter((entry) => entry.isPublished));
            setDraftPosts(posts.filter((entry) => !entry.isPublished));
        }
    }, [posts]);

    const tabs = [
        { id: "admin/posts/tab-1", title: "Published" },
        { id: "admin/posts/tab-2", title: "Draft" },
    ];

    const handleDelete = (id: string) => {
        dispatch(deletePostHandler(id));
    };

    const handleEdit = (slug: string) => {
        router.push(`/admin/posts/details/${slug}`);
    };

    return (
        <section>
            <div className="flex flex-col gap-4 p-0 md:p-4">
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-2xl md:text-3xl">Posts</h2>
                    <button
                        className="dark-outline-btn"
                        onClick={() => router.push("/admin/posts/create")}
                    >
                        Add Post
                    </button>
                </div>
                <div>
                    <CustomTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabs={tabs} />
                </div>
                <div>
                    {selectedTab === 1 ? (
                        <PublishedPostsSec
                            posts={publishedPosts}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                            totalPages={totalPages}
                            currentPage={currentPage}
                        />
                    ) : (
                        <DraftPostsSec
                            posts={draftPosts}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                        />
                    )}
                </div>
            </div>
        </section>
    );
};

export default PostContent;
