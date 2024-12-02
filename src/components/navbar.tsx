"use client";
import { useState } from "react";
import Logo from "@/app/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
  bgColor?: string;
}

export default function Navbar({ bgColor = "#110219" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string>("");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    if (isOpen) toggleMenu(); // Close menu on link click for mobile
  };

  return (
    <header
      className="py-3 text-white font-proxima-nova"
      style={{ backgroundColor: bgColor }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image
                src={Logo}
                alt="Logo"
                width={224}
                height={224}
                className="w-56 h-56"
              />
            </Link>
          </div>
          <div className="hidden ml-5 md:flex md:items-center md:space-x-4">
            <Link
              href="/events"
              className={`text-md ${
                activeLink === "events"
                  ? "text-fuchsia-600"
                  : "hover:text-fuchsia-600"
              }`}
              onClick={() => handleLinkClick("events")}
            >
              Events
            </Link>
            <Link
              href="/gamePass"
              className={`text-md ${
                activeLink === "gamePass"
                  ? "text-fuchsia-600"
                  : "hover:text-fuchsia-600"
              }`}
              onClick={() => handleLinkClick("gamePass")}
            >
              Game Pass
            </Link>
            <Link
              href="/aboutus"
              className={`text-md ${
                activeLink === "aboutUs"
                  ? "text-fuchsia-600"
                  : "hover:text-fuchsia-600"
              }`}
              onClick={() => handleLinkClick("aboutUs")}
            >
              About Us
            </Link>
            <Link
              href="/marketPlace"
              className={`text-md ${
                activeLink === "marketPlace"
                  ? "text-fuchsia-600"
                  : "hover:text-fuchsia-600"
              }`}
              onClick={() => handleLinkClick("marketPlace")}
            >
              Marketplace
            </Link>
          </div>
        </div>
      </nav>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/events"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                activeLink === "events" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
              onClick={() => handleLinkClick("events")}
            >
              Events
            </Link>
            <Link
              href="/gamePass"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                activeLink === "gamePass" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
              onClick={() => handleLinkClick("gamePass")}
            >
              Game Pass
            </Link>
            <Link
              href="/aboutus"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                activeLink === "aboutUs" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
              onClick={() => handleLinkClick("aboutUs")}
            >
              About Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
