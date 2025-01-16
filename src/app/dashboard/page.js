import { auth } from "@/auth";
import LogoutButton from "./LogoutButton";
import { redirect } from "next/navigation";
import DashboardComponent from "./DashboardComponent";

async function Dashboard() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-500 text-white font-sans">
      <h1 className="text-4xl mb-5">Welcome, {session.user.name}!</h1>
      <LogoutButton />
      <DashboardComponent />
    </div>
  );
}

export default Dashboard;
