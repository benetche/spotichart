import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" text-white py-6">
      <div className="container mx-auto text-center">
        <p className="mb-4">
          Made by{" "}
          <Link
            href="https://www.linkedin.com/in/vitor-beneti-martins-7103b5201/"
            className="text-blue-400"
          >
            Vítor Beneti
          </Link>
        </p>
        <nav className="footer-nav">
          <ul className="flex justify-center space-x-2">
            <li>
              <Link href="/dashboard" legacyBehavior>
                <a className="text-blue-400">Home</a>
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" legacyBehavior>
                <a className="text-blue-400">| Privacy Policy |</a>
              </Link>
            </li>
            <li>
              <Link href="/contact" legacyBehavior>
                <a className="text-blue-400">Contact</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
