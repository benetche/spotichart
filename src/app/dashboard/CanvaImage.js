"use client";
import { useRef } from "react";
import html2canvas from "html2canvas";

// Next-image component doesn't work well with HTML2Canvas

export default function CanvaImage({ favArtist }) {
  const divRef = useRef(null);

  const saveAsImage = async () => {
    if (divRef.current) {
      const canvas = await html2canvas(divRef.current, {
        useCORS: true, // Ensures images load correctly
      });

      // Cropping the canvas to remove the white bar
      const croppedCanvas = document.createElement("canvas");
      const context = croppedCanvas.getContext("2d");
      const cropHeight = canvas.height - 5;
      croppedCanvas.width = canvas.width;
      croppedCanvas.height = cropHeight;
      context.drawImage(
        canvas,
        0,
        0,
        canvas.width,
        cropHeight,
        0,
        0,
        canvas.width,
        cropHeight
      );

      // Save the cropped canvas as an image
      const link = document.createElement("a");
      link.download = "image.png";
      link.href = croppedCanvas.toDataURL("image/png");
      link.click();
    }
  };

  return (
    <div className="text-center mt-20">
      <div
        ref={divRef}
        className="flex flex-col items-center justify-center w-full bg-gradient-to-b from-black to-purple-800 px-10 py-8 bg-cover overflow-hidden"
        style={{
          backgroundImage: "url('/background1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-white text-3xl font-bold mb-8 text-center font-sans mb-20">
          This is my favorite artist!
        </h1>
        <div>
          <img
            src={`${favArtist[0].artistImage}`} // Replace with your image path
            alt="Artist Image"
            width={250}
            height={100}
            style={{ borderRadius: "10px" }}
            className="shadow-lg"
          />
        </div>
        <p className="text-white text-4xl font-bold mt-2 mb-20">
          {favArtist[0].artistName}
        </p>
        <p className="text-white text-xl mt-6">Thanks for visiting</p>
        <p className="text-white text-xl font-bold mt-2">
          spotichart.vercel.app
        </p>
        <div className="mt-4">
          <img src="/spotify-logo.png" alt="Spotify Logo" width={100} />
        </div>
      </div>
      <button
        onClick={saveAsImage}
        className="mt-6 px-4 py-2 bg-blue-500 text-white font-medium rounded w-full"
      >
        Save Image
      </button>
    </div>
  );
}
