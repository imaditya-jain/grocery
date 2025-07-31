"use client"

import React, { useState, useEffect } from 'react';
import Post from '@/types/post.types';
import { CustomTable, Pagination } from '@/components';

interface PublishedPostsSecProps {
    posts: Post[];
    totalPages?: number,
    currentPage?: number,
    handleDelete: (id: string) => void;
    handleEdit: (slug: string) => void;
}

const PublishedPostsSec: React.FC<PublishedPostsSecProps> = ({ posts, totalPages, currentPage, handleDelete, handleEdit }) => {
    const tableHead = ['Sr', 'Title'];
    const [tableBody, setTableBody] = useState<{ _id: string; id: string; Sr: number; Title: string, slug: string }[]>([]);

    useEffect(() => {
        if (posts && Array.isArray(posts) && posts.length > 0) {
            const body = posts.map((a, index) => ({
                _id: a._id,
                id: a._id,
                Sr: index + 1,
                Title: a.title,
                slug: a.slug?.current
            }));
            setTableBody(body);
        }
    }, [posts]);

    return (
        <section>
            <div className="container p-4 bg-white">
                <CustomTable
                    tHead={tableHead}
                    tBody={tableBody}
                    handleDelete={handleDelete}
                    action={true}
                    actionTypes={['edit', 'delete', 'view']}
                    handleEdit={handleEdit}
                />
            </div>
            <Pagination totalPages={Number(totalPages) || 0} currentPage={currentPage || 1} path='/admin/posts?page=' />
        </section>
    );
};

export default PublishedPostsSec;
