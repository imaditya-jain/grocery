"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminLayout } from '@/components'
import CustomTab from '@/components/tabs/custom-tabs.tabs'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { toast } from 'react-toastify'
import { clearState } from '@/lib/slices/user.slice'
import { deleteUser, fetchUsers } from '@/lib/features/user.features'
import { AdminManager, UserManager } from '@/sections'
import { User } from '@/types/user.types'

const Users = () => {
    const [admin, setAdmin] = useState<User[]>([])
    const [customer, setCustomer] = useState<User[]>([])
    const { users, error, message, loading } = useAppSelector((state) => state.user)
    const [selectedTab, setSelectedTab] = useState(1)
    const router = useRouter()
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchUsers({}))
    }, [dispatch])

    useEffect(() => {
        if (message && !loading) {
            if (error) {
                toast.error(message);
            } else {
                toast.success(message);
            }
            dispatch(clearState());
            dispatch(fetchUsers({}))
        }
    }, [message, loading, error, dispatch]);

    useEffect(() => {
        if (users && Array.isArray(users) && users.length > 0) {
            setAdmin(users.filter((user) => user.role === "admin"));
            setCustomer(users.filter((user) => user.role === "user"));
        }
    }, [users])

    const tabs = [{ id: "admin/users/tab-1", title: "Admin" }, { id: "admin/users/tab-2", title: "Customers" }]

    const handleDelete = (id: string) => {
        if (!id) {
            toast.error('User ID is required');
            return;
        }
        dispatch(deleteUser(id));
    };

    const handleEdit = (id: string) => {
        router.push(`/admin/users/details/${id}`)
    }

    return (
        <AdminLayout>
            <section>
                <div className='flex flex-col gap-4 p-0 md:p-4 '>
                    <div className='flex justify-between items-center'>
                        <h2 className='font-[600] text-[20px] md:text-[24px]'>Users</h2>
                        <button className='dark-outline-btn' onClick={() => router.push('/admin/users/create')}>Add User</button>
                    </div>
                    <div>
                        <CustomTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabs={tabs} />
                    </div>
                    <div>
                        {selectedTab === 1 ? <AdminManager admin={admin} handleDelete={handleDelete} handleEdit={handleEdit} /> : <UserManager user={customer} handleDelete={handleDelete} handleEdit={handleEdit} />}
                    </div>
                </div>
            </section>
        </AdminLayout>
    )
}

export default Users