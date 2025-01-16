import { redirect } from "next/navigation";
import { auth } from "../auth";

export default function Home() {
  redirect("/dashboard");
}
