import React from "react";
import { auth } from "@/auth";
import { fetchFavoriteArtist } from "../lib/spotify/requests";
import CanvaImage from "./CanvaImage";

async function DashboardComponent({ session }) {
  console.log("SESSION:", session);
  const accessToken = session.accessToken;

  const favArtist = await fetchFavoriteArtist(accessToken);
  return (
    <div className="flex flex-col items-center justify-center w-full bg-green-500 text-white font-sans pt-10">
      <CanvaImage favArtist={favArtist} />
    </div>
  );
}

export default DashboardComponent;
