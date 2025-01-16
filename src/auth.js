import NextAuth from "next-auth";
import Spotify from "next-auth/providers/spotify";

const SCOPES = [
  "user-read-private",
  "user-read-email",
  "playlist-read-private",
  "user-library-read",
  "user-top-read",
].join(" ");

const fetchSpotifyAccessToken = async () => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.AUTH_SPOTIFY_ID,
      client_secret: process.env.AUTH_SPOTIFY_SECRET,
      scopes: SCOPES,
    }),
  });

  const data = await response.json();
  console.log("Spotify token: ", data);
  if (!response.ok) {
    throw new Error(`Error fetching Spotify token: ${data.error}`);
  }

  return data.access_token;
};

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
      // Fetch Spotify access token on initial login
      if (account) {
        console.log("account: ", account);
        const spotifyToken = account.access_token; // I FINALLY FOUND IT
        token.spotifyAccessToken = spotifyToken;
        token.spotifyRefreshToken = account.refresh_token; // Store refresh token
      }

      // Refresh Spotify access token if it has expired
      if (Date.now() > token.accessTokenExpires) {
        const refreshedTokens = await getRefreshToken(
          token.spotifyRefreshToken
        );
        token.spotifyAccessToken = refreshedTokens.accessToken;
        token.spotifyRefreshToken = refreshedTokens.refreshToken;
        token.accessTokenExpires =
          Date.now() + refreshedTokens.expires_in * 1000; // Update expiry time
      }

      return token;
    },
    async session({ session, token }) {
      // Add Spotify access token to the session
      session.spotifyAccessToken = token.spotifyAccessToken;
      session.spotifyRefreshToken = token.spotifyRefreshToken;
      return session;
    },
  },
});
