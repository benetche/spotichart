import { auth } from "@/auth";
import HeaderOptions from "./HeaderOptions";

async function Header() {
  const session = await auth();

  return <HeaderOptions session={session} />;
}

export default Header;
