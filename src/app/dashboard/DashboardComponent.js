import React from "react";
import { auth } from "@/auth";
async function DashboardComponent() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }
  const accessToken = session.spotifyAccessToken;

  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  if (!response.ok) {
    console.error("Failed to fetch user data");
    return;
  }

  const data = await response.json();
  console.log(data);

  return <div>DashboardComponent</div>;
}

export default DashboardComponent;
