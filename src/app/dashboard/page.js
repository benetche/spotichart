import DashboardComponent from "./DashboardComponent";
import withSession from "../lib/withSession";

async function Dashboard({ session }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-500 text-white font-sans">
      <h1 className="text-4xl mb-5">Welcome, {session.user.name}!</h1>
      <DashboardComponent session={session} />
    </div>
  );
}

export default withSession(Dashboard);
