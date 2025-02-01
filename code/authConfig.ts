import { NextAuthOptions } from 'next-auth';
import AzureADB2CProvider from 'next-auth/providers/azure-ad-b2c';

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: any) {
    const response = await fetch(
        `https://${process.env.AZURE_AD_B2C_TENANT_NAME}.b2clogin.com/${process.env.AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/${process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW}/oauth2/v2.0/token`,
        {
            method: 'POST',
            body: new URLSearchParams({
                client_id: process.env.AZURE_AD_B2C_CLIENT_ID ?? '',
                client_secret: process.env.AZURE_AD_B2C_CLIENT_SECRET ?? '',
                grant_type: 'refresh_token',
                refresh_token: token.refreshToken
            }).toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    );

    if (!response.ok) {
        console.error(response.statusText);
        return {
            ...token,
            errorMessage: response.statusText,
            error: 'RefreshAccessTokenError'
        };
    }

    const refreshedTokens = await response.json();

    return {
        ...token,
        accessToken: refreshedTokens.id_token,
        accessTokenExpires: Date.now() + ((refreshedTokens.id_token_expires_in as number) - 60) * 1000,
        refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
        refreshTokenExpires: Date.now() + ((refreshedTokens.refresh_token_expires_in as number) - 60) * 1000
    };
}

export const authOptions: NextAuthOptions = {
    providers: [
        AzureADB2CProvider({
            tenantId: process.env.AZURE_AD_B2C_TENANT_NAME,
            clientId: process.env.AZURE_AD_B2C_CLIENT_ID ?? '',
            clientSecret: process.env.AZURE_AD_B2C_CLIENT_SECRET ?? '',
            primaryUserFlow: process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW ?? '',
            authorization: {
                params: {
                    scope: 'openid profile offline_access',
                    response_type: 'code'
                },
                url: `https://${process.env.AZURE_AD_B2C_TENANT_NAME}.b2clogin.com/${process.env.AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/oauth2/v2.0/authorize?p=${process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW}`
            },
            checks: ['pkce'],
            client: {
                token_endpoint_auth_method: 'client_secret_post'
            },
            profile: (profile) => {
                return {
                    name: profile.name,
                    email: null,
                    id: profile.oid
                };
            },
            token: `https://${process.env.AZURE_AD_B2C_TENANT_NAME}.b2clogin.com/${process.env.AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/${process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW}/oauth2/v2.0/token`
        })
    ],
    callbacks: {
        async signIn(user) {
            return user !== undefined;
        },
        async jwt({ token, profile, user, account }) {
            // Initial sign in
            if (account && user) {
                return {
                    accessToken: account.id_token,
                    accessTokenExpires: Date.now() + ((account.id_token_expires_in as number) - 60) * 1000,
                    refreshToken: account.refresh_token,
                    refreshTokenExpires: Date.now() + ((account.refresh_token_expires_in as number) - 60) * 1000,
                    profile
                };
            }

            // Return previous token if the access token has not expired yet
            if (Date.now() < (token.accessTokenExpires as number)) {
                return token;
            }

            // Access token has expired, try to update it
            return await refreshAccessToken(token);
        },

        async session({ session, token }) {
            session.user = token;
            return session;
        },
    }
};