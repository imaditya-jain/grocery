import React, { useEffect, useState } from 'react';
import { CustomTable } from '@/components';

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'admin' | 'user';
    avatar: string;
}

interface UserManagerProps {
    user: User[];
    handleDelete: (id: string) => void;
}

const UserManager: React.FC<UserManagerProps> = ({ user, handleDelete }) => {
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
        if (user && Array.isArray(user) && user.length > 0) {
            const body = user.map((a, index) => ({
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
    }, [user]);

    return (
        <section>
            <div className="container p-4 bg-white">
                <CustomTable tHead={tableHead} tBody={tableBody} handleDelete={handleDelete} />
            </div>
        </section>
    );
}

export default UserManager;