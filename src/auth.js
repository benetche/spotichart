import NextAuth from "next-auth";
import Spotify from "next-auth/providers/spotify";

const SCOPES = [
  "user-read-private",
  "user-read-email",
  // "playlist-read-private",
  // "user-library-read",
  "user-top-read",
].join(" ");

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
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = Date.now() + account.expires_in * 1000;
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      try {
        const refreshedTokens = await getRefreshToken(account.refreshToken);
        token.accessToken = refreshedTokens.accessToken;
        token.refreshToken = refreshedTokens.refreshToken;
        token.accessTokenExpires =
          Date.now() + refreshedTokens.expires_in * 1000;
      } catch (error) {
        console.error("Error refreshing access token", error);
        return {
          ...token,
          error: "RefreshAccessTokenError",
        };
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.accessTokenExpires = token.accessTokenExpires;
      return session;
    },
  },
});
