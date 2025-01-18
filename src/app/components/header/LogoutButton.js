"use client";
import { signOut } from "next-auth/react";

function LogoutButton() {
  return (
    <form
      action={async () => {
        "use client";
        await signOut();
      }}
    >
      <button
        type="submit"
        className="px-6 py-3 bg-red-500 text-white font-semibold rounded-full hover:bg-green-600"
      >
        Sign out
      </button>
    </form>
  );
}

export default LogoutButton;
