"use client"

import React, { useState, useEffect } from 'react'
import { Product } from '@/types/product.types';
import { CustomTable } from '@/components';

interface PublishedProductsSecProps {
    products: Product[];
    handleDelete: (id: string) => void;
    handleEdit: (slug: string) => void;
}

const ProductManager: React.FC<PublishedProductsSecProps> = ({ products, handleDelete, handleEdit }) => {
    const tableHead = ['Sr', 'Image', 'Name'];
    const [tableBody, setTableBody] = useState<{ _id: string; id: string; Sr: number; Name: string, slug: string, Image: string }[]>([]);

    useEffect(() => {
        if (products && Array.isArray(products) && products.length > 0) {
            const body = products.map((a, index) => ({
                _id: a._id,
                id: a._id,
                Sr: index + 1,
                Name: a.name,
                Image: a.media?.image,
                slug: a.slug?.current
            }));
            setTableBody(body);
        }
    }, [products]);

    return (
        <>
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
            </section>
        </>
    )
}

export default ProductManager