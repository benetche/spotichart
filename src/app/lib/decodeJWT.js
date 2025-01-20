import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
async function decodeJWT() {
  const cookieStore = await cookies();
  const token = cookieStore.get("authjs.session-token");
  const decrypted = await decode({
    token: token.value,
    salt: token.name,
    secret: process.env.NEXTAUTH_SECRET,
  });

  return decrypted.accessToken;
}

export default decodeJWT;
