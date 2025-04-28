"use client";

import { useState } from "react";
import { Grid } from "@mui/material";
import { KeyboardArrowDown, RocketLaunch } from "@mui/icons-material";
import { RiMenu2Line } from "react-icons/ri";
import CustomDrawer from "../../../drawers/custom.drawers";

const Navigation = () => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    return (
        <>
            <nav className="hidden md:block">
                <div className="py-3">
                    <Grid container justifyContent="center">
                        <Grid container spacing={2} size={11} alignItems="center">
                            <Grid size={3}>
                                <button
                                    className="!text-[15px] !font-[500] !text-[#1f1f1f] flex gap-2 !items-center uppercase w-full"
                                    onClick={() => toggleDrawer(true)}
                                >
                                    <RiMenu2Line className="text-[#1f1f1f]" /> Shop By Category
                                    <KeyboardArrowDown className="m-auto text-[#1f1f1f]" />
                                </button>
                            </Grid>
                            <Grid size={5}></Grid>
                            <Grid size={4} display="flex" justifyContent="flex-end">
                                <p className="flex items-center gap-2 text-[#1f1f1f] font-[500] text-[15px]">
                                    <RocketLaunch />
                                    Free International Delivery
                                </p>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </nav>
            <CustomDrawer open={open} toggleDrawer={toggleDrawer}>
                Category
            </CustomDrawer>
        </>
    );
};

export default Navigation;
