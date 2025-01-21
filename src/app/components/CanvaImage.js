"use client";
import { useRef } from "react";
import html2canvas from "html2canvas";

// Next-image component doesn't work well with HTML2Canvas

export default function CanvaImage({ favArtist, theme }) {
  const divRef = useRef(null);
  const url = theme === "dark" ? "/background1.jpg" : "/background2.jpg";

  const handleShare = async () => {
    if (divRef.current) {
      const canvas = await html2canvas(divRef.current, {
        useCORS: true,
      });

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

      const dataUrl = croppedCanvas.toDataURL("image/png");

      if (navigator.share) {
        try {
          await navigator.share({
            title: "Check this out!",
            text: "I found this amazing content. Check it out!",
            files: [
              new File([await (await fetch(dataUrl)).blob()], "image.png", {
                type: "image/png",
              }),
            ],
          });
        } catch (error) {
          console.error("Error sharing:", error);
        }
      } else {
        alert("Sharing is not supported in your browser.");
      }
    }
  };

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
          backgroundImage: `url(${url})`,
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
          {/* spoti-chart.vercel.app */}
        </p>
        <div className="mt-4">
          <img src="/spotify-logo.png" alt="Spotify Logo" width={100} />
        </div>
      </div>
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={saveAsImage}
          className="flex-1 px-4 py-2 bg-blue-500 text-white font-medium rounded"
        >
          Download Image
        </button>
        <button
          onClick={handleShare}
          className="flex-1 px-4 py-2 bg-purple-500 text-white font-medium rounded"
        >
          Share
        </button>
      </div>
    </div>
  );
}
