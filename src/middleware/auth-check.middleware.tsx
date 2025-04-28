"use client";

import React, { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { authCheckHandler, refreshTokenHandler } from "@/lib/features/auth.features";

const AuthCheckMiddleware = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const { user, isAuthenticated, error, accessToken, refreshToken, loading } = useAppSelector((state) => state.auth);

    const hasCheckedAuth = useRef(false);
    const hasRefreshedToken = useRef(false);

    const publicRoutes = [
        "/",
        "/auth/register/",
        "/auth/verify-otp/",
        "/auth/forgot-password/",
    ];
    const isBlogPage = pathname.startsWith("/blog");
    const isPublicRoute = publicRoutes.includes(pathname) || isBlogPage;

    useEffect(() => {
        if (!isPublicRoute && !hasCheckedAuth.current && !loading) {
            hasCheckedAuth.current = true;
            dispatch(authCheckHandler({}));
        }
    }, [pathname, dispatch, isPublicRoute, loading]);

    useEffect(() => {
        if (!isPublicRoute && !hasRefreshedToken.current && refreshToken && !loading && !accessToken) {
            hasRefreshedToken.current = true;
            dispatch(refreshTokenHandler({}));
        }
    }, [accessToken, refreshToken, loading, dispatch, isPublicRoute]);

    useEffect(() => {
        if (loading) return;

        if (isPublicRoute) return;

        if (!isAuthenticated || !accessToken || !refreshToken || error) {
            router.replace("/auth/login");
            return;
        }

        if (isAuthenticated && publicRoutes.includes(pathname)) {
            router.replace(user?.role === "admin" ? "/admin/dashboard" : "/");
        }
    }, [accessToken, refreshToken, user, isAuthenticated, error, pathname, router, loading, isPublicRoute]);

    return <>{children}</>;
};

export default AuthCheckMiddleware;
