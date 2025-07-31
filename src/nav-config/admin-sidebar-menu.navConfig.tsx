"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse
} from "@mui/material";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import {
    MdOutlineSpaceDashboard,
    MdOutlinePostAdd,
    MdOutlineShoppingCart,
    MdPersonOutline,
    MdOutlinePermMedia,
    MdPayment
} from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";

const sidebarMenu = [
    { id: 'admin-sidebar-menu-1', title: 'Dashboard', link: '/admin/dashboard', icon: <MdOutlineSpaceDashboard className="text-white" /> },
    { id: 'admin-sidebar-menu-2', title: 'Media', link: '/admin/media', icon: <MdOutlinePermMedia className="text-white" /> },
    { id: 'admin-sidebar-menu-3', title: 'Posts', link: '/admin/posts/?page=1', icon: <MdOutlinePostAdd className="text-white" /> },
    {
        id: 'admin-sidebar-menu-4',
        title: 'Products',
        icon: <AiOutlineProduct className="text-white" />,
        children: [
            { id: 'product-submenu-1', title: 'All Products', link: '/admin/products' },
            { id: 'product-submenu-3', title: 'All Collections', link: '/admin/products/collections' },
        ]
    },
    { id: 'admin-sidebar-menu-5', title: 'Orders', link: '/admin/orders', icon: <MdOutlineShoppingCart className="text-white" /> },
    { id: 'admin-sidebar-menu-6', title: 'Payment', link: '/admin/payment', icon: <MdPayment className="text-white" /> },
    { id: 'admin-sidebar-menu-7', title: 'Users', link: '/admin/users', icon: <MdPersonOutline className="text-white" /> },
];

const AdminSidebarMenu = () => {
    const router = useRouter();
    const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

    const handleToggle = (id: string) => {
        setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <List>
            {sidebarMenu.map((item) => (
                <div key={item.id}>
                    <ListItemButton onClick={() => item.children ? handleToggle(item.id) : router.push(item.link!)}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.title} className="text-white" />
                        {item.children ? (openMenus[item.id] ? <MdExpandLess /> : <MdExpandMore />) : null}
                    </ListItemButton>
                    {item.children && (
                        <Collapse in={openMenus[item.id]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {item.children.map((child) => (
                                    <ListItemButton
                                        key={child.id}
                                        sx={{ pl: 4 }}
                                        onClick={() => router.push(child.link)}
                                    >
                                        <ListItemText primary={child.title} className="text-white" />
                                    </ListItemButton>
                                ))}
                            </List>
                        </Collapse>
                    )}
                </div>
            ))}
        </List>
    );
};

export default AdminSidebarMenu;
