import { Grid } from "@mui/material"
import Link from "next/link"

const Topbar = () => {
    return (
        <>
            <div className="hidden sm:block py-2 border-gray-300 border-t-[1px] border-b-[1px]">
                <Grid container justifyContent='center'>
                    <Grid container spacing={2} size={11}>
                        <Grid size={6}>
                            <p className="text-[13px] font-[500]">Get up to 50% off on new season styles, limited time only.</p>
                        </Grid>
                        <Grid size={6}>
                            <ul className="flex items-center justify-end gap-3">
                                <li><Link href="#" legacyBehavior><a className="text-[13px] font-[500] link transition">Help Center</a></Link></li>
                                <li><Link href="#" legacyBehavior><a className="text-[13px] font-[500] link transition">Order Tracking</a></Link></li>
                            </ul>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default Topbar