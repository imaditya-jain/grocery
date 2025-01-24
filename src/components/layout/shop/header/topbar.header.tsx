import { Grid2 } from "@mui/material"
import Link from "next/link"

const Topbar = () => {
    return (
        <>
            <div className="hidden sm:block py-2 border-gray-300 border-t-[1px] border-b-[1px]">
                <Grid2 container justifyContent='center'>
                    <Grid2 container spacing={2} size={11}>
                        <Grid2 size={6}>
                            <p className="text-[13px] font-[500]">Get up to 50% off on new season styles, limited time only.</p>
                        </Grid2>
                        <Grid2 size={6}>
                            <ul className="flex items-center justify-end gap-3">
                                <li><Link href="#" legacyBehavior><a className="text-[13px] font-[500] link transition">Help Center</a></Link></li>
                                <li><Link href="#" legacyBehavior><a className="text-[13px] font-[500] link transition">Order Tracking</a></Link></li>
                            </ul>
                        </Grid2>
                    </Grid2>
                </Grid2>
            </div>
        </>
    )
}

export default Topbar