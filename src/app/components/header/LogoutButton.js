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
        className="px-4 py-2 bg-red-500 text-white font-semibold hover:bg-green-600 rounded-md"
      >
        Sign out
      </button>
    </form>
  );
}

export default LogoutButton;
