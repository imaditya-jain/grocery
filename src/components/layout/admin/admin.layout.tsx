import React from "react"
import Header from "./header"
import { Grid } from "@mui/material"
import Sidebar from "./sidebar"

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <main className="mt-12 bg-[#f7f7f7]">
                <div className="!p-4 md:!p-0">
                    <Grid container columnSpacing={2}>
                        <Grid size={{ xs: 0, md: 2 }} className="relative hidden md:block">
                            <Sidebar />
                        </Grid>
                        <Grid size={{ xs: 12, md: 10 }}>
                            <div className="h-[auto] md:h-[93.9vh] overflow-y-auto">
                                <div>
                                    {children}
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </main>
        </>
    )
}

export default AdminLayout