"use client";
import React, { useState } from "react";
import CanvaImage from "./CanvaImage";

function DashboardComponent({ favArtist }) {
  const [selectedTheme, setSelectedTheme] = useState("dark"); // Default theme is "dark"
  const handleThemeChange = (theme) => {
    setSelectedTheme(theme); // Update the state
    console.log(`Selected theme: ${theme}`);
  };

  return (
    <div className="flex flex-col items-center bg-black-500 text-white font-sans py-10 min-h-screen">
      <div className="flex flex-col md:flex-row w-full md:items-start md:justify-center">
        <CanvaImage favArtist={favArtist} theme={selectedTheme} />
        <div className="flex flex-col justify-start items-start mt-10 md:mt-0 md:ml-10">
          <h2 className="text-xl  font-extrabold md:mt-20">
            Customize your picture
          </h2>
          <hr className="border-t border-gray-300 w-full my-2" />
          <p className="mb-2 mt-2 font-bold">Background</p>
          <div className="ml-2 space-x-4">
            <button
              className={`px-4 py-2 rounded ${
                selectedTheme === "dark"
                  ? "bg-green-500 text-white"
                  : "bg-transparent text-white outline"
              }`}
              onClick={() => handleThemeChange("dark")}
            >
              Dark Mode
            </button>
            <button
              className={`px-4 py-2 rounded ${
                selectedTheme === "light"
                  ? "bg-green-500 text-white"
                  : "bg-transparent text-white outline"
              }`}
              onClick={() => handleThemeChange("light")}
            >
              Light Mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardComponent;
