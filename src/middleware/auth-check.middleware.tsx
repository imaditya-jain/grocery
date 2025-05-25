"use client";

import React, { useEffect, useMemo, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { authCheckHandler, refreshTokenHandler } from "@/lib/features/auth.features";
import { clearAuthState } from "@/lib/slices/auth.slice";

const AuthCheckMiddleware = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const {
        isAuthenticated,
        error,
        accessToken,
        refreshToken,
        loading,
    } = useAppSelector((state) => state.auth);

    const hasInitialized = useRef(false);
    const isRefreshing = useRef(false);
    const refreshAttempts = useRef(0);
    const MAX_REFRESH_ATTEMPTS = 3;

    const publicRoutes = useMemo(() => [
        "/",
        "/auth/login",
        "/auth/register",
        "/auth/forgot-password",
        "/auth/reset-password"
    ], []);

    const isPublicRoute = useMemo(() => {
        // Exact match for public routes
        if (publicRoutes.includes(pathname)) return true;
        // Check for blog pages
        if (pathname.startsWith("/blog")) return true;
        // Check for nested auth routes
        if (pathname.startsWith("/auth/")) return true;
        return false;
    }, [pathname, publicRoutes]);

    // Reset refresh attempts when route changes
    useEffect(() => {
        refreshAttempts.current = 0;
    }, [pathname]);

    // Silent refresh function with debounce protection
    const attemptSilentRefresh = useCallback(async () => {
        if (isRefreshing.current || loading) return;

        // Check if we've exceeded max refresh attempts
        if (refreshAttempts.current >= MAX_REFRESH_ATTEMPTS) {
            console.log('Max refresh attempts reached');
            dispatch(clearAuthState());
            router.replace("/auth/login");
            return;
        }

        isRefreshing.current = true;
        refreshAttempts.current += 1;

        try {
            const result = await dispatch(refreshTokenHandler({})).unwrap();
            if (result.success) {
                // Reset refresh attempts on success
                refreshAttempts.current = 0;
                return true;
            }
            return false;
        } catch (error) {
            console.log('Silent refresh failed:', error);
            return false;
        } finally {
            isRefreshing.current = false;
        }
    }, [dispatch, loading, router]);

    // Initial auth check
    useEffect(() => {
        // Skip authentication logic for public routes
        if (isPublicRoute) {
            hasInitialized.current = true;
            return;
        }

        if (!hasInitialized.current && !loading) {
            hasInitialized.current = true;

            const checkAuth = async () => {
                try {
                    // First try to use existing tokens
                    if (accessToken && refreshToken) {
                        await dispatch(authCheckHandler({})).unwrap();
                        return;
                    }

                    // If no tokens but we have refresh token, try refresh
                    if (!accessToken && refreshToken) {
                        await attemptSilentRefresh();
                        return;
                    }

                    // No tokens available, only redirect if we've exceeded refresh attempts
                    if (refreshAttempts.current >= MAX_REFRESH_ATTEMPTS) {
                        dispatch(clearAuthState());
                        router.replace("/auth/login");
                    }
                } catch (error) {
                    // If auth check fails and we have refresh token, try refresh
                    console.error('Auth check failed:', error);
                    if (isRefreshing.current) return; // Prevent multiple refresh attempts
                    if (refreshToken) {
                        await attemptSilentRefresh();
                    } else if (refreshAttempts.current >= MAX_REFRESH_ATTEMPTS) {
                        dispatch(clearAuthState());
                        router.replace("/auth/login");
                    }
                }
            };

            checkAuth();
        }
    }, [dispatch, loading, attemptSilentRefresh, isPublicRoute, pathname, accessToken, refreshToken, router]);

    // Handle authentication state changes
    useEffect(() => {
        // Skip authentication logic for public routes
        if (isPublicRoute) return;

        if (loading || !hasInitialized.current) return;

        const handleAuthState = async () => {
            // If authenticated with tokens, we're good
            if (isAuthenticated && accessToken && refreshToken) {
                refreshAttempts.current = 0; // Reset attempts when authenticated
                return;
            }

            // If not authenticated or has error
            if (!isAuthenticated || error) {
                if (!isRefreshing.current && refreshToken) {
                    const refreshSuccess = await attemptSilentRefresh();
                    if (refreshSuccess) return;
                }

                // Only redirect if we've exceeded refresh attempts
                if (refreshAttempts.current >= MAX_REFRESH_ATTEMPTS) {
                    dispatch(clearAuthState());
                    router.replace("/auth/login");
                }
                return;
            }

            // If authenticated but no access token, try silent refresh
            if (isAuthenticated && !accessToken && refreshToken && !isRefreshing.current) {
                await attemptSilentRefresh();
                return;
            }

            // If no refresh token available and exceeded attempts, redirect to login
            if (!refreshToken && refreshAttempts.current >= MAX_REFRESH_ATTEMPTS) {
                dispatch(clearAuthState());
                router.replace("/auth/login");
                return;
            }
        };

        handleAuthState();
    }, [
        isAuthenticated,
        accessToken,
        refreshToken,
        error,
        pathname,
        router,
        loading,
        attemptSilentRefresh,
        isPublicRoute,
        dispatch
    ]);

    // Set up automatic token refresh before expiry
    useEffect(() => {
        // Skip refresh timer for public routes or when not authenticated
        if (isPublicRoute || !isAuthenticated || !accessToken || !refreshToken) return;

        // Refresh token 5 minutes before expiry
        const REFRESH_INTERVAL = 23 * 60 * 60 * 1000; // 23 hours
        const refreshInterval = setInterval(() => {
            refreshAttempts.current = 0; // Reset attempts for scheduled refresh
            attemptSilentRefresh();
        }, REFRESH_INTERVAL);

        return () => clearInterval(refreshInterval);
    }, [accessToken, isAuthenticated, refreshToken, attemptSilentRefresh, isPublicRoute]);

    return <>{children}</>;
};

export default AuthCheckMiddleware;
