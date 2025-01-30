"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/components";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { deletePostHandler, fetchPostsHandler } from "@/lib/features/post.features";
import { toast } from "react-toastify";
import CustomTab from "@/components/tabs/custom-tabs.tabs";
import Post from "@/types/post.types";
import { DraftPostsSec, PublishedPostsSec } from "@/sections";
import { clearState } from "@/lib/slices/posts.slice";

const Posts = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { posts, message, loading, error } = useAppSelector((state) => state.post);
    const [selectedTab, setSelectedTab] = useState<number>(1);
    const [publishedPosts, setPublishedPosts] = useState<Post[]>([]);
    const [draftPosts, setDraftPosts] = useState<Post[]>([]);

    useEffect(() => {
        dispatch(fetchPostsHandler({}));
    }, [dispatch]);

    useEffect(() => {
        if (message && !loading) {
            if (error) {
                toast.error(message);
            } else {
                dispatch(fetchPostsHandler({}))
            }
        }
        dispatch(clearState())
    }, [error, message, loading, dispatch]);

    useEffect(() => {
        if (posts && Array.isArray(posts)) {
            setPublishedPosts(posts.filter((entry) => entry.isPublished === true));
            setDraftPosts(posts.filter((entry) => entry.isPublished === false));
        }
    }, [posts]);

    const tabs = [
        { id: "admin/posts/tab-1", title: "Published" },
        { id: "admin/posts/tab-2", title: "Draft" },
    ];

    const handleDelete = (id: string) => {
        dispatch(deletePostHandler(id))
    }

    const handleEdit = (slug: string) => {
        router.push(`/admin/posts/details/${slug}`)
    }

    return (
        <AdminLayout>
            <section>
                <div className="flex flex-col gap-4 p-0 md:p-4">
                    <div className="flex justify-between items-center">
                        <h2 className="font-[600] text-[20px] md:text-[24px]">Posts</h2>
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
                        {
                            selectedTab === 1 ? <PublishedPostsSec posts={publishedPosts} handleDelete={handleDelete} handleEdit={handleEdit} /> : <DraftPostsSec posts={draftPosts} handleDelete={handleDelete} handleEdit={handleEdit} />
                        }
                    </div>
                </div>
            </section>
        </AdminLayout>
    );
};

export default Posts;
