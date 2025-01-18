import React from "react";
import { auth } from "@/auth";
import { fetchFavoriteArtist } from "../lib/spotify/requests";

async function DashboardComponent({ session }) {
  // if (!session) {
  //   redirect("/login");
  // }
  const accessToken = session.spotifyAccessToken;

  // const tracks = await fetchTracks(accessToken);
  const favArtist = await fetchFavoriteArtist(accessToken);
  return (
    <div>
      <h1 className="text-4xl mb-5">
        <form></form>
        Your favorite artist is: {favArtist[0].artistName}
      </h1>
    </div>
  );
}

export default DashboardComponent;
