import { Suspense } from "react"
import { ShopLayout } from "@/components"
import { ShopBLOGSection } from "@/sections"


const Blog = () => {

    return (
        <>
            <Suspense fallback={<p>Loading...</p>}>
                <ShopLayout>
                    <ShopBLOGSection />
                </ShopLayout>
            </Suspense>
        </>
    )
}

export default Blog