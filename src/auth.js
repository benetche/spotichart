import NextAuth from "next-auth";
import Spotify from "next-auth/providers/spotify";

const SCOPES = ["user-read-private", "user-read-email", "user-top-read"].join(
  " "
);

const getRefreshToken = async (refreshToken) => {
  const url = "https://accounts.spotify.com/api/token";

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: process.env.AUTH_SPOTIFY_ID,
      client_secret: process.env.AUTH_SPOTIFY_SECRET,
    }),
  };

  const response = await fetch(url, payload);
  const data = await response.json();
  console.log("data: ", data);

  if (!response.ok) {
    throw new Error(`Error refreshing Spotify token: ${data.error}`);
  }

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token || refreshToken, // Use new refresh token if provided
  };
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Spotify({
      authorization: `https://accounts.spotify.com/authorize?scope=${encodeURIComponent(
        SCOPES
      )}`,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        // First-time login, save the `access_token`, its expiry and the `refresh_token`
        return {
          ...token,
          accessToken: account.access_token,
          accessTokenExpires: account.expires_at,
          refreshToken: account.refresh_token,
        };
      } else if (Date.now() < token.accessTokenExpires * 1000) {
        // Subsequent logins, but the `access_token` is still valid
        return token;
      } else {
        // Subsequent logins, but the `access_token` has expired, try to refresh it
        if (!token.refreshToken) throw new TypeError("Missing refresh_token");

        try {
          const { accessToken, refreshToken } = await getRefreshToken(
            token.refreshToken
          );

          return {
            ...token,
            accessToken,
            accessTokenExpires: Math.floor(Date.now() / 1000 + 3600), // Assuming 1 hour expiry
            refreshToken,
          };
        } catch (error) {
          console.error("Error refreshing access_token", error);
          if (error.message.includes("invalid_grant")) {
            // Force re-authentication if refresh token is invalid or revoked
            return {
              ...token,
              error: "RefreshTokenError",
              accessToken: null,
              refreshToken: null,
            };
          }
          token.error = "RefreshTokenError";
          return token;
        }
      }
    },
    async session({ session, token }) {
      session.error = token.error;
      return session;
    },
  },
});
