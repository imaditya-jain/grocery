import { Box, Drawer } from "@mui/material";

interface CustomDrawerProps {
    open: boolean;
    toggleDrawer: (newOpen: boolean) => void;
    children: React.ReactNode
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({ open, toggleDrawer, children }) => {
    return (
        <Drawer open={open} onClose={() => toggleDrawer(false)} className="custom-drawer">
            <Box sx={{ width: 320, height: '100%' }} role="presentation" onClick={() => toggleDrawer(false)}>
                {children}
            </Box>
        </Drawer>
    );
};

export default CustomDrawer;
