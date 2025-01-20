import React from "react";

function PrivacyAndPolicy() {
  return (
    <div className=" bg-black-300 p-6 mt-10">
      <div className="max-w-4xl mx-auto bg-black-500 p-8 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-green-500">
          Privacy Policy
        </h1>
        <p className="mb-4 text-gray-300">
          Spotichart was developed as an open-source app powered by{" "}
          <a className="text-blue-300" href="https://spotify.com">
            Spotify
          </a>{" "}
          API. By using this app, you agree to the use of your Spotify data for
          your top artists.
        </p>
        <h2 className="text-2xl font-semibold mb-4 text-green-500">
          Information Collected
        </h2>
        <p className=" text-gray-300">
          This app collects your top artists from Spotify API. We do not store
          or share your data with any third-party services.
        </p>
        <p className="mb-4 text-gray-300">
          You can revoke Spotichart&apos;s access to your Spotify data at any
          time by visiting your{" "}
          <a
            href="https://www.spotify.com/account/apps/"
            className="text-blue-300"
          >
            Spotify apps page
          </a>{" "}
          and click &quot;REMOVE ACCESS&quot; on Spotichart.
        </p>
      </div>
    </div>
  );
}

export default PrivacyAndPolicy;
