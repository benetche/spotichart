import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { auth } from "@/auth";
import MenuButton from "./HeaderOptions";
import HeaderOptions from "./HeaderOptions";

async function Header() {
  const session = await auth();

  return <HeaderOptions />;
}

export default Header;
