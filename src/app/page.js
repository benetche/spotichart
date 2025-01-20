import DashboardComponent from "./components/DashboardComponent";
import withSession from "./lib/withSession";
import { fetchFavoriteArtist } from "./lib/spotify/requests";
import { cookies } from "next/headers";
import decodeJWT from "./lib/decodeJWT";

async function Dashboard() {
  const cookieStore = await cookies();
  const accessToken = await decodeJWT(cookieStore);
  const favArtist = await fetchFavoriteArtist(accessToken);
  return (
    <div>
      <DashboardComponent favArtist={favArtist} />
    </div>
  );
}

export default withSession(Dashboard);
