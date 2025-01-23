"use client";

import { Box, Popover } from "@mui/material";
import React, { ReactNode } from "react";

interface CustomPopoverProps {
    open: boolean;
    anchorEl: HTMLElement | null;
    id: string;
    handleClose: () => void;
    children: ReactNode;
    anchorOrigin?: {
        vertical: "top" | "bottom";
        horizontal: "left" | "center" | "right";
    };
}

const CustomPopover: React.FC<CustomPopoverProps> = ({
    open,
    anchorEl,
    id,
    handleClose,
    children,
    anchorOrigin = {
        vertical: "bottom",
        horizontal: "left",
    },
}) => {
    return (
        <Box>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={anchorOrigin}
            >
                {children}
            </Popover>
        </Box>
    );
};

export default CustomPopover;
