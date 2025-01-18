async function fetchTracks(accessToken) {
  const response = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10&offset=0",
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  );

  if (!response.ok) {
    console.error("Failed to fetch user top tracks", response);
    return;
  }

  const { items } = await response.json();

  const tracks = items.map((item) => ({
    trackName: item.name,
    artistName: item.artists[0].name,
    albumImage: item.album.images[0].url, // maybe i'll use it one day
  }));

  console.log(tracks);
  return tracks;
}

async function fetchFavoriteArtist(accessToken) {
  const response = await fetch(
    "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=1&offset=0",
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  );

  if (!response.ok) {
    console.error("Failed to fetch user top artists", response);
    return;
  }

  const { items } = await response.json();

  const artist = items.map((item) => ({
    artistName: item.name,
    artistImage: item.images[0].url,
  }));

  console.log(artist);
  return artist;
}

export { fetchTracks, fetchFavoriteArtist };
