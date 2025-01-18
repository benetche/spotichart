import React from "react";
import { auth } from "@/auth"; // Adjust the import path as necessary
import { redirect } from "next/navigation";

const withSession = (WrappedComponent) => {
  const WithSessionComponent = async (props) => {
    const session = await auth();

    if (!session) {
      redirect("/login");
    }

    return <WrappedComponent {...props} session={session} />;
  };

  return WithSessionComponent;
};

export default withSession;
