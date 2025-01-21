"use server";
import { auth } from "@/auth";
import LoginButton from "../components/LoginButton";
import { redirect } from "next/navigation";

async function Login() {
  const session = await auth();
  if (session) {
    redirect("/");
  }

  return (
    <div className="flex justify-center bg-black-500 mb-20">
      <div className="text-center mt-20">
        <h1 className="text-4xl font-bold text-white mb-4">Musical DNA</h1>
        <p className="text-xl text-green-500 mb-10 ">
          Discover your musical D.N.A{" "}
        </p>
        <div className="flex justify-center mt-20">
          <LoginButton />
        </div>
      </div>
    </div>
  );
}

export default Login;
