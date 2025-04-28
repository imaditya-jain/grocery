"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Delete, Edit } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import { IoMdEye } from "react-icons/io";
import Image from "next/image";

interface RowData {
    id: string;
    Avatar?: string;
    [key: string]: string | React.ReactNode | undefined;
    Image?: string
}

interface CustomTableProps {
    tHead: string[];
    tBody: RowData[];
    handleDelete: (id: string) => void;
    action: boolean;
    actionTypes: string[];
    handleEdit: (slug: string) => void;
}

const CustomTable: React.FC<CustomTableProps> = ({
    tHead,
    tBody,
    handleDelete,
    action,
    actionTypes,
    handleEdit,
}) => {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full text-left" width="100%" border={1} rules="all">
                <thead>
                    <tr>
                        {tHead.map((t) => (
                            <th key={t}>{t}</th>
                        ))}
                        {action && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {tBody.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {tHead.map((item) => (
                                <td key={item}>
                                    {item === "Avatar" ? (
                                        <Avatar src={row["Avatar"] as string} alt={`Avatar ${rowIndex}`} />
                                    ) : item === "Image" ? (<Image src={row["Image"] as string} alt={`product ${rowIndex}`} width={32} height={32} />) : (
                                        row[item] || "-" // Default fallback if the key is missing
                                    )}
                                </td>
                            ))}
                            {action && (
                                <td>
                                    {actionTypes.includes("edit") && (
                                        <IconButton
                                            onClick={() =>
                                                pathname.startsWith("/admin/posts") || pathname.startsWith("/admin/products")
                                                    ? handleEdit(row.slug as string)
                                                    : handleEdit(row.id)
                                            }
                                        >
                                            <Edit className="text-orange-400" />
                                        </IconButton>
                                    )}
                                    {actionTypes.includes("delete") && (
                                        <IconButton onClick={() => handleDelete(row["id"])}>
                                            <Delete className="text-red-500" />
                                        </IconButton>
                                    )}
                                    {actionTypes.includes("view") && (
                                        <IconButton
                                            onClick={() =>
                                                pathname.startsWith("/admin/posts") ? router.push(`/blog/${row["slug"]}`) : null
                                            }
                                        >
                                            <IoMdEye className="text-black" />
                                        </IconButton>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomTable;
