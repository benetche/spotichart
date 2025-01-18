"use client";
import React, { useState } from "react";

const HeaderOptions = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-green-500 text-lg font-bold">MyWebsite</div>
        <div className="hidden md:flex space-x-4">
          <a href="#home" className="text-white hover:text-green-500">
            Home
          </a>
          <a href="#about" className="text-white hover:text-green-500">
            About
          </a>
          <a href="#privacy" className="text-white hover:text-green-500">
            Privacy and Policy
          </a>
          <a href="#contact" className="text-white hover:text-green-500">
            Contact
          </a>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-2 mt-2">
          <a href="#home" className="text-white hover:text-green-500">
            Home
          </a>
          <a href="#about" className="text-white hover:text-green-500">
            About
          </a>
          <a href="#privacy" className="text-white hover:text-green-500">
            Privacy and Policy
          </a>
          <a href="#contact" className="text-white hover:text-green-500">
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default HeaderOptions;
