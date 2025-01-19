import DashboardComponent from "./DashboardComponent";
import withSession from "../lib/withSession";
import CanvaImage from "./CanvaImage";

async function Dashboard({ session }) {
  return (
    <div>
      <DashboardComponent session={session} />
    </div>
  );
}

export default withSession(Dashboard);
