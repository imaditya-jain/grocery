import React from "react";
import Head from "next/head";

interface SEOHeadProps {
    title: string;
    description: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({ title, description }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
        </Head>
    );
};

export default SEOHead;
