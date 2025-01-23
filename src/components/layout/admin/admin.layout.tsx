import React from "react"
import Header from "./header"
import { Container, Grid2 } from "@mui/material"
import Sidebar from "./sidebar"

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <main className="mt-12 bg-[#f7f7f7]">
                <Container maxWidth="xl" className="!p-4 md:!p-0">
                    <Grid2 container columnSpacing={2}>
                        <Grid2 size={{ xs: 0, md: 2 }} className="relative hidden md:block">
                            <Sidebar />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 10 }}>
                            <div className="h-[auto] md:h-[93vh] overflow-y-auto">
                                <div>
                                    {children}
                                </div>
                            </div>
                        </Grid2>
                    </Grid2>
                </Container>
            </main>
        </>
    )
}

export default AdminLayout