export const ENV_CONFIG = {
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',

    // Cookie settings
    cookieSettings: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict' as const,
        path: '/',
    },

    // Token expiry times
    tokens: {
        accessTokenExpiry: 24 * 60 * 60, // 1 day in seconds
        refreshTokenExpiry: 7 * 24 * 60 * 60, // 7 days in seconds
        refreshIntervalHours: 23, // Refresh 1 hour before expiry
    }
};
