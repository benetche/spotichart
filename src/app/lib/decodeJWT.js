import { decode } from "next-auth/jwt";

async function decodeJWT(cookieStore) {
  let token = undefined;
  if (process.env.NODE_ENV === "development") {
    token = cookieStore.get("authjs.session-token");
  } else {
    token = cookieStore.get("__Secure-authjs.session-token");
  }

  if (!token) {
    throw new Error("Token not found");
  }
  const decrypted = await decode({
    token: token.value,
    salt: token.name,
    secret: process.env.NEXTAUTH_SECRET,
  });

  return decrypted.accessToken;
}

export default decodeJWT;
