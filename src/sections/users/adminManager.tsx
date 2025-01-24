import React, { useEffect, useState } from 'react';
import { CustomTable } from '@/components';

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    avatar: string;
    role: "admin" | "user";
}

interface AdminManagerProps {
    admin: User[];
    handleDelete: (id: string) => void
}

const AdminManager: React.FC<AdminManagerProps> = ({ admin, handleDelete }) => {
    const tableHead = ['Sr', 'Avatar', 'Name', 'Email', 'Role'];
    const [tableBody, setTableBody] = useState<{
        _id: string,
        Sr: number;
        Name: string;
        Email: string;
        Role: string,
        Avatar: string,
        id: string
    }[]>([]);

    useEffect(() => {
        if (admin && Array.isArray(admin) && admin.length > 0) {
            const body = admin.map((a, index) => ({
                Sr: index + 1,
                Avatar: a.avatar,
                id: a._id,
                Name: `${a.firstName} ${a.lastName}`,
                Email: a.email,
                Role: a.role,
                _id: a._id
            }));
            setTableBody(body);
        }
    }, [admin]);

    return (
        <section>
            <div className="container p-4 bg-white">
                <CustomTable tHead={tableHead} tBody={tableBody} handleDelete={handleDelete} />
            </div>
        </section>
    );
};

export default AdminManager;