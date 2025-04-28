import { PostContent } from "@/sections";
import { Suspense } from "react";
import { AdminLayout } from "@/components";

const Posts = () => {


    return (
        <Suspense fallback={<p>Loading...</p>}>
            <AdminLayout>
                <PostContent />
            </AdminLayout>
        </Suspense>
    );
};

export default Posts;
