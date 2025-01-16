"use client";
import { signIn } from "next-auth/react";

function LoginButton() {
  return (
    <button
      onClick={() => signIn("spotify", { redirectTo: "/dashboard" })}
      className="px-6 py-3 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600"
    >
      Sign in with Spotify
    </button>
  );
}

export default LoginButton;
