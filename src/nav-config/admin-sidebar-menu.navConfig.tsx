"use client"

import { useRouter } from "next/navigation";
import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { MdOutlineSpaceDashboard, MdOutlinePostAdd, MdOutlineShoppingCart, MdPersonOutline, MdOutlinePermMedia } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";

const sidebarMenu = [

    { id: 'admin-sidebar-menu-1', title: 'Dashboard', link: '/admin/dashboard', icon: <MdOutlineSpaceDashboard className="text-white" /> },
    { id: 'admin-sidebar-menu-2', title: 'Media', link: '/admin/media', icon: <MdOutlinePermMedia className="text-white" /> },
    { id: 'admin-sidebar-menu-3', title: 'Posts', link: '/admin/posts', icon: <MdOutlinePostAdd className="text-white" /> },
    { id: 'admin-sidebar-menu-4', title: 'Products', link: '/admin/products', icon: <AiOutlineProduct className="text-white" /> },
    { id: 'admin-sidebar-menu-5', title: 'Orders', link: '/admin/orders', icon: <MdOutlineShoppingCart className="text-white" /> },
    { id: 'admin-sidebar-menu-6', title: 'Users', link: '/admin/users', icon: <MdPersonOutline className="text-white" /> },
]

const AdminSidebarMenu = () => {
    const router = useRouter()
    return (
        <>
            <List>
                {
                    sidebarMenu.map((item) =>
                        <ListItemButton key={item?.id} onClick={() => router.push(item?.link)}>
                            <ListItemIcon >{item.icon}</ListItemIcon>
                            <ListItemText primary={item?.title} className="text-white" />
                        </ListItemButton>
                    )
                }
            </List>
        </>
    )
}

export default AdminSidebarMenu