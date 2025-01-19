import LoginButton from "./LoginButton";

export default function Login() {
  return (
    <div className="flex justify-center bg-black-500 min-h-screen">
      <div className="text-center mt-20">
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome to Spotichart
        </h1>
        <p className="text-xl text-purple-200 mb-10 italic">
          Discover your own preferencies!
        </p>
        <div className="flex justify-center mt-20">
          <LoginButton />
        </div>
      </div>
    </div>
  );
}
