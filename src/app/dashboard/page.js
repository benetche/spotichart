import DashboardComponent from "./DashboardComponent";
import withSession from "../lib/withSession";
import decodeJWT from "../lib/decodeJWT";
import { fetchFavoriteArtist } from "../lib/spotify/requests";

async function Dashboard() {
  const accessToken = await decodeJWT();
  const favArtist = await fetchFavoriteArtist(accessToken);
  return (
    <div>
      <DashboardComponent favArtist={favArtist} />
    </div>
  );
}

export default withSession(Dashboard);
