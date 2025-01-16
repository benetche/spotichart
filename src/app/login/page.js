import LoginButton from "./LoginButton";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-8">Login to Spotify</h1>
        <LoginButton />
      </div>
    </div>
  );
}
