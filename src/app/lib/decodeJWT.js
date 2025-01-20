import { decode } from "next-auth/jwt";
export const dynamic = "force-dynamic";

async function decodeJWT(cookieStore) {
  const token = cookieStore.get("__Secure-authjs.session-token");
  const decrypted = await decode({
    token: token.value,
    salt: token.name,
    secret: process.env.NEXTAUTH_SECRET,
  });

  return decrypted.accessToken;
}

export default decodeJWT;
