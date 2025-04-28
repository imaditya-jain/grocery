"use client"

import React from "react";
import { useRouter } from "next/navigation";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    path?: string;
}


const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, path = "/" }) => {
    const router = useRouter();

    if (totalPages < 1) return null;

    const visibleButtons = 5;
    const half = Math.floor(visibleButtons / 2);

    let startPage = Math.max(1, currentPage - half);
    let endPage = startPage + visibleButtons - 1;

    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - visibleButtons + 1);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    const goToPage = (page: number) => {
        const url = `${path}${page}`;
        router.push(url);
    };

    return (
        <div className="flex gap-2 justify-center mt-4">
            {pageNumbers.map((page) => (
                <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-3 py-1 border rounded transition ${page === currentPage
                        ? "bg-blue-500 text-white"
                        : "bg-white text-black hover:bg-gray-100"
                        }`}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
