"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { authCheckHandler, refreshTokenHandler, } from "@/lib/features/auth.features";

const AuthCheckMiddleware = ({ children, }: { children: React.ReactNode; }) => {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const { user, isAuthenticated, error, accessToken, refreshToken, loading, } = useAppSelector((state) => state.auth);

    const hasCheckedAuth = React.useRef(false);

    useEffect(() => {
        if (!hasCheckedAuth.current && !loading) {
            hasCheckedAuth.current = true
            dispatch(authCheckHandler({}))
        }
    }, [dispatch, loading])

    useEffect(() => {
        if (!hasCheckedAuth.current && refreshToken && !loading && !accessToken) {
            hasCheckedAuth.current = true;
            dispatch(refreshTokenHandler({}))
        }
    }, [accessToken, refreshToken, loading, dispatch]);

    useEffect(() => {
        if (loading) return;

        if (!loading && isAuthenticated) {
            router.push(pathname)
        }

        if (!accessToken || !refreshToken || !user || !isAuthenticated || error) {
            if (pathname !== "/auth/login/" && pathname !== "/auth/verify-otp/" && pathname !== "/auth/register/") {
                router.replace("/auth/login");
            }
            return;
        }

        if (isAuthenticated && (pathname === "/auth/login/" || pathname === "/auth/verify-otp/" || pathname === "/auth/register/")) {
            if (user?.role === "admin") {
                router.replace("/admin/dashboard/");
            } else {
                router.replace("/");
            }
        }
    }, [accessToken, refreshToken, user, isAuthenticated, error, pathname, router, loading,]);

    return <>{children}</>;
};

export default AuthCheckMiddleware;